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
