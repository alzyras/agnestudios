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

const framePreviewSources = {
  "amourlinen-1.html": [
    "assets/figma/previews/amour-frame-1-f55d54a94c-small.webp"
  ],
  "amourlinen-2.html": [
    "assets/figma/previews/15dfab42-3934-4ffc-ae5f-f8d7cd52955a-ec5b81a71e-small.webp",
    "assets/figma/previews/f396a446-86be-4b5d-90e5-97a85cab982c-173b3a633c-small.webp",
    "assets/figma/previews/8c2f3194-cfc1-4ec8-bee5-823b37c06a73-057a1afb34-small.webp",
    "assets/figma/previews/de8b4a2e-db9f-4a20-95d1-298d4544b6ff-28afd4d825-small.webp"
  ],
  "amourlinen-3.html": [
    "assets/figma/previews/e64f1ef6-e0a9-4b70-8f8d-42aacfc115dc-5a7d49d786-small.webp",
    "assets/figma/previews/9fb150d0-841f-4014-886c-e83fe475cc29-0cb6ff3cf2-small.webp",
    "assets/figma/previews/0968804c-f6b2-4c34-82b4-a68a5d964022-8319b354c5-small.webp",
    "assets/figma/previews/6963fc8d-a940-4bbd-8f05-9baa8b46e0cf-513f10040e-small.webp",
    "assets/figma/previews/69c807af-a860-442f-b3ea-130da2127ea1-f0f238e59c-small.webp",
    "assets/figma/previews/cf7f5fe3-a6e2-4e10-85c6-de8d64ea3b5c-eb91372e44-small.webp"
  ],
  "amourlinen-4.html": [
    "assets/figma/previews/amourlinen-4-campaign-5ae54f1050-small.webp"
  ],
  "amourlinen-5.html": [
    "assets/figma/previews/amourlinen-5-summer-essentials-3d4aa02503-small.webp",
    "assets/figma/previews/amourlinen-5-wear-more-buy-less-76e97afe8b-small.webp",
    "assets/figma/previews/amourlinen-5-handbag-campaign-b6079aa098-small.webp",
    "assets/figma/previews/amourlinen-5-still-in-bed-d9ac320060-small.webp",
    "assets/figma/previews/amourlinen-5-meet-blanche-86629429bb-small.webp",
    "assets/figma/previews/amourlinen-5-mothers-month-c3d1f5476b-small.webp"
  ],
  "eddies-1.html": [
    "assets/figma/previews/cc9deded-e0e8-4e20-92cc-ea860b45156a-20dbe744da-small.webp"
  ],
  "eddies-2.html": [
    "assets/figma/previews/e5a8fd7c-6b2a-405d-b568-5500c6a8758a-bceffd4708-small.webp"
  ],
  "eddies-3.html": [
    "assets/figma/previews/eddies-3-chocolate-still-life-3a7a949b24-small.webp"
  ],
  "eddies-4.html": [
    "assets/figma/previews/64d4b850-55ac-4f4e-8f87-6cbc6680bccb-fbbf5cdfbd-small.webp",
    "assets/figma/previews/6238ea13-df91-41b1-88a8-e7da274519b6-861e8c9adb-small.webp",
    "assets/figma/previews/51b1e2b7-b0b7-4c00-877d-6a06d4b55516-595ac1d9cd-small.webp"
  ],
  "eddies-5.html": [
    "assets/figma/previews/97fb6899-4e13-4292-acd6-c339ded87207-a82dccfd76-small.webp",
    "assets/figma/previews/9e2a7304-17ab-4c74-a457-f88b57fbf407-a058fe8e99-small.webp",
    "assets/figma/previews/598c3380-dcfc-4588-bad3-109e78cd0b8a-02796a7d7d-small.webp",
    "assets/figma/previews/58a31e06-0a1a-4331-b446-8ae28c87f043-92b54431ac-small.webp",
    "assets/figma/previews/79c3a7c2-c043-4146-80a5-81f2b4ee3c9e-2cf3f7254d-small.webp"
  ],
  "hc-andersen-1.html": [
    "assets/figma/previews/adf2a699-2102-4312-aae7-b2e07564630c-820af75167-small.webp",
    "assets/figma/c9676a09-96b0-4e90-a37c-f8b01b57d1c5.svg",
    "assets/figma/previews/8f048886-bbff-44e9-b70c-47a940043944-e9c4a99fed-small.webp",
    "assets/figma/previews/bc345903-91c0-4ba0-999b-d48059841d58-f1aa13ea7d-small.webp",
    "assets/figma/323192b7-839f-4c7e-89c2-068cab6015d1.svg",
    "assets/figma/previews/60ef575c-d84f-42be-92a7-55bb3a41fd73-fda07c588f-small.webp",
    "assets/figma/c3b76aec-e44e-4b42-a409-e9bf3f3703c2.svg",
    "assets/figma/previews/f7de063a-4516-4f50-b467-6c063570c8a0-fcb75291ca-small.webp",
    "assets/figma/previews/092390e3-3738-4a08-8ee3-368424727a2f-75629cec04-small.webp",
    "assets/figma/previews/0ef1a69e-a6bd-4c11-8b11-0527d0cb8a51-c4282c6046-small.webp",
    "assets/figma/previews/73da7a43-561b-4b03-ab1d-538aeae0624e-bbaa1777e9-small.webp",
    "assets/figma/542befe7-b945-4b30-a8a9-298ef641a2be.svg",
    "assets/figma/4503e900-6ed4-4219-99df-4a438b96a681.svg",
    "assets/figma/previews/30278464-896f-442b-97bc-6e5b659997af-661da51bc9-small.webp",
    "assets/figma/9462388e-a507-49ae-a68b-5ce73832707f.svg",
    "assets/figma/previews/417c4246-a406-4d27-809b-2673d864a7c3-6bcd650cd3-small.webp",
    "assets/figma/fc6294d3-5be4-47ae-b787-20f1af73e6a0.svg",
    "assets/figma/previews/245f204e-bf3f-4762-88e5-910a6d0ae020-7f70234ca3-small.webp",
    "assets/figma/9ec2bf89-382a-49c5-b94f-200724d0ac74.svg",
    "assets/figma/a99e5152-7160-496e-9689-8a531ae84b2f.svg",
    "assets/figma/previews/4d46fa98-11a7-4179-bc6d-0f4b6160e796-d5cffe7a55-small.webp",
    "assets/figma/958965d5-41f7-4ce4-863a-f3743ad2bf51.svg",
    "assets/figma/previews/ce622404-3fe3-4350-a20a-1e1fd1beb169-9f45319f6f-small.webp",
    "assets/figma/ed096094-3ddc-48d2-b115-50f449ea9e26.svg",
    "assets/figma/3c363ea6-ce00-4590-9604-ca8f7cb182f8.svg",
    "assets/figma/previews/64f014f7-9f1d-4889-a3ae-4aed50897c40-99cd98951a-small.webp",
    "assets/figma/previews/83210984-c1be-4375-9aec-d80ca3f10297-9165a31613-small.webp",
    "assets/figma/b9c2e22b-7818-47bc-ab4d-cef306393f07.svg"
  ],
  "hc-andersen-2.html": [
    "assets/figma/previews/2eaf66d2-7306-40b5-99db-f19a220e16ca-db9922f512-small.webp",
    "assets/figma/previews/3bd006af-d0c3-498a-93e4-d3f7a706db7e-655285a3cb-small.webp",
    "assets/figma/previews/8da1de48-7e04-4d5d-b845-9d50f753ef0f-9509b967b9-small.webp"
  ],
  "hc-andersen-3.html": [
    "assets/figma/previews/417c4246-a406-4d27-809b-2673d864a7c3-6bcd650cd3-small.webp",
    "assets/figma/previews/73da7a43-561b-4b03-ab1d-538aeae0624e-bbaa1777e9-small.webp",
    "assets/figma/previews/ce622404-3fe3-4350-a20a-1e1fd1beb169-9f45319f6f-small.webp",
    "assets/figma/previews/ebf65ee3-7fd7-4d4d-81d0-8a60db8d7c86-dee18e03e7-small.webp",
    "assets/figma/previews/245f204e-bf3f-4762-88e5-910a6d0ae020-7f70234ca3-small.webp",
    "assets/figma/previews/4d46fa98-11a7-4179-bc6d-0f4b6160e796-d5cffe7a55-small.webp",
    "assets/figma/previews/8da1de48-7e04-4d5d-b845-9d50f753ef0f-9509b967b9-small.webp"
  ],
  "hc-andersen-4.html": [
    "assets/figma/previews/13a7ffbf-254b-46de-8e9c-0b9252fae530-01f3f7f9ad-small.webp",
    "assets/figma/previews/6e59fbb6-2bff-4c28-859b-74f196bc5c1a-494f20f5b3-small.webp"
  ],
  "lamu-slenis-1.html": [
    "assets/figma/previews/d48a868c-cfa5-4caf-9dfc-d2af6c6b7def-4a18cbc60b-small.webp",
    "assets/figma/previews/e2a3ec24-6fe1-4d8f-a54c-93c9a957f679-04b0d60d3a-small.webp"
  ],
  "lamu-slenis-2.html": [
    "assets/figma/previews/lamu-slenis-2-spread-8adce217f2-small.webp"
  ],
  "lamu-slenis-3.html": [
    "assets/figma/previews/lamu-slenis-3-spread-988c863bff-small.webp"
  ],
  "lamu-slenis-4.html": [
    "assets/figma/previews/lamu-slenis-4-spread-d1a68844b5-small.webp"
  ],
  "lamu-slenis-5.html": [
    "assets/figma/previews/lamu-slenis-5-spread-9984f6a86e-small.webp"
  ],
  "sadria-metals-1.html": [
    "assets/figma/previews/21bc9c6c-26d8-4fc2-95ed-cc2d5c16b37c-bc0f025ec7-small.webp"
  ],
  "sadria-metals-2.html": [
    "assets/figma/previews/6d0e37fa-ac35-4dc1-a0bc-2d1b6a4d51d6-d5ecc0c25f-small.webp",
    "assets/figma/previews/607e2edd-5b5e-47ef-b73e-db7b40676259-49a79f308a-small.webp"
  ],
  "sadria-metals-3.html": [
    "assets/figma/previews/50c7d292-79a9-48f8-ae66-7907ea2b1d32-42bc07b3c5-small.webp"
  ],
  "sadria-metals-4.html": [
    "assets/figma/previews/sadria-2-shadow-necklace-c6e8e37636-small.webp",
    "assets/figma/previews/sadria-2-seaside-profile-eef7cf4cee-small.webp"
  ],
  "sadria-metals-5.html": [
    "assets/figma/previews/2da4d519-dff5-403a-ae04-345b94473eec-d51f1e4130-small.webp"
  ],
  "sadria-metals-6.html": [
    "assets/figma/previews/e429571b-7559-4b57-9ba2-b00e5f3fff5c-bc64288524-small.webp"
  ],
  "sadria-metals-7.html": [
    "assets/figma/previews/59ac3193-f108-4df7-925f-93018b39b502-2120c7c282-small.webp",
    "assets/figma/previews/f8d0cd77-cc1b-4564-b909-e7d5122c8dcb-abd74ee34a-small.webp"
  ]
};

const framesWithSharedStyles = new Set([
  "amourlinen-2.html", "amourlinen-3.html", "eddies-1.html", "eddies-2.html", "eddies-4.html",
  "eddies-5.html", "hc-andersen-1.html", "hc-andersen-2.html", "hc-andersen-3.html",
  "hc-andersen-4.html", "lamu-slenis-1.html", "sadria-metals-1.html", "sadria-metals-2.html",
  "sadria-metals-6.html", "sadria-metals-7.html",
]);

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
let fullResolutionIdleHandle = null;
let fullResolutionIdleUsesTimeout = false;
let pendingFullResolutionImage = null;
let cancelPendingFullResolutionLoad = null;
let nextFramePreloadId = 0;
let nextFramePreloadImages = [];
let nextFramePreloadTarget = null;
let frameStylesheetPreloaded = false;

const EMPTY_IMAGE = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

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

function preloadFrameStylesheet(frameFile) {
  if (!framesWithSharedStyles.has(frameFile) || frameStylesheetPreloaded) return;
  frameStylesheetPreloaded = true;
  const preload = document.createElement("link");
  preload.rel = "preload";
  preload.as = "style";
  preload.fetchPriority = "low";
  preload.href = new URL("assets/figma/figma-frames.css", document.baseURI).href;
  document.head.append(preload);
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

function cancelFrameImageWork(targetFrameFile = null) {
  if (fullResolutionIdleHandle !== null) {
    if (fullResolutionIdleUsesTimeout) window.clearTimeout(fullResolutionIdleHandle);
    else window.cancelIdleCallback?.(fullResolutionIdleHandle);
    fullResolutionIdleHandle = null;
  }
  cancelPendingFullResolutionLoad?.();
  if (nextFramePreloadTarget !== targetFrameFile) {
    nextFramePreloadTarget = null;
    nextFramePreloadId += 1;
    for (const image of nextFramePreloadImages) {
      if (!image.complete) {
        image.onload = null;
        image.onerror = null;
        image.src = EMPTY_IMAGE;
      }
    }
    nextFramePreloadImages = [];
  }
}

function isCurrentFrame(frame, requestId) {
  return Boolean(frame) && requestId === frameRequestId && frame.isConnected && stageArt.contains(frame);
}

function loadFrameImage(source, priority) {
  return new Promise((resolve) => {
    const loader = new Image();
    let settled = false;
    loader.decoding = "async";
    loader.fetchPriority = priority;

    const finish = async (loaded) => {
      if (settled) return;
      settled = true;
      loader.onload = null;
      loader.onerror = null;
      if (pendingFullResolutionImage === loader) pendingFullResolutionImage = null;
      if (cancelPendingFullResolutionLoad === cancel) cancelPendingFullResolutionLoad = null;
      if (loaded) {
        try {
          await loader.decode();
        } catch {
          // A loaded image is usable if decode() is unavailable or rejects.
        }
        resolve(loader.src);
      } else {
        resolve(null);
      }
    };
    const cancel = () => {
      if (settled) return;
      settled = true;
      loader.onload = null;
      loader.onerror = null;
      loader.src = EMPTY_IMAGE;
      if (pendingFullResolutionImage === loader) pendingFullResolutionImage = null;
      if (cancelPendingFullResolutionLoad === cancel) cancelPendingFullResolutionLoad = null;
      resolve(null);
    };

    pendingFullResolutionImage = loader;
    cancelPendingFullResolutionLoad = cancel;
    loader.onload = () => void finish(true);
    loader.onerror = () => void finish(false);
    loader.src = new URL(source, document.baseURI).href;
  });
}

async function upgradeFrameImages(frame, requestId) {
  let frameDocument;
  try {
    frameDocument = frame.contentDocument;
  } catch {
    return;
  }
  if (!frameDocument || !isCurrentFrame(frame, requestId)) return;

  const images = [...frameDocument.querySelectorAll("img[data-full-src]")];
  const loadedSources = new Map();
  for (const image of images) {
    if (!isCurrentFrame(frame, requestId)) return;
    const stages = [
      [image.dataset.displaySrc, "displayLoaded", "high"],
      [image.dataset.fullSrc, "fullLoaded", "low"],
    ];
    for (const [source, loadedFlag, priority] of stages) {
      if (!source || image.dataset[loadedFlag] === "true") continue;
      let url = loadedSources.get(source);
      if (!url) {
        url = await loadFrameImage(source, priority);
        if (!url || !isCurrentFrame(frame, requestId)) return;
        loadedSources.set(source, url);
      }
      if (image.isConnected && isCurrentFrame(frame, requestId)) {
        image.src = url;
        image.dataset[loadedFlag] = "true";
      }
    }
  }
}

function scheduleFrameImageUpgrade(frame, requestId) {
  const run = () => {
    fullResolutionIdleHandle = null;
    if (isCurrentFrame(frame, requestId)) void upgradeFrameImages(frame, requestId);
  };
  if ("requestIdleCallback" in window) {
    fullResolutionIdleUsesTimeout = false;
    fullResolutionIdleHandle = window.requestIdleCallback(run, { timeout: 900 });
  } else {
    fullResolutionIdleUsesTimeout = true;
    fullResolutionIdleHandle = window.setTimeout(run, 180);
  }
}

function preloadNextFramePreviews(project, index, frame, requestId) {
  if (project.frames.length < 2 || !isCurrentFrame(frame, requestId)) return;
  const preloadId = ++nextFramePreloadId;
  const nextFile = project.frames[(index + 1) % project.frames.length];
  nextFramePreloadTarget = nextFile;
  preloadFrameStylesheet(nextFile);
  for (const source of framePreviewSources[nextFile] || []) {
    if (preloadId !== nextFramePreloadId) return;
    const image = new Image();
    image.decoding = "async";
    image.fetchPriority = "low";
    nextFramePreloadImages.push(image);
    image.src = new URL(source, document.baseURI).href;
  }
}

function renderFrame(index = 0) {
  const project = activeProject();
  if (!project?.frames?.length) return;

  frameIndex = (index + project.frames.length) % project.frames.length;
  const renderedIndex = frameIndex;
  const file = project.frames[renderedIndex];
  const requestId = ++frameRequestId;
  cancelFrameImageWork(file);
  const frame = document.createElement("iframe");
  frame.className = "project-frame";
  frame.title = `${project.name}, frame ${renderedIndex + 1} of ${project.frames.length}`;
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
      scheduleFrameImageUpgrade(frame, requestId);
    });
  }, { once: true });
  frame.src = `assets/figma/frames/${file}`;
  stageArt.append(frame);
  stageArt.hidden = false;
  preloadFrameStylesheet(file);
  void preloadNextFramePreviews(project, renderedIndex, frame, requestId);
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
  cancelFrameImageWork();
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
