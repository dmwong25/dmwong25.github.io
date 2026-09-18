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

const filterPhotos = (year) => {
  activeYear = year;
  const subject = subjectFilter?.value || "all";
  photoFigures.forEach((figure) => {
    figure.hidden =
      (year !== "all" && figure.dataset.photoYear !== year) ||
      (subject !== "all" && figure.dataset.photoSubject !== subject);
  });
  filters.forEach((button) =>
    button.setAttribute("aria-pressed", String(button.dataset.filter === year)),
  );
  visibleItems = galleryItems.filter((item) => !item.closest("figure").hidden);
  if (galleryCount)
    galleryCount.textContent = `${visibleItems.length} photographs`;
};
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
