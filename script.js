const waveform = document.getElementById("waveform");
const barHeights = [20, 45, 70, 100, 65, 35, 85, 55, 25, 75];

if (waveform) {
  for (let i = 0; i < 48; i++) {
    const bar = document.createElement("div");
    bar.className = "wave-bar";
    bar.style.height = `${barHeights[i % barHeights.length]}%`;
    bar.style.animationDelay = `${i * 0.04}s`;
    waveform.appendChild(bar);
  }
}

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

function openLightbox(image) {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lastFocusedGalleryImage = image;
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
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
  if (event.key === "Escape" && lightbox && lightbox.classList.contains("open")) {
    closeLightbox();
  }
});
