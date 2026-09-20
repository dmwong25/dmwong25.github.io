const yearNode = document.querySelector("[data-year]");
if (yearNode) yearNode.textContent = new Date().getFullYear();

const nav = document.querySelector("[data-nav]");
if (nav) {
  const updateNav = () =>
    nav.classList.toggle("is-scrolled", window.scrollY > 12);
  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });
}

const photoFigures = [...document.querySelectorAll("[data-photo-year]")];
const galleryItems = [...document.querySelectorAll("[data-gallery-item]")];
const filters = [...document.querySelectorAll("[data-filter]")];
const galleryCount = document.querySelector("[data-gallery-count]");
const toolbar = document.querySelector("[data-gallery-toolbar]");
const lightbox = document.querySelector("[data-lightbox]");
let visibleItems = galleryItems;
let activeYear = "all";
const subjectFilter = document.querySelector("[data-subject-filter]");
const emptyGallery = document.querySelector("[data-gallery-empty]");
const resetGallery = document.querySelector("[data-gallery-reset]");
const savedFilter = document.querySelector("[data-saved-filter]");
const savedCount = document.querySelector("[data-saved-count]");
const saveNote = document.querySelector("[data-save-note]");
const savedKey = "david-wong:photo-favorites:v1";
const validPhotoIds = new Set(photoFigures.map((figure) => figure.id));
let savedPhotos = new Set();
let savedOnly = false;
try {
  const stored = JSON.parse(localStorage.getItem(savedKey) || "[]");
  if (Array.isArray(stored))
    savedPhotos = new Set(stored.filter((id) => validPhotoIds.has(id)));
} catch {
  /* Favorites remain usable for this visit if storage is unavailable. */
}
const saveButtons = new Map();
const updateSavedControls = () => {
  if (savedCount) savedCount.textContent = savedPhotos.size;
  savedFilter?.setAttribute("aria-pressed", String(savedOnly));
  saveButtons.forEach((button, id) =>
    button.setAttribute("aria-pressed", String(savedPhotos.has(id))),
  );
};

const filterPhotos = (year) => {
  activeYear = year;
  const subject = subjectFilter?.value || "all";
  photoFigures.forEach((figure) => {
    figure.hidden =
      (year !== "all" && figure.dataset.photoYear !== year) ||
      (subject !== "all" && figure.dataset.photoSubject !== subject) ||
      (savedOnly && !savedPhotos.has(figure.id));
  });
  filters.forEach((button) =>
    button.setAttribute("aria-pressed", String(button.dataset.filter === year)),
  );
  visibleItems = galleryItems.filter((item) => !item.closest("figure").hidden);
  if (galleryCount)
    galleryCount.textContent = `${visibleItems.length} ${visibleItems.length === 1 ? "photograph" : "photographs"}`;
  if (emptyGallery) emptyGallery.hidden = visibleItems.length !== 0;
  updateSavedControls();
};
photoFigures.forEach((figure) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "photo-save";
  button.setAttribute(
    "aria-label",
    `Save ${figure.querySelector("figcaption span").textContent}`,
  );
  button.innerHTML =
    '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg>';
  button.addEventListener("click", () => {
    if (savedPhotos.has(figure.id)) savedPhotos.delete(figure.id);
    else savedPhotos.add(figure.id);
    try {
      localStorage.setItem(savedKey, JSON.stringify([...savedPhotos]));
    } catch {
      if (saveNote)
        saveNote.textContent =
          "Browser storage is unavailable. Your picks will last for this visit only.";
    }
    filterPhotos(activeYear);
    if (figure.hidden) savedFilter?.focus();
  });
  figure.append(button);
  saveButtons.set(figure.id, button);
});
savedFilter?.addEventListener("click", () => {
  savedOnly = !savedOnly;
  filterPhotos(activeYear);
});
updateSavedControls();
resetGallery?.addEventListener("click", () => {
  savedOnly = false;
  if (subjectFilter) subjectFilter.value = "all";
  filterPhotos("all");
  filters.find((button) => button.dataset.filter === "all")?.focus();
});
filters.forEach((button) =>
  button.addEventListener("click", () => filterPhotos(button.dataset.filter)),
);
if (toolbar) toolbar.hidden = false;
subjectFilter?.addEventListener("change", () => filterPhotos(activeYear));

// A shared photo link must stay reachable even after a year filter was selected.
const revealLinkedPhoto = () => {
  const target = photoFigures.find(
    (figure) => `#${figure.id}` === location.hash,
  );
  if (!target) return;
  if (target.hidden) {
    savedOnly = false;
    if (subjectFilter) subjectFilter.value = "all";
    filterPhotos("all");
  }
  target.scrollIntoView({ block: "start", behavior: "instant" });
};
window.addEventListener("hashchange", revealLinkedPhoto);
if (location.hash) requestAnimationFrame(revealLinkedPhoto);

if (galleryItems.length && lightbox) {
  const image = lightbox.querySelector("[data-lightbox-image]");
  const caption = lightbox.querySelector("[data-lightbox-caption]");
  const count = lightbox.querySelector("[data-lightbox-count]");
  const close = lightbox.querySelector("[data-lightbox-close]");
  const previous = lightbox.querySelector("[data-lightbox-previous]");
  const next = lightbox.querySelector("[data-lightbox-next]");
  let activeIndex = 0;
  let opener;
  const render = (index) => {
    activeIndex = (index + visibleItems.length) % visibleItems.length;
    const item = visibleItems[activeIndex];
    const source = item.querySelector("img");
    const figureCaption = item.closest("figure").querySelector("figcaption");
    image.src = source.src;
    image.alt = source.alt;
    caption.textContent = `${figureCaption.querySelector("span").textContent} · ${figureCaption.querySelector("time").textContent}`;
    count.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(visibleItems.length).padStart(2, "0")}`;
  };
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      opener = item;
      render(visibleItems.indexOf(item));
      lightbox.showModal();
      document.body.classList.add("lightbox-open");
    });
  });
  close.addEventListener("click", () => lightbox.close());
  previous.addEventListener("click", () => render(activeIndex - 1));
  next.addEventListener("click", () => render(activeIndex + 1));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener("close", () => {
    document.body.classList.remove("lightbox-open");
    image.removeAttribute("src");
    opener?.focus({ preventScroll: true });
  });
  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      render(activeIndex + (event.key === "ArrowLeft" ? -1 : 1));
    }
  });
}
