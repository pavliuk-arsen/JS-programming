const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

const track    = document.getElementById('track');
const dotsWrap = document.getElementById('dots');
const progress = document.getElementById('carouselProgress');
const slides   = track.querySelectorAll('.carousel-slide');
const total    = slides.length;

let current     = 0;
let autoTimer   = null;
let progTimer   = null;
const INTERVAL  = 4500; 
const PROG_STEP = 50;   

slides.forEach((_, i) => {
  const d = document.createElement('button');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.setAttribute('aria-label', `Слайд ${i + 1}`);
  d.addEventListener('click', () => goTo(i));
  dotsWrap.appendChild(d);
});

function updateDots() {
  dotsWrap.querySelectorAll('.dot').forEach((d, i) =>
    d.classList.toggle('active', i === current));
}

function goTo(idx) {
  current = (idx + total) % total;
  track.style.transform = `translateX(-${current * 100}%)`;
  updateDots();
  resetAuto();
}

let elapsed = 0;
function tickProgress() {
  elapsed += PROG_STEP;
  const pct = Math.min((elapsed / INTERVAL) * 100, 100);
  progress.style.width = pct + '%';
}

function resetAuto() {
  clearInterval(autoTimer);
  clearInterval(progTimer);
  elapsed = 0;
  progress.style.width = '0%';
  progTimer = setInterval(tickProgress, PROG_STEP);
  autoTimer = setInterval(() => goTo(current + 1), INTERVAL);
}

document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));

const carouselWrap = document.getElementById('carousel');
carouselWrap.addEventListener('mouseenter', () => {
  clearInterval(autoTimer);
  clearInterval(progTimer);
});
carouselWrap.addEventListener('mouseleave', resetAuto);

let touchX = 0;
carouselWrap.addEventListener('touchstart', e => {
  touchX = e.touches[0].clientX;
}, { passive: true });
carouselWrap.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1));
}, { passive: true });

resetAuto();