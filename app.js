const ARTBOARD = { width: 1512, height: 982 };
const GALLERY_VERSION = "20261029.2";

const projects = [
  {
    slug: "amourlinen",
    name: "AmourLinen",
    firstDate: "2025-2026",
    secondDate: "2025-2026",
    description: "brand identity & visual collateral",
    frames: ["amourlinen-1.html", "amourlinen-2.html", "amourlinen-3.html", "amourlinen-4.html", "amourlinen-5.html"],
  },
  {
    slug: "lamu-slenis",
    name: "Lamu Slenis",
    firstDate: "2025",
    secondDate: "2026",
    description: "digital publication design",
    frames: ["lamu-slenis-1.html", "lamu-slenis-2.html", "lamu-slenis-3.html", "lamu-slenis-4.html", "lamu-slenis-5.html"],
  },
  {
    slug: "sadria-metals",
    name: "Sadria Metals",
    firstDate: "2024-2025",
    secondDate: "2024-2025",
    description: "creative direction & brand identity",
    frames: ["sadria-metals-1.html", "sadria-metals-2.html", "sadria-metals-3.html", "sadria-metals-4.html", "sadria-metals-5.html", "sadria-metals-6.html", "sadria-metals-7.html"],
  },
  {
    slug: "hc-andersen",
    name: "HC Andersen",
    firstDate: "2025",
    secondDate: "2025",
    description: "digital design & illustration",
    frames: ["hc-andersen-1.html", "hc-andersen-2.html", "hc-andersen-3.html", "hc-andersen-4.html"],
  },
  {
    slug: "eddies",
    name: "Eddie’s",
    firstDate: "2025",
    secondDate: "2025",
    description: "brand identity & packaging",
    frames: ["eddies-1.html", "eddies-2.html", "eddies-3.html", "eddies-4.html", "eddies-5.html"],
  },
];

const interactiveRows = new Set(projects.map((_, index) => index));
const list = document.querySelector("#project-list");
const stage = document.querySelector(".stage");
const baseCanvas = document.querySelector("#base-canvas");
const stageArt = document.querySelector("#stage-art");
const infoView = document.querySelector("#info-view");
let activeSlug = null;
let frameIndex = 0;
let returnFocus = null;
let frameRequestId = 0;
// Keep the visible frame and a few decoded neighbours ready for instant swaps.
const frameCache = new Map();
const imageJobs = new Map();
const imageQueue = [];
const MAX_CACHED_FRAMES = 4;
let runningImageJobs = 0;
let visibleEntry = null;
let requestedFile = null;
let nextFile = null;
let hoverTimer = null;

function setArtboardScale() {
  baseCanvas.style.width = `${window.innerWidth}px`;
  baseCanvas.style.height = `${window.innerHeight}px`;
}

function renderProjectList() {
  list.innerHTML = `
    <span class="project-marker" aria-hidden="true"></span>
    ${projects.map((project, index) => `
      <${interactiveRows.has(index) ? "button" : "div"}
        class="project-row${interactiveRows.has(index) ? " is-selectable" : ""}"
        ${interactiveRows.has(index) ? 'type="button"' : ""}
        data-index="${index}"
        ${project.frames ? `data-slug="${project.slug}"` : ""}
        ${interactiveRows.has(index) ? `aria-label="Select ${project.name}" aria-pressed="false"` : 'aria-disabled="true"'}>
        <span class="project-cell project-number">${index + 1}</span>
        <span class="project-cell project-name">${project.name}</span>
        <span class="project-cell project-date">${project.firstDate}</span>
        <span class="project-cell project-end">${project.secondDate}</span>
        <span class="project-cell project-description">${project.description}</span>
      </${interactiveRows.has(index) ? "button" : "div"}>
    `).join("")}
  `;
}

function activeProject() {
  return projects.find((project) => project.slug === activeSlug) || null;
}

function frameRoot(frameDocument) {
  return frameDocument.querySelector("[data-frame-scale]")
    || frameDocument.querySelector("#board")
    || frameDocument.querySelector("#figmaCanvas > div")
    || frameDocument.querySelector("#canvas > #board");
}

function prepareFrameInteractions(frame) {
  let frameDocument;
  try {
    frameDocument = frame.contentDocument;
  } catch {
    return;
  }
  const root = frameRoot(frameDocument);
  if (!root) return;

  // Browsing artwork uses repeated clicks, which must not select or drag it.
  // Parent styles cannot cross the iframe document boundary.
  const interactionStyle = frameDocument.createElement("style");
  interactionStyle.textContent = "html, body, body * { -webkit-user-select: none !important; user-select: none !important; } img { -webkit-user-drag: none; }";
  frameDocument.head.append(interactionStyle);
  for (const image of frameDocument.images) image.draggable = false;
  frameDocument.addEventListener("dragstart", (event) => event.preventDefault());

  const frameWindow = frame.contentWindow;
  const background = frameWindow.getComputedStyle(root).backgroundColor;
  for (const surface of [frameDocument.documentElement, frameDocument.body, root.parentElement]) {
    surface.style.backgroundColor = background;
  }
  frame.dataset.background = background;
  // Preserve the approved full-width composition and original image proportions.
  const fit = () => {
    const scale = Math.max(
      frameWindow.innerWidth / ARTBOARD.width,
      frameWindow.innerHeight / ARTBOARD.height,
    );
    root.style.width = `${ARTBOARD.width}px`;
    root.style.height = `${ARTBOARD.height}px`;
    root.style.position = "absolute";
    root.style.left = "50%";
    root.style.top = "50%";
    root.style.transform = `translate(-50%, -50%) scale(${scale})`;
    root.style.transformOrigin = "center center";
    root.dataset.frameScale = String(scale);
  };

  fit();
  const scale = Number(root.dataset.frameScale);
  const rootRect = root.getBoundingClientRect();
  const menuTops = [14.78, 48.69, 67.69, 86.69, 105.69, 124.69, 143.69, 162.69];
  for (const paragraph of frameDocument.querySelectorAll("p")) {
    const logicalTop = (paragraph.getBoundingClientRect().top - rootRect.top) / scale;
    if (menuTops.some((top) => Math.abs(logicalTop - top) < 2.5)) paragraph.style.visibility = "hidden";
  }
  for (const element of frameDocument.querySelectorAll("div")) {
    const style = frameWindow.getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    if (
      style.backgroundColor === "rgb(113, 11, 11)"
      && rect.width / scale > 1200
      && rect.height / scale < 20
    ) element.style.visibility = "hidden";
  }
  frameWindow.addEventListener("resize", fit);
  frameWindow.visualViewport?.addEventListener("resize", fit);
}

function pumpImageQueue() {
  const priority = (job) => job.entries.some((entry) => entry === visibleEntry) ? 2
    : job.entries.some((entry) => entry.file === nextFile) ? 1 : 0;
  imageQueue.sort((a, b) => priority(b) - priority(a));
  while (runningImageJobs < 3 && imageQueue.length) {
    const job = imageQueue.shift();
    // Discard queued upgrades for frames evicted during rapid navigation.
    if (!job.entries.some((entry) => frameCache.get(entry.file) === entry)) {
      imageJobs.delete(job.source);
      job.resolve(null);
      continue;
    }
    runningImageJobs += 1;
    const image = new Image();
    job.image = image;
    image.decoding = "async";
    image.fetchPriority = job.priority > 0 ? "high" : "low";
    const finish = async (success) => {
      image.onload = image.onerror = null;
      if (success) {
        try { await image.decode(); } catch { success = false; }
      }
      job.image = null;
      job.done = true;
      job.entries = [];
      if (!success) imageJobs.delete(job.source);
      job.resolve(success ? image.src : null);
      runningImageJobs -= 1;
      pumpImageQueue();
    };
    image.onload = () => void finish(true);
    image.onerror = () => void finish(false);
    image.src = new URL(job.source, document.baseURI).href;
  }
}

function queueImage(source, entry, priority) {
  let job = imageJobs.get(source);
  if (job) {
    if (job.done) return job.promise;
    job.entries.push(entry);
    job.priority = Math.max(job.priority, priority);
    if (job.image && priority > 0) job.image.fetchPriority = "high";
    return job.promise;
  }
  job = { source, entries: [entry], priority };
  job.promise = new Promise((resolve) => { job.resolve = resolve; });
  imageJobs.set(source, job);
  imageQueue.push(job);
  return job.promise;
}

function upgradeFrameImages(entry, priority = 0) {
  if (!entry.ready) return;
  for (const image of entry.frame.contentDocument.querySelectorAll("img[data-display-src]")) {
    if (image.dataset.displayLoaded === "true") continue;
    // Optimized high-resolution WebPs are the final display tier. Never make
    // the rest of a frame wait behind a multi-megabyte original PNG.
    const source = image.dataset.displaySrc;
    queueImage(source, entry, priority).then(async (url) => {
      if (!url || frameCache.get(entry.file) !== entry || !image.isConnected) return;
      // Decode the replacement element offscreen too: assigning src directly
      // can briefly clear the old pixels while the iframe decodes its image.
      const replacement = image.cloneNode();
      replacement.src = url;
      try { await replacement.decode(); } catch { return; }
      if (frameCache.get(entry.file) !== entry || !image.isConnected) return;
      replacement.dataset.displayLoaded = "true";
      image.replaceWith(replacement);
    });
  }
  pumpImageQueue();
}

function trimFrameCache() {
  for (const [file, entry] of frameCache) {
    if (frameCache.size <= MAX_CACHED_FRAMES) break;
    if (entry === visibleEntry || file === requestedFile || file === nextFile) continue;
    entry.frame.remove();
    frameCache.delete(file);
  }
}

function prepareFrame(project, index) {
  const file = project.frames[index];
  const cached = frameCache.get(file);
  if (cached) {
    frameCache.delete(file);
    frameCache.set(file, cached);
    return cached;
  }
  const frame = document.createElement("iframe");
  frame.className = "project-frame";
  frame.title = `${project.name}, frame ${index + 1} of ${project.frames.length}`;
  frame.tabIndex = -1;
  frame.setAttribute("aria-hidden", "true");
  const entry = { file, frame, project, index, ready: false };
  entry.loaded = new Promise((resolve) => {
    frame.addEventListener("load", async () => {
      if (frameCache.get(file) !== entry) return resolve(false);
      prepareFrameInteractions(frame);
      await Promise.all([...frame.contentDocument.images].map((image) => image.decode().catch(() => {})));
      if (frameCache.get(file) !== entry) return resolve(false);
      entry.ready = true;
      frame.dataset.prepared = "true";
      resolve(true);
    }, { once: true });
  });
  frameCache.set(file, entry);
  frame.src = `assets/figma/frames/${file}?v=${GALLERY_VERSION}`;
  stageArt.append(frame);
  trimFrameCache();
  return entry;
}

function prepareNextFrame(project, index) {
  const nextIndex = (index + 1) % project.frames.length;
  nextFile = project.frames[nextIndex];
  const next = prepareFrame(project, nextIndex);
  next.loaded.then((ready) => {
    if (ready && next.file === nextFile) upgradeFrameImages(next, 0);
  });
}

function renderFrame(index = 0) {
  const project = activeProject();
  if (!project?.frames?.length) return;
  frameIndex = (index + project.frames.length) % project.frames.length;
  requestedFile = project.frames[frameIndex];
  nextFile = project.frames[(frameIndex + 1) % project.frames.length];
  const requestId = ++frameRequestId;
  stageArt.hidden = false;
  stageArt.setAttribute("aria-busy", "true");
  const entry = prepareFrame(project, frameIndex);
  const show = () => {
    if (requestId !== frameRequestId || frameCache.get(entry.file) !== entry) return;
    if (visibleEntry && visibleEntry !== entry) {
      visibleEntry.frame.classList.remove("is-ready");
      visibleEntry.frame.setAttribute("aria-hidden", "true");
    }
    visibleEntry = entry;
    entry.frame.classList.add("is-ready");
    entry.frame.removeAttribute("aria-hidden");
    stageArt.style.backgroundColor = entry.frame.dataset.background;
    // HC Andersen's original menu is white on the purple background.
    stage.style.setProperty("--gallery-ink", project.slug === "hc-andersen" ? "#fff" : "#2c2c2c");
    stageArt.setAttribute("aria-busy", "false");
    upgradeFrameImages(entry, 1);
    prepareNextFrame(project, entry.index);
    trimFrameCache();
  };
  // A prepared frame switches within this click event, without loading a new
  // document, awaiting an animation, or waiting for its large images.
  if (entry.ready) show();
  else entry.loaded.then((ready) => { if (ready) show(); });
}

function selectProject(project) {
  if (!project?.frames) return;
  activeSlug = project.slug;
  frameIndex = 0;
  stage.dataset.project = project.slug;
  document.querySelectorAll(".project-row[data-slug]").forEach((row) => {
    row.setAttribute("aria-pressed", String(row.dataset.slug === project.slug));
  });
  restoreProjectMarker();
  renderFrame(0);
  stageArt.focus({ preventScroll: true });
}

function returnToIndex() {
  const selectedRow = list.querySelector(`.project-row[data-slug="${activeSlug}"]`);
  activeSlug = null;
  frameIndex = 0;
  frameRequestId += 1;
  requestedFile = nextFile = null;
  visibleEntry?.frame.classList.remove("is-ready");
  visibleEntry?.frame.setAttribute("aria-hidden", "true");
  visibleEntry = null;
  stage.style.removeProperty("--gallery-ink");
  stageArt.hidden = true;
  stage.removeAttribute("data-project");
  document.querySelectorAll(".project-row[data-slug]").forEach((row) => row.setAttribute("aria-pressed", "false"));
  list.querySelector(".project-marker")?.classList.remove("is-visible");
  list.querySelectorAll(".is-hovered").forEach((row) => row.classList.remove("is-hovered"));
  selectedRow?.focus({ preventScroll: true });
}

function restoreProjectMarker() {
  const marker = list.querySelector(".project-marker");
  const row = list.querySelector(`.project-row[data-slug="${activeSlug}"]`);
  list.querySelectorAll(".project-row").forEach((item) => item.classList.toggle("is-hovered", item === row));
  if (!marker || !row) {
    marker?.classList.remove("is-visible");
    return;
  }
  marker.style.transform = `translateY(${row.offsetTop}px)`;
  marker.classList.add("is-visible");
}

function showProjectByRow(rowIndex) {
  if (!interactiveRows.has(rowIndex)) return;
  selectProject(projects[rowIndex]);
}

function openInfo() {
  if (!infoView.hidden) return;
  returnFocus = document.activeElement;
  infoView.hidden = false;
  document.body.classList.add("is-view-open");
  infoView.scrollTop = 0;
  infoView.querySelector("#info-title")?.focus();
}

function closeInfo() {
  infoView.hidden = true;
  document.body.classList.remove("is-view-open");
  if (returnFocus instanceof HTMLElement && document.contains(returnFocus)) returnFocus.focus();
  returnFocus = null;
}

renderProjectList();
setArtboardScale();

list.addEventListener("pointermove", (event) => {
  if (event.pointerType === "touch") return;
  const row = event.target.closest(".project-row");
  const marker = list.querySelector(".project-marker");
  if (!marker) return;
  list.querySelectorAll(".project-row").forEach((item) => item.classList.toggle("is-hovered", item === row));
  if (!row) {
    marker.classList.remove("is-visible");
    return;
  }
  marker.style.transform = `translateY(${row.offsetTop}px)`;
  marker.classList.add("is-visible");
});

list.addEventListener("pointerleave", () => {
  if (activeSlug) restoreProjectMarker();
  else {
    list.querySelector(".project-marker")?.classList.remove("is-visible");
    list.querySelectorAll(".is-hovered").forEach((row) => row.classList.remove("is-hovered"));
  }
});

list.addEventListener("pointerover", (event) => {
  clearTimeout(hoverTimer);
  const row = event.target.closest(".project-row[data-slug]");
  if (!row || row.contains(event.relatedTarget)) return;
  hoverTimer = setTimeout(() => {
    const project = projects[Number(row.dataset.index)];
    if (project.slug !== activeSlug) prepareFrame(project, 0);
  }, 70);
});
list.addEventListener("pointerleave", () => clearTimeout(hoverTimer));
list.addEventListener("focusin", (event) => {
  const row = event.target.closest(".project-row[data-slug]");
  if (row) prepareFrame(projects[Number(row.dataset.index)], 0);
});

list.addEventListener("click", (event) => {
  const row = event.target.closest(".project-row[data-slug]");
  if (row) showProjectByRow(Number(row.dataset.index));
});

stageArt.addEventListener("click", () => {
  if (!activeSlug) return;
  renderFrame(frameIndex + 1);
});

window.addEventListener("message", (event) => {
  const frame = visibleEntry?.frame;
  if (!frame || event.source !== frame.contentWindow) return;
  const message = event.data;
  if (!message || message.source !== "agne-figma-frame") return;

  if (message.type === "next") {
    renderFrame(frameIndex + 1);
    return;
  }
  if (message.type === "previous") {
    renderFrame(frameIndex - 1);
    return;
  }
  if (message.type === "about") {
    openInfo();
    return;
  }
  if (message.type === "home") {
    returnToIndex();
    return;
  }
  if (message.type === "select") showProjectByRow(Number(message.index));
});

document.querySelector("#studio-link").addEventListener("click", openInfo);
document.querySelector("#about-link").addEventListener("click", openInfo);
document.querySelector("#info-view [data-home]").addEventListener("click", closeInfo);

window.addEventListener("resize", setArtboardScale);
window.visualViewport?.addEventListener("resize", setArtboardScale);
window.addEventListener("keydown", (event) => {
  if (!infoView.hidden && event.key === "Escape") {
    closeInfo();
    return;
  }
  if (!infoView.hidden && event.key === "Tab") {
    const focusable = [...infoView.querySelectorAll("button, a[href]")];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const activeIndex = focusable.indexOf(document.activeElement);
    if (event.shiftKey && (document.activeElement === first || activeIndex === -1)) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && (document.activeElement === last || activeIndex === -1)) {
      event.preventDefault();
      first?.focus();
    }
    return;
  }
  if (!activeSlug || !infoView.hidden) return;
  if (event.key === "ArrowLeft") renderFrame(frameIndex - 1);
  if (event.key === "ArrowRight") renderFrame(frameIndex + 1);
  if (event.key === "Escape") returnToIndex();
});
