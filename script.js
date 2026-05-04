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
