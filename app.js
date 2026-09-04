document.documentElement.classList.add("js");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelector("[data-year]").textContent = new Date().getFullYear();

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
    { threshold: 0.14 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const heroMedia = document.querySelector(".hero-media");
const focusSection = document.querySelector(".focus");
const focusOrbit = document.querySelector(".focus-orbit");

if (!reduceMotion) {
  let ticking = false;

  const updateMotion = () => {
    const scrollY = window.scrollY;
    heroMedia.style.transform = `scale(1.04) translateY(${Math.min(scrollY * 0.08, 36)}px)`;

    const focusRect = focusSection.getBoundingClientRect();
    const focusProgress = Math.max(0, Math.min(1, -focusRect.top / Math.max(1, focusRect.height - window.innerHeight)));
    focusOrbit.style.transform = `rotate(${focusProgress * 12 - 6}deg) scale(${0.95 + focusProgress * 0.05})`;
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateMotion);
    },
    { passive: true },
  );

  updateMotion();
}

const cursor = document.querySelector(".cursor-dot");

if (window.matchMedia("(pointer: fine)").matches && !reduceMotion) {
  window.addEventListener("pointermove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    cursor.classList.add("is-active");
  });

  document.querySelectorAll("a, button").forEach((control) => {
    control.addEventListener("pointerenter", () => cursor.classList.add("is-over-link"));
    control.addEventListener("pointerleave", () => cursor.classList.remove("is-over-link"));
  });
}

const header = document.querySelector("[data-header]");
const menuOpenButton = document.querySelector("[data-menu-open]");
const menuCloseButtons = document.querySelectorAll("[data-menu-close]");
const drawer = document.querySelector(".nav-drawer");
const drawerLinks = [...document.querySelectorAll("[data-nav-link]")];
const currentIndex = document.querySelector("[data-current-index]");

drawer.inert = true;

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

const openMenu = () => {
  document.body.classList.add("menu-open");
  menuOpenButton.setAttribute("aria-expanded", "true");
  drawer.setAttribute("aria-hidden", "false");
  drawer.inert = false;
  window.setTimeout(() => drawer.querySelector("[data-menu-close]").focus(), 80);
};

const closeMenu = ({ returnFocus = true } = {}) => {
  document.body.classList.remove("menu-open");
  menuOpenButton.setAttribute("aria-expanded", "false");
  drawer.setAttribute("aria-hidden", "true");
  drawer.inert = true;
  if (returnFocus) menuOpenButton.focus();
};

menuOpenButton.addEventListener("click", openMenu);
menuCloseButtons.forEach((button) => button.addEventListener("click", () => closeMenu()));

drawerLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setActiveSection(link.dataset.navLink);
    closeMenu({ returnFocus: false });
  });
});

document.addEventListener("keydown", (event) => {
  const menuIsOpen = document.body.classList.contains("menu-open");

  if (event.key === "Escape" && menuIsOpen) {
    closeMenu();
  }

  if (event.key === "Tab" && menuIsOpen) {
    const focusableItems = [...drawer.querySelectorAll("a, button")];
    const firstItem = focusableItems[0];
    const lastItem = focusableItems[focusableItems.length - 1];

    if (event.shiftKey && document.activeElement === firstItem) {
      event.preventDefault();
      lastItem.focus();
    } else if (!event.shiftKey && document.activeElement === lastItem) {
      event.preventDefault();
      firstItem.focus();
    }
  }
});

const setActiveSection = (id) => {
  drawerLinks.forEach((link) => {
    const isActive = link.dataset.navLink === id;
    link.classList.toggle("is-active", isActive);
    if (isActive) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });

  const activeLink = drawerLinks.find((link) => link.dataset.navLink === id);
  if (activeLink) currentIndex.textContent = activeLink.querySelector("span").textContent;
};

const pageSections = drawerLinks
  .map((link) => document.getElementById(link.dataset.navLink))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries.find((entry) => entry.isIntersecting);
      if (visibleEntry) setActiveSection(visibleEntry.target.id);
    },
    { rootMargin: "-42% 0px -52% 0px", threshold: 0 },
  );

  pageSections.forEach((section) => sectionObserver.observe(section));
}

setActiveSection("top");
setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

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
    lightboxCaption.textContent = `Frame ${String(activeImage + 1).padStart(2, "0")} · ${dateLabel}`;
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
