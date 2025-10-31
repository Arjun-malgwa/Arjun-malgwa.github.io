const MOTION_FLAGS = { gradient: true, noise: true, blobs: true, typewriter: true };
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

(function() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const phrases = JSON.parse(el.dataset.phrases || '[]');
  if (!phrases.length) return;
  if (prefersReduced) { el.textContent = phrases[0]; return; }
  const speed = { type: 55, erase: 35, pause: 1200 };
  let i = 0, j = 0, deleting = false;
  function tick() {
    const word = phrases[i];
    if (!deleting) {
      el.textContent = word.slice(0, ++j);
      if (j === word.length) { deleting = true; setTimeout(tick, speed.pause); return; }
    } else {
      el.textContent = word.slice(0, --j);
      if (j === 0) { deleting = false; i = (i+1) % phrases.length; }
    }
    setTimeout(tick, deleting ? speed.erase : speed.type);
  }
  tick();
})();
