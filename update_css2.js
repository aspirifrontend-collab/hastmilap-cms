const fs = require('fs');

const cssFile = 'C:/Users/C-131/.gemini/antigravity/scratch/hastmilap-cms/frontend/src/index.css';

let css = fs.readFileSync(cssFile, 'utf8');

// I will just append the responsive rules at the very end
const responsiveRules = `
/* ─── NEWS SECTION RESPONSIVE LOGIC ────────────────────────────── */

.mobile-title {
  display: none;
}
.desktop-title {
  display: block;
}

@media (max-width: 900px) {
  .desktop-title {
    display: none !important;
  }
  .mobile-title {
    display: block !important;
  }
  .mobile-hidden {
    display: none !important;
  }
  
  /* Make the first image full width 16:9 on mobile */
  .news-grid {
    grid-template-columns: 1fr;
  }
  .news-item.mobile-visible img {
    aspect-ratio: 16/9 !important;
    max-width: 1200px;
    margin: 0 auto;
    background-color: #333; /* Darker placeholder matching sustainability mockup */
  }
}
`;

fs.appendFileSync(cssFile, '\\n' + responsiveRules);
console.log('Appended responsive CSS');
