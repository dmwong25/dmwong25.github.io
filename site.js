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
