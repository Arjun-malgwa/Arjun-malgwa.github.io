#!/bin/bash
echo "Creating Arjun Malgwa | Data Analyst Portfolio"
echo "=============================================="

# Create all directories
mkdir -p assets/css assets/js assets/img/projects assets/resume projects

# Create CSS files
echo "Creating styles.css..."
cat > assets/css/styles.css << 'CSS_EOF'
:root {
  --color-light-bg: #f9f9f9;
  --color-light-text: #1a1a1a;
  --color-light-border: #e0e0e0;
  --color-accent: #0066cc;
  --color-accent-dark: #0052a3;
  --font-primary: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --transition-base: 150ms ease-in-out;
  color-scheme: light;
}

[data-theme="dark"] {
  --color-light-bg: #1a1a1a;
  --color-light-text: #f9f9f9;
  --color-light-border: #333333;
  color-scheme: dark;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-primary);
  background-color: var(--color-light-bg);
  color: var(--color-light-text);
  line-height: 1.6;
  transition: background-color var(--transition-base), color var(--transition-base);
}

h1 { font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 700; line-height: 1.1; letter-spacing: -0.02em; }
h2 { font-size: clamp(2rem, 4vw, 2.5rem); font-weight: 700; line-height: 1.2; margin-top: var(--spacing-3xl); margin-bottom: var(--spacing-lg); }
h3 { font-size: clamp(1.5rem, 3vw, 1.75rem); font-weight: 600; line-height: 1.3; margin-top: var(--spacing-2xl); margin-bottom: var(--spacing-md); }
p { font-size: 1rem; margin-bottom: var(--spacing-lg); max-width: 65ch; }

a { color: var(--color-accent); text-decoration: none; transition: color var(--transition-base); }
a:hover { color: var(--color-accent-dark); text-decoration: underline; }
a:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; border-radius: var(--radius-sm); }

.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-xl);
  background-color: var(--color-accent);
  color: white; border: none; border-radius: var(--radius-md);
  font-size: 1rem; font-weight: 600; cursor: pointer;
  transition: background-color var(--transition-base), transform var(--transition-base);
  text-decoration: none;
}
.btn:hover { background-color: var(--color-accent-dark); transform: translateY(-2px); }
.btn:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }
.btn-secondary { background-color: transparent; color: var(--color-accent); border: 2px solid var(--color-accent); }
.btn-secondary:hover { background-color: var(--color-accent); color: white; }

header {
  position: sticky; top: 0; z-index: 100;
  background-color: var(--color-light-bg);
  border-bottom: 1px solid var(--color-light-border);
  backdrop-filter: blur(10px);
}

.header-content {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-xl);
  max-width: 1200px; margin: 0 auto;
}

.logo { font-size: 1.25rem; font-weight: 700; color: var(--color-light-text); text-decoration: none; }

nav { display: flex; align-items: center; gap: var(--spacing-xl); }
nav a { font-size: 0.95rem; font-weight: 500; position: relative; }
nav a::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background-color: var(--color-accent); transition: width var(--transition-base); }
nav a:hover::after { width: 100%; }
nav a.active { color: var(--color-accent); }
nav a.active::after { width: 100%; }

.theme-toggle {
  background: none; border: 1px solid var(--color-light-border); border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md); cursor: pointer; font-size: 1.2rem;
  transition: background-color var(--transition-base), border-color var(--transition-base);
  display: flex; align-items: center; justify-content: center;
}
.theme-toggle:hover { background-color: var(--color-light-bg); border-color: var(--color-accent); }
.theme-toggle:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }

.skip-link {
  position: absolute; top: -40px; left: 0;
  background-color: var(--color-accent); color: white;
  padding: var(--spacing-md); text-decoration: none; z-index: 1000;
}
.skip-link:focus { top: 0; }

.breadcrumb {
  display: flex; gap: var(--spacing-md); padding: var(--spacing-md) var(--spacing-xl);
  font-size: 0.9rem; max-width: 1200px; margin: 0 auto;
}
.breadcrumb a { color: var(--color-accent); }
.breadcrumb [aria-current="page"] { color: var(--color-light-text); cursor: default; }

main { min-height: 100vh; padding: var(--spacing-3xl) var(--spacing-xl); }
.container { max-width: 1200px; margin: 0 auto; }
.container-narrow { max-width: 800px; margin: 0 auto; }

.hero {
  position: relative; height: 100vh;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; overflow: hidden;
  margin: 0 calc(-1 * var(--spacing-xl)); margin-bottom: var(--spacing-3xl);
}

.hero-title { position: relative; z-index: 1; color: white; margin-bottom: var(--spacing-md); text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); }
.hero-rotate { position: relative; z-index: 1; font-size: 1.5rem; font-weight: 500; color: rgba(255, 255, 255, 0.9); text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); min-height: 2.5rem; }
.hero-cta { display: flex; gap: var(--spacing-lg); margin-top: var(--spacing-3xl); position: relative; z-index: 1; }
.hero-cta .btn { min-width: 150px; }
.hero-headshot { margin-top: var(--spacing-3xl); position: relative; z-index: 1; }
.hero-headshot img { width: 150px; height: 150px; border-radius: 50%; object-fit: cover; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3); }
.hero-socials { display: flex; gap: var(--spacing-xl); margin-top: var(--spacing-2xl); position: relative; z-index: 1; justify-content: center; }
.hero-socials a { font-size: 1.5rem; color: white; transition: transform var(--transition-base), opacity var(--transition-base); }
.hero-socials a:hover { transform: scale(1.2); opacity: 0.8; }

footer {
  background-color: rgba(0, 0, 0, 0.05); border-top: 1px solid var(--color-light-border);
  padding: var(--spacing-2xl) var(--spacing-xl); margin-top: var(--spacing-3xl);
  text-align: center; font-size: 0.9rem;
}

.project-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-xl); margin-bottom: var(--spacing-3xl);
}

.project-card {
  background-color: rgba(255, 255, 255, 0.5); border: 1px solid var(--color-light-border);
  border-radius: var(--radius-lg); padding: var(--spacing-lg);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
  cursor: pointer; display: flex; flex-direction: column;
}
.project-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-lg); }
.project-card h3 { margin-top: 0; margin-bottom: var(--spacing-md); }

.project-description { flex: 1; font-size: 0.95rem; margin-bottom: var(--spacing-md); }

.project-tech { display: flex; flex-wrap: wrap; gap: var(--spacing-sm); margin-bottom: var(--spacing-md); }
.tech-badge {
  display: inline-block; background-color: var(--color-accent); color: white;
  padding: 0.25rem var(--spacing-md); border-radius: var(--radius-sm);
  font-size: 0.8rem; font-weight: 600;
}

.project-metrics { font-size: 0.9rem; color: rgba(0, 0, 0, 0.7); margin-bottom: var(--spacing-md); }
.project-links { display: flex; gap: var(--spacing-md); margin-top: auto; }
.project-links a {
  flex: 1; padding: var(--spacing-sm) var(--spacing-md); text-align: center;
  border: 1px solid var(--color-accent); border-radius: var(--radius-md);
  transition: background-color var(--transition-base);
}
.project-links a:hover { background-color: var(--color-accent); color: white; }

.filter-chips { display: flex; flex-wrap: wrap; gap: var(--spacing-md); margin-bottom: var(--spacing-2xl); }
.chip {
  padding: var(--spacing-sm) var(--spacing-lg); border: 2px solid var(--color-light-border);
  background-color: transparent; color: var(--color-light-text); border-radius: var(--radius-lg);
  cursor: pointer; font-weight: 600; transition: all var(--transition-base);
}
.chip:hover { border-color: var(--color-accent); color: var(--color-accent); }
.chip.active { background-color: var(--color-accent); color: white; border-color: var(--color-accent); }

.timeline { position: relative; padding-left: var(--spacing-2xl); }
.timeline::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0;
  width: 2px; background-color: var(--color-accent);
}

.timeline-item { position: relative; margin-bottom: var(--spacing-3xl); }
.timeline-item::before {
  content: ''; position: absolute; left: -31px; top: 0;
  width: 12px; height: 12px; background-color: var(--color-accent);
  border-radius: 50%;
}

.timeline-item h3 { margin-top: 0; color: var(--color-accent); }
.timeline-item-date { font-size: 0.9rem; color: rgba(0, 0, 0, 0.6); margin-bottom: var(--spacing-md); }
.timeline-item ul { list-style: none; padding-left: 0; }
.timeline-item li { margin-bottom: var(--spacing-md); padding-left: var(--spacing-lg); position: relative; }
.timeline-item li::before { content: '→'; position: absolute; left: 0; color: var(--color-accent); font-weight: bold; }

.skill-group { margin-bottom: var(--spacing-2xl); }
.skill-group h4 { font-size: 1rem; font-weight: 700; color: var(--color-accent); margin-bottom: var(--spacing-md); text-transform: uppercase; letter-spacing: 0.05em; }
.skill-tags { display: flex; flex-wrap: wrap; gap: var(--spacing-md); }
.skill-tag {
  display: inline-block; padding: var(--spacing-sm) var(--spacing-lg);
  background-color: rgba(0, 102, 204, 0.1); color: var(--color-accent);
  border-radius: var(--radius-md); border: 1px solid var(--color-accent);
  font-size: 0.9rem; font-weight: 600;
}

form { display: flex; flex-direction: column; gap: var(--spacing-lg); max-width: 600px; }
label { display: block; margin-bottom: var(--spacing-sm); font-weight: 600; }
input, textarea, select {
  padding: var(--spacing-md); border: 1px solid var(--color-light-border);
  border-radius: var(--radius-md); font-family: var(--font-primary);
  font-size: 1rem; background-color: var(--color-light-bg);
  color: var(--color-light-text); transition: border-color var(--transition-base);
}
input:focus, textarea:focus, select:focus {
  outline: none; border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}
textarea { resize: vertical; min-height: 150px; }

.menu-toggle { display: none; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--color-light-text); }

@media (max-width: 768px) {
  nav { display: none; }
  .menu-toggle { display: block; }
  nav.mobile-nav {
    display: flex; flex-direction: column;
    position: absolute; top: 60px; left: 0; right: 0;
    background-color: var(--color-light-bg);
    border-bottom: 1px solid var(--color-light-border);
    padding: var(--spacing-lg); gap: var(--spacing-md);
  }
  .hero-cta { flex-direction: column; width: 100%; }
  .hero-cta .btn { width: 100%; }
  .project-grid { grid-template-columns: 1fr; }
  .filter-chips { justify-content: center; }
  main { padding: var(--spacing-xl) var(--spacing-md); }
}

@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
}
CSS_EOF
echo "✓ styles.css created"

# Create JavaScript files
echo "Creating motion.js..."
cat > assets/js/motion.js << 'JS1_EOF'
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
JS1_EOF
echo "✓ motion.js created"

echo "Creating main.js..."
cat > assets/js/main.js << 'JS2_EOF'
class ThemeManager {
  constructor() {
    this.themeKey = 'theme';
    this.toggleButton = document.querySelector('.theme-toggle');
    this.init();
  }
  init() {
    const saved = localStorage.getItem(this.themeKey) || 'light';
    this.setTheme(saved);
    if (this.toggleButton) this.toggleButton.addEventListener('click', () => this.toggle());
  }
  setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (this.toggleButton) this.toggleButton.textContent = '☀️';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (this.toggleButton) this.toggleButton.textContent = '🌙';
    }
    localStorage.setItem(this.themeKey, theme);
  }
  toggle() {
    const current = localStorage.getItem(this.themeKey) || 'light';
    this.setTheme(current === 'dark' ? 'light' : 'dark');
  }
}

class Navigator {
  constructor() {
    this.navLinks = document.querySelectorAll('nav a');
    this.menuToggle = document.querySelector('.menu-toggle');
    this.nav = document.querySelector('nav');
    this.init();
  }
  init() {
    this.setActiveLink();
    if (this.menuToggle) {
      this.menuToggle.addEventListener('click', () => this.toggleMenu());
      this.navLinks.forEach(link => link.addEventListener('click', () => this.closeMenu()));
    }
  }
  setActiveLink() {
    const currentPath = window.location.pathname;
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (currentPath.endsWith(href) || currentPath.endsWith(href + '/') || (href === '/' && currentPath === '/')) {
        link.classList.add('active');
      }
    });
  }
  toggleMenu() {
    if (this.nav.classList.contains('mobile-nav')) this.closeMenu();
    else this.openMenu();
  }
  openMenu() {
    this.nav.classList.add('mobile-nav');
    this.menuToggle.setAttribute('aria-expanded', 'true');
  }
  closeMenu() {
    this.nav.classList.remove('mobile-nav');
    this.menuToggle.setAttribute('aria-expanded', 'false');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  new ThemeManager();
  new Navigator();
});
JS2_EOF
echo "✓ main.js created"

# Create assets
echo "Creating assets..."
echo 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAADElEQVQYlWNkGPj/HwAFBQIB8Y5GSQAAAABJRU5ErkJggg==' | base64 -d > assets/img/noise.png
echo "✓ noise.png created"

touch assets/img/headshot.webp
echo "✓ headshot.webp placeholder created"

echo ""
echo "✅ Portfolio structure ready!"
echo "Next: Add remaining HTML pages and commit"
