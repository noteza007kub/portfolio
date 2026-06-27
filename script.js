
const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

revealItems.forEach((item) => {
  observer.observe(item);
});

const galleryImages = document.querySelectorAll(".gallery-card img");
const lightbox = document.getElementById("image-lightbox");
const lightboxImage = lightbox ? lightbox.querySelector("img") : null;
const lightboxClose = lightbox ? lightbox.querySelector(".lightbox-close") : null;
let lastFocusedGalleryImage = null;
let currentImageIndex = -1;

function updateLightboxContent() {
  if (!lightboxImage || currentImageIndex < 0 || currentImageIndex >= galleryImages.length) {
    return;
  }
  const activeImage = galleryImages[currentImageIndex];
  lightboxImage.src = activeImage.src;
  lightboxImage.alt = activeImage.alt;
}

function showNextImage() {
  if (galleryImages.length === 0) return;
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  updateLightboxContent();
}

function showPrevImage() {
  if (galleryImages.length === 0) return;
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  updateLightboxContent();
}

function openLightbox(image) {
  if (!lightbox || !lightboxImage) {
    return;
  }

  currentImageIndex = Array.from(galleryImages).indexOf(image);
  lastFocusedGalleryImage = image;
  updateLightboxContent();
  
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");

  if (lightboxClose) {
    lightboxClose.focus();
  }
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  currentImageIndex = -1;

  if (lastFocusedGalleryImage) {
    lastFocusedGalleryImage.focus();
  }
}

galleryImages.forEach((image) => {
  image.tabIndex = 0;
  image.setAttribute("role", "button");
  image.setAttribute("aria-label", "Open image");

  image.addEventListener("click", () => {
    openLightbox(image);
  });

  image.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(image);
    }
  });
});

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

document.addEventListener("keydown", (event) => {
  if (lightbox && lightbox.classList.contains("open")) {
    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowRight") {
      showNextImage();
    } else if (event.key === "ArrowLeft") {
      showPrevImage();
    }
  }
});
