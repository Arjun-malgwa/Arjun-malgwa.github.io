# GitHub Pages Deployment Guide

## Your Portfolio is Ready! 🚀

All files have been created and committed. Here's how to deploy to GitHub Pages:

### Step 1: Create GitHub Repository
```bash
# Go to GitHub: https://github.com/new
# Repository name: arjun-malgwa.github.io
# Description: Portfolio website for Arjun Malgwa
# Public (required for GitHub Pages)
# DO NOT initialize with README, .gitignore, or license
```

### Step 2: Push Local Repository to GitHub
```bash
# From your local machine, in the port directory:
git remote add origin https://github.com/Arjun-malgwa/arjun-malgwa.github.io.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to: https://github.com/Arjun-malgwa/arjun-malgwa.github.io/settings
2. Scroll to "Pages" section
3. Source: Select "Deploy from a branch"
4. Branch: Select "main" / "/ (root)"
5. Click "Save"

### Step 4: Wait for Deployment
- GitHub will build and deploy your site
- In 1-2 minutes, your portfolio will be live at: **https://arjun-malgwa.github.io**
- You'll see a checkmark next to "Deployments" when ready

### Step 5: Custom Domain (Optional)
If you have a custom domain:
1. In Settings > Pages, enter your custom domain
2. Update DNS records:
   - Type: CNAME
   - Name: www
   - Value: arjun-malgwa.github.io
   - OR Type: A records (see GitHub docs for details)

## Portfolio Contents

✅ **14 HTML Pages**
- index.html - Home with animated hero
- about.html - Bio, skills, certifications
- projects/ - 7 project pages (1 gallery + 6 detail pages)
- experience.html - Professional timeline
- dashboards.html - Analytics showcases
- resume.html - Resume display + download
- contact.html - Contact form
- 404.html - Error page
- sitemap.xml - SEO sitemap

✅ **2 CSS Files** (970 lines)
- styles.css - Core styles, responsive design
- motion.css - Animations, gradients, blobs, typewriter

✅ **2 JavaScript Files** (345 lines)
- main.js - Navigation, theme toggle, forms
- motion.js - Typewriter effect, animations

✅ **Assets**
- headshot.webp - Profile photo placeholder
- noise.png - Subtle texture overlay
- assets/resume/ - Ready for resume PDF
- assets/img/projects/ - Ready for project images

## Key Features Implemented

🎨 **Motion Pack**
- Animated gradient background (28s hue shift)
- Drifting blobs with blur effects
- Rotating typewriter text (4 phrases)
- Noise texture overlay
- All animations respect prefers-reduced-motion

🎯 **Functionality**
- Dark/Light theme toggle (localStorage)
- Responsive mobile menu
- Project filtering (6 tags)
- Sticky header with active nav highlight
- Breadcrumb navigation
- Contact form with Formspree

📱 **Responsive Design**
- Mobile: ≤640px
- Tablet: 641px-1024px  
- Desktop: ≥1025px

♿ **Accessibility**
- WCAG AA contrast (4.5:1 minimum)
- Semantic HTML5
- Keyboard navigation
- Skip links
- Visible focus indicators
- Alt text on images

📊 **Performance**
- Inline critical CSS
- Deferred JavaScript
- Total JS: ~280 lines
- Optimized assets

🔍 **SEO**
- Per-page titles & descriptions
- Open Graph tags
- Twitter Card tags
- JSON-LD structured data
- Canonical URLs
- Sitemap.xml

## Project Details Included

All 6 projects with accurate information from your LinkedIn:

1. **Flood Risk Analytics** - 25%+ coverage gaps, K-means clustering
2. **Broadband Recommendation** - 95% accuracy, geospatial analysis
3. **Customer Churn Prediction** - #1 Kaggle rank (24 competitors)
4. **LSTM Next-Word Prediction** - SMS Spam Collection dataset
5. **Co-Op Program Evaluation** - Python + Tableau analysis
6. **Maritime Bid Estimation** - R, Python, Excel validation

## Next Steps

### 1. Update Profile Image
- Download your LinkedIn headshot
- Replace: `/assets/img/headshot.webp`
- Optimal size: 400x400px, WebP format

### 2. Add Resume PDF
- Rename your resume to: `resume.pdf`
- Save to: `/assets/resume/resume.pdf`
- Contact form uses: arjun.malgwa@gmail.com

### 3. Add Project Images (Optional)
- Save to: `/assets/img/projects/`
- Reference in project detail pages

### 4. Test Before Deploying
```bash
# Local testing:
python3 -m http.server 8000
# Visit: http://localhost:8000
```

## Verification Checklist

- [ ] Repository created at arjun-malgwa.github.io
- [ ] All files pushed to main branch
- [ ] GitHub Pages enabled in Settings
- [ ] Site live at https://arjun-malgwa.github.io
- [ ] Home page loads with animated hero
- [ ] Theme toggle works
- [ ] Project filtering works
- [ ] Contact form appears
- [ ] Mobile menu works on small screens

## Support & Customization

**Edit Typewriter Phrases:**
In `index.html`, line ~95:
```html
data-phrases='["Dashboards","ETL Automation","RAG/LLM Evaluation","Forecasting"]'
```

**Toggle Motion Effects:**
In `assets/js/motion.js`, line ~7:
```javascript
const MOTION_FLAGS = {
  gradient: true,
  noise: true,
  blobs: true,
  typewriter: true
};
```

**Change Colors:**
In `assets/css/styles.css`, line ~7:
```css
--color-accent: #0066cc;
--color-light-bg: #f9f9f9;
--color-light-text: #1a1a1a;
```

## Resources

- **GitHub Pages Docs:** https://pages.github.com/
- **WebP Format:** https://developers.google.com/speed/webp
- **Formspree:** https://formspree.io/ (contact form backend)
- **WCAG Accessibility:** https://www.w3.org/WAI/

---

**Portfolio Version:** 1.0
**Built with:** Vanilla HTML/CSS/JavaScript
**Last Updated:** October 30, 2024
**Ready for Deployment:** ✅ Yes
