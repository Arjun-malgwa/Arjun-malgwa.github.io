# Arjun Malgwa - Portfolio Website

A fast, accessible, multi-page portfolio website built with vanilla HTML/CSS/JavaScript. Deployed to GitHub Pages.

**Live Demo:** https://arjun-malgwa.github.io

## 🎯 Features

### Pages
- **Home (index.html)**: Animated hero section with motion effects
- **About**: Bio, skills matrix, and certifications
- **Projects**: 6 featured projects with client-side filtering
- **Project Details**: Deep dives into each project with metrics
- **Experience**: Professional timeline with metrics
- **Dashboards**: GitHub analytics, Tableau, Power BI showcase
- **Resume**: HTML + PDF display with download link
- **Contact**: Formspree contact form + social links
- **404**: Custom error page

### Motion Pack
- ✨ **Animated Gradient Background**: Hue-shifting gradient with 28s animation
- 🌫️ **Noise Texture Overlay**: Subtle noise layer (opacity 0.06)
- 🎨 **Drifting Blobs**: 2 animated blobs with different durations (36s, 44s)
- ⌨️ **Rotating Typewriter**: 4-phrase rotation with CSS cursor blink
- ♿ **Accessibility**: All motion respects `prefers-reduced-motion` media query

### Responsive Design
- Mobile-first approach
- Breakpoints: 640px (mobile), 1024px (desktop)
- Hamburger menu on mobile
- Responsive images with WebP format

### Accessibility (WCAG AA)
- Semantic HTML5 structure
- Keyboard navigation support
- Skip link for keyboard users
- Visible focus indicators
- Proper color contrast (4.5:1 minimum)
- Alt text on all images
- Accessible forms with proper labels

### Performance Optimization
- Inline critical CSS per page
- Deferred JavaScript loading
- Responsive images with srcset
- Lazy-loaded media
- Total JS ≤ 120KB uncompressed
- Lighthouse targets: Performance ≥90, Accessibility ≥95, SEO ≥95

### SEO
- Per-page unique titles and descriptions
- Open Graph meta tags
- Twitter Card tags
- JSON-LD structured data
- Canonical URLs
- Sitemap.xml

## 🛠️ Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **JavaScript**: Vanilla (no frameworks)
- **Hosting**: GitHub Pages
- **Form Service**: Formspree

## 📁 File Structure

```
/
├── index.html                          # Home page
├── about.html                          # About page
├── projects/
│   ├── index.html                      # Projects gallery
│   ├── flood-risk-analytics-montpelier.html
│   ├── broadband-plan-recommendation-engine.html
│   ├── customer-churn-prediction.html
│   ├── next-word-prediction-lstm.html
│   ├── coop-program-evaluation.html
│   └── compass-maritime-bid-estimation.html
├── experience.html                     # Experience timeline
├── dashboards.html                     # Dashboards showcase
├── resume.html                         # Resume display
├── contact.html                        # Contact form
├── 404.html                            # Error page
├── sitemap.xml                         # SEO sitemap
├── README.md                           # This file
├── assets/
│   ├── css/
│   │   ├── styles.css                  # Main styles
│   │   └── motion.css                  # Animation styles
│   ├── js/
│   │   ├── main.js                     # Header, nav, theme, forms
│   │   └── motion.js                   # Typewriter, animations
│   └── img/
│       ├── headshot.webp               # Profile photo
│       ├── noise.png                   # Noise texture
│       └── projects/                   # Project images
└── assets/resume/
    └── resume.pdf                      # Resume PDF
```

## 🚀 Deployment to GitHub Pages

### Step 1: Create Repository
```bash
# Create new repository named: arjun-malgwa.github.io
# Push all files to main branch
git add .
git commit -m "Initial portfolio commit"
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to repository Settings
2. Navigate to Pages section
3. Select "Deploy from a branch"
4. Choose "main" branch
5. Save

### Step 3: Custom Domain (Optional)
1. In Settings > Pages, add your custom domain
2. Update DNS records if using custom domain
3. GitHub will handle HTTPS automatically

Your portfolio will be live at: `https://arjun-malgwa.github.io`

## 🎨 Customization

### Edit Typewriter Phrases
In `index.html`, update the `data-phrases` attribute:
```html
<p class="hero-rotate" id="typewriter"
   data-phrases='["Dashboards","ETL Automation","RAG/LLM Evaluation","Forecasting"]'></p>
```

### Toggle Motion Effects
In `assets/js/motion.js`, modify `MOTION_FLAGS`:
```javascript
const MOTION_FLAGS = {
  gradient: true,      // Toggle gradient animation
  noise: true,         // Toggle noise overlay
  blobs: true,         // Toggle blob motion
  typewriter: true     // Toggle typewriter effect
};
```

### Update Colors
In `assets/css/styles.css`, modify CSS custom properties:
```css
:root {
  --color-accent: #0066cc;           /* Primary accent color */
  --color-light-bg: #f9f9f9;         /* Light mode background */
  --color-light-text: #1a1a1a;       /* Light mode text */
}
```

### Change Font
In all HTML files, update the Google Font link:
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
```

## 📊 Lighthouse Scores

Target metrics:
- **Performance**: ≥90
- **Accessibility**: ≥95
- **SEO**: ≥95
- **Best Practices**: ≥90

Run audit: Chrome DevTools → Lighthouse

## 🎯 Projects Included

1. **Flood Risk Analytics** - Geospatial ML for insurance, 25%+ coverage improvement
2. **Broadband Recommendation Engine** - 95% accuracy prediction system
3. **Customer Churn Prediction** - #1 Kaggle ranking (24 competitors)
4. **LSTM Next-Word Prediction** - 94% accuracy deep learning NLP
5. **Co-Op Program Evaluation** - Institutional research with Tableau dashboards
6. **Maritime Bid Estimation** - Statistical regression analysis (R-squared 0.87)

Each project includes:
- Challenge/objective
- Methodology
- Results with metrics
- Tech stack
- Key learnings

## 📝 Content Updates

### Add New Project
1. Create new file: `projects/project-slug.html`
2. Copy template from existing project
3. Update content and metrics
4. Add card to `projects/index.html`
5. Update navigation links

### Update Resume
1. Place PDF in `assets/resume/resume.pdf`
2. Update HTML version in `resume.html`
3. Commit and push changes

### Update Experience
Edit `experience.html` timeline section

## 🔧 Development Tips

### Local Testing
```bash
python -m http.server 8000  # Python 3
# Open http://localhost:8000 in browser
```

### Code Organization
- `styles.css`: ~800 lines (base styles, layout, components)
- `motion.css`: ~150 lines (animations)
- `main.js`: ~200 lines (functionality)
- `motion.js`: ~80 lines (typewriter effect)
- **Total JS**: ~280 lines

### Performance Checklist
- [ ] Images optimized (WebP with fallback)
- [ ] CSS minified (optional)
- [ ] JS deferred in HTML
- [ ] No unused code
- [ ] Lighthouse scores ≥90
- [ ] All animations respect prefers-reduced-motion

## 🔐 Security

- No external APIs beyond Formspree
- No sensitive data in codebase
- HTTPS enforced by GitHub Pages
- Contact forms via Formspree

## 📚 Resources

- **HTML5 Spec**: https://html.spec.whatwg.org/
- **CSS Reference**: https://developer.mozilla.org/en-US/docs/Web/CSS
- **Web Accessibility (WCAG)**: https://www.w3.org/WAI/
- **GitHub Pages Docs**: https://pages.github.com/
- **Formspree**: https://formspree.io/

## 📧 Contact & Links

- **Email**: arjun.malgwa@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/arjunmalgwa
- **GitHub**: https://github.com/Arjun-malgwa
- **Location**: Philadelphia, PA

---

**Last Updated:** October 30, 2024
**Version:** 1.0 - Initial Release
**Built with:** Vanilla HTML/CSS/JavaScript | Hosted on GitHub Pages
