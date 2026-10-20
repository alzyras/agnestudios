const ARTBOARD = { width: 1512, height: 982 };

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

  const frameWindow = frame.contentWindow;
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
}

function renderFrame(index = 0) {
  const project = activeProject();
  if (!project?.frames?.length) return;

  frameIndex = (index + project.frames.length) % project.frames.length;
  const file = project.frames[frameIndex];
  const requestId = ++frameRequestId;
  const frame = document.createElement("iframe");
  frame.className = "project-frame";
  frame.title = `${project.name}, frame ${frameIndex + 1} of ${project.frames.length}`;
  frame.setAttribute("allowtransparency", "true");
  frame.addEventListener("load", () => {
    if (requestId !== frameRequestId) {
      frame.remove();
      return;
    }
    prepareFrameInteractions(frame);
    requestAnimationFrame(() => {
      if (requestId !== frameRequestId) {
        frame.remove();
        return;
      }
      frame.classList.add("is-ready");
      for (const previousFrame of stageArt.querySelectorAll("iframe")) {
        if (previousFrame !== frame) previousFrame.remove();
      }
    });
  }, { once: true });
  frame.src = `assets/figma/frames/${file}`;
  stageArt.append(frame);
  stageArt.hidden = false;
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
  activeSlug = null;
  frameIndex = 0;
  frameRequestId += 1;
  stageArt.replaceChildren();
  stageArt.hidden = true;
  stage.removeAttribute("data-project");
  document.querySelectorAll(".project-row[data-slug]").forEach((row) => row.setAttribute("aria-pressed", "false"));
  list.querySelector(".project-marker")?.classList.remove("is-visible");
  list.querySelectorAll(".is-hovered").forEach((row) => row.classList.remove("is-hovered"));
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

list.addEventListener("click", (event) => {
  const row = event.target.closest(".project-row[data-slug]");
  if (row) showProjectByRow(Number(row.dataset.index));
});

stageArt.addEventListener("click", () => {
  if (!activeSlug) return;
  renderFrame(frameIndex + 1);
});

window.addEventListener("message", (event) => {
  const frame = stageArt.querySelector("iframe");
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
