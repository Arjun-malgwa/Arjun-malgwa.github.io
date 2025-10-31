/* ========================================
   MAIN.JS - Header, Nav, Theme, Forms
   ======================================== */

/* ========================================
   THEME TOGGLE - Light/Dark Mode
   ======================================== */
class ThemeManager {
  constructor() {
    this.themeKey = 'theme';
    this.toggleButton = document.querySelector('.theme-toggle');
    this.init();
  }

  init() {
    // Load saved theme or default to light
    const saved = localStorage.getItem(this.themeKey) || 'light';
    this.setTheme(saved);

    // Attach toggle button listener
    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', () => this.toggle());
    }

    // Respond to OS preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.themeKey)) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      this.updateToggleIcon('☀️');
    } else {
      document.documentElement.removeAttribute('data-theme');
      this.updateToggleIcon('🌙');
    }
    localStorage.setItem(this.themeKey, theme);
  }

  toggle() {
    const current = localStorage.getItem(this.themeKey) || 'light';
    this.setTheme(current === 'dark' ? 'light' : 'dark');
  }

  updateToggleIcon(icon) {
    if (this.toggleButton) {
      this.toggleButton.textContent = icon;
    }
  }
}

/* ========================================
   NAVIGATION - Active Link & Mobile Menu
   ======================================== */
class Navigator {
  constructor() {
    this.navLinks = document.querySelectorAll('nav a');
    this.menuToggle = document.querySelector('.menu-toggle');
    this.nav = document.querySelector('nav');
    this.init();
  }

  init() {
    // Set active link based on current page
    this.setActiveLink();

    // Mobile menu toggle
    if (this.menuToggle) {
      this.menuToggle.addEventListener('click', () => this.toggleMenu());
      // Close menu when link is clicked
      this.navLinks.forEach(link => {
        link.addEventListener('click', () => this.closeMenu());
      });
    }

    // Update active link on navigation
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        this.setActiveLink(e.target);
      });
    });
  }

  setActiveLink(element = null) {
    const currentPath = window.location.pathname;

    this.navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');

      // Match current page
      if (currentPath.endsWith(href) || currentPath.endsWith(href + '/') ||
          (href === '/' && currentPath === '/')) {
        link.classList.add('active');
      }
    });
  }

  toggleMenu() {
    if (!this.nav) return;

    if (this.nav.classList.contains('mobile-nav')) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    if (this.nav) {
      this.nav.classList.add('mobile-nav');
      this.menuToggle.setAttribute('aria-expanded', 'true');
    }
  }

  closeMenu() {
    if (this.nav) {
      this.nav.classList.remove('mobile-nav');
      this.menuToggle.setAttribute('aria-expanded', 'false');
    }
  }
}

/* ========================================
   FORMS - Contact & Validation
   ======================================== */
class FormHandler {
  constructor() {
    this.forms = document.querySelectorAll('form');
    this.init();
  }

  init() {
    this.forms.forEach(form => {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        this.showMessage(form, 'Message sent successfully!', 'success');
        form.reset();
      } else {
        this.showMessage(form, 'Error sending message. Please try again.', 'error');
      }
    } catch (error) {
      this.showMessage(form, 'Error sending message. Please try again.', 'error');
    }
  }

  showMessage(form, message, type) {
    // Remove existing message if any
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create and show message
    const msgEl = document.createElement('div');
    msgEl.className = `form-message form-message-${type}`;
    msgEl.textContent = message;
    msgEl.style.cssText = `
      padding: var(--spacing-md);
      border-radius: var(--radius-md);
      margin-bottom: var(--spacing-md);
      background-color: ${type === 'success' ? 'rgba(0, 200, 100, 0.1)' : 'rgba(200, 0, 0, 0.1)'};
      color: ${type === 'success' ? '#00c864' : '#c80000'};
      border: 1px solid ${type === 'success' ? '#00c864' : '#c80000'};
    `;
    form.insertBefore(msgEl, form.firstChild);
  }
}

/* ========================================
   PROJECT FILTERING
   ======================================== */
class ProjectFilter {
  constructor() {
    this.filterChips = document.querySelectorAll('.chip');
    this.projectCards = document.querySelectorAll('.project-card');
    this.init();
  }

  init() {
    this.filterChips.forEach(chip => {
      chip.addEventListener('click', () => this.handleFilter(chip));
      chip.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleFilter(chip);
        }
      });
    });
  }

  handleFilter(chip) {
    const filterValue = chip.dataset.filter;

    // Toggle active state
    if (filterValue === 'all') {
      this.filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      this.showAllProjects();
    } else {
      document.querySelector('[data-filter="all"]').classList.remove('active');
      chip.classList.toggle('active');
      this.filterProjects();
    }
  }

  filterProjects() {
    const activeChips = Array.from(this.filterChips)
      .filter(chip => chip.classList.contains('active') && chip.dataset.filter !== 'all')
      .map(chip => chip.dataset.filter);

    this.projectCards.forEach(card => {
      const tags = card.dataset.tags.split(',').map(t => t.trim());
      const matches = activeChips.some(chip => tags.includes(chip));

      if (activeChips.length === 0) {
        card.style.display = '';
      } else {
        card.style.display = matches ? '' : 'none';
      }
    });
  }

  showAllProjects() {
    this.projectCards.forEach(card => {
      card.style.display = '';
    });
  }
}

/* ========================================
   INITIALIZATION
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
  new ThemeManager();
  new Navigator();
  new FormHandler();

  // Initialize project filter only if filter chips exist
  if (document.querySelectorAll('.chip').length > 0) {
    new ProjectFilter();
  }

  // Set aria-expanded on menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});
