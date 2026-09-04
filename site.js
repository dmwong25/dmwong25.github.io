document.documentElement.classList.add("js");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const yearNode = document.querySelector("[data-year]");
if (yearNode) yearNode.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(".reveal");

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const photoGrids = [...document.querySelectorAll(".photo-grid")];

if (photoGrids.length) {
  photoGrids.forEach((grid) => {
    grid._items = [...grid.children].filter((el) => el.classList.contains("photo-item"));
  });

  const GRID_GAP = 24;
  const CAPTION_ALLOWANCE = 30;

  const columnCountFor = (width) => {
    if (width < 900) return 1;
    if (width < 1300) return 2;
    return 3;
  };

  const layoutGrid = (grid) => {
    const items = grid._items;
    if (!items || !items.length) return;

    const width = grid.clientWidth;
    const cols = columnCountFor(width);
    const colWidth = (width - GRID_GAP * (cols - 1)) / cols;

    const columns = Array.from({ length: cols }, () => ({
      height: 0,
      el: document.createElement("div"),
    }));
    columns.forEach((col) => col.el.classList.add("photo-col"));

    items.forEach((item) => {
      const img = item.querySelector("img");
      const naturalWidth = Number(img.getAttribute("width")) || 1;
      const naturalHeight = Number(img.getAttribute("height")) || 1;
      const estimatedHeight = (colWidth * naturalHeight) / naturalWidth + CAPTION_ALLOWANCE;

      const shortest = columns.reduce((a, b) => (a.height <= b.height ? a : b));
      shortest.el.appendChild(item);
      shortest.height += estimatedHeight + GRID_GAP;
    });

    grid.replaceChildren(...columns.map((col) => col.el));
  };

  const layoutAllGrids = () => photoGrids.forEach(layoutGrid);
  layoutAllGrids();
  window.addEventListener("load", layoutAllGrids);

  let resizeTimer;
  window.addEventListener(
    "resize",
    () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layoutAllGrids, 150);
    },
    { passive: true },
  );
}

const nav = document.querySelector("[data-nav]");

if (nav) {
  const setNavState = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
  setNavState();
  window.addEventListener("scroll", setNavState, { passive: true });
}

const galleryItems = [...document.querySelectorAll("[data-gallery-item]")];
const lightbox = document.querySelector("[data-lightbox]");

if (galleryItems.length && lightbox) {
  const lightboxImage = lightbox.querySelector("[data-lightbox-image]");
  const lightboxCaption = lightbox.querySelector("[data-lightbox-caption]");
  const lightboxCount = lightbox.querySelector("[data-lightbox-count]");
  const closeButton = lightbox.querySelector("[data-lightbox-close]");
  const previousButton = lightbox.querySelector("[data-lightbox-previous]");
  const nextButton = lightbox.querySelector("[data-lightbox-next]");
  let activeImage = 0;

  const renderLightbox = (index) => {
    activeImage = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[activeImage];
    const sourceImage = item.querySelector("img");
    const figureCaption = item.closest("figure").querySelector("figcaption");
    const dateLabel = figureCaption.querySelector("time").textContent.trim();

    lightboxImage.src = sourceImage.currentSrc || sourceImage.src;
    lightboxImage.alt = sourceImage.alt;
    lightboxCaption.textContent = `frame ${String(activeImage + 1).padStart(2, "0")} · ${dateLabel}`;
    lightboxCount.textContent = `${String(activeImage + 1).padStart(2, "0")} / ${String(galleryItems.length).padStart(2, "0")}`;
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      renderLightbox(index);
      lightbox.showModal();
      document.body.classList.add("lightbox-open");
    });
  });

  closeButton.addEventListener("click", () => lightbox.close());
  previousButton.addEventListener("click", () => renderLightbox(activeImage - 1));
  nextButton.addEventListener("click", () => renderLightbox(activeImage + 1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });

  lightbox.addEventListener("close", () => {
    document.body.classList.remove("lightbox-open");
    lightboxImage.removeAttribute("src");
  });

  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") renderLightbox(activeImage - 1);
    if (event.key === "ArrowRight") renderLightbox(activeImage + 1);
  });
}
