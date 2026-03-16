const revealNodes = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  { threshold: 0.18 }
);

revealNodes.forEach((node) => observer.observe(node));

const countdownEl = document.getElementById('countdown');
const weddingDate = new Date('2026-02-21T19:30:00+05:30').getTime();

function updateCountdown() {
  const now = Date.now();
  const diff = weddingDate - now;

  if (diff <= 0) {
    countdownEl.textContent = "Bugun to'y kuni. Xush kelibsiz!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  countdownEl.textContent = `Boshlanishiga: ${days} kun ${hours} soat ${minutes} daqiqa`;
}

updateCountdown();
setInterval(updateCountdown, 60000);
