const revealNodes = document.querySelectorAll('.reveal');
const introOverlay = document.getElementById('introOverlay');
const envelopeWrap = document.getElementById('envelopeWrap');
const openInviteBtn = document.getElementById('openInviteBtn');
const mainInvitation = document.getElementById('mainInvitation');

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

if (openInviteBtn && introOverlay && envelopeWrap && mainInvitation) {
  openInviteBtn.addEventListener('click', () => {
    openInviteBtn.disabled = true;
    envelopeWrap.classList.add('is-opening');

    setTimeout(() => {
      mainInvitation.classList.remove('is-hidden');
      requestAnimationFrame(() => {
        mainInvitation.classList.add('is-visible');
      });
      introOverlay.classList.add('is-fading');
      document.body.classList.remove('intro-active');
    }, 1000);

    setTimeout(() => {
      introOverlay.style.display = 'none';
    }, 1800);
  });
} else if (mainInvitation) {
  mainInvitation.classList.remove('is-hidden');
  mainInvitation.classList.add('is-visible');
}

const countdownEl = document.getElementById('countdown');
const daysEl = countdownEl?.querySelector('[data-unit="days"]');
const hoursEl = countdownEl?.querySelector('[data-unit="hours"]');
const minutesEl = countdownEl?.querySelector('[data-unit="minutes"]');
const secondsEl = countdownEl?.querySelector('[data-unit="seconds"]');
const weddingDate = new Date('2026-04-18T18:00:00+05:00').getTime();

function formatUnit(value) {
  return String(value).padStart(2, '0');
}

function updateCountdown() {
  if (!countdownEl || !daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const now = Date.now();
  const diff = weddingDate - now;

  if (diff <= 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = formatUnit(days);
  hoursEl.textContent = formatUnit(hours);
  minutesEl.textContent = formatUnit(minutes);
  secondsEl.textContent = formatUnit(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);
