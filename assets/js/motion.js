/* ========================================
   MOTION PACK - Gradient, Blobs, Typewriter
   Feature Flags & Initialization
   ======================================== */

// FEATURE FLAGS
const MOTION_FLAGS = {
  gradient: true,      // Animated hue-shifting background
  noise: true,         // Overlay texture
  blobs: true,         // Drifting elements
  typewriter: true     // Text rotation + cursor
};

// GLOBAL CHECK FOR REDUCED MOTION PREFERENCE
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ========================================
   TYPEWRITER EFFECT IMPLEMENTATION
   ======================================== */
(function initTypewriter() {
  if (!MOTION_FLAGS.typewriter) return;

  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = JSON.parse(el.dataset.phrases || '[]');
  if (!phrases.length) return;

  // If user prefers reduced motion, show only first phrase
  if (prefersReduced) {
    el.textContent = phrases[0];
    return;
  }

  const speed = { type: 55, erase: 35, pause: 1200 };
  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;

  function typeChar() {
    const currentPhrase = phrases[currentPhraseIndex];

    if (!isDeleting) {
      // Typing mode
      el.textContent = currentPhrase.slice(0, ++currentCharIndex);

      if (currentCharIndex === currentPhrase.length) {
        // Finished typing, pause then start deleting
        isDeleting = true;
        setTimeout(typeChar, speed.pause);
        return;
      }
    } else {
      // Erasing mode
      el.textContent = currentPhrase.slice(0, --currentCharIndex);

      if (currentCharIndex === 0) {
        // Finished erasing, move to next phrase
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(typeChar, isDeleting ? speed.erase : speed.type);
  }

  typeChar();
})();

/* ========================================
   INITIALIZE MOTION ON PAGE LOAD
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
  // Motion pack is initialized via CSS animations
  // This function reserved for future enhancements
});
