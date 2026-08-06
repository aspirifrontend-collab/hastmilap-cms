const fs = require('fs');

const cssFile = 'C:/Users/C-131/.gemini/antigravity/scratch/hastmilap-cms/frontend/src/index.css';

const newCss = `
/* ─── NEW SECTIONS: NEWS & SUSTAINABILITY ────────────────────────────── */

.news-section, .sustainability-section {
  padding: 8vh 5%;
  background-color: #f9f9f9; /* Light off-white background based on images */
  text-align: center;
}

.sustainability-section {
  padding-top: 2vh; /* Slight gap from news */
}

.section-title {
  font-family: 'Montserrat', sans-serif; /* Fallback to theme's serif-like headers */
  font-size: clamp(28px, 4vw, 42px);
  color: #4a4a4a;
  margin-bottom: 3rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto 3rem auto;
}

.news-item img, .sustainability-item img {
  width: 100%;
  height: auto;
  aspect-ratio: 4/3;
  object-fit: cover;
  background-color: #999; /* Grey placeholder color for empty images */
  display: block;
  transition: transform 0.3s ease;
}

.sustainability-item img {
  aspect-ratio: 16/9; /* Wider image for sustainability */
  max-width: 1200px;
  margin: 0 auto;
  background-color: #333; /* Darker placeholder */
}

.news-item a, .sustainability-item a {
  display: block;
  overflow: hidden;
}

.news-item:hover img, .sustainability-item:hover img {
  transform: scale(1.02);
}

.section-description {
  max-width: 900px;
  margin: 0 auto;
  font-size: clamp(14px, 1.5vw, 16px);
  line-height: 1.6;
  color: #666;
  margin-top: 2rem;
}

/* Mobile Responsive */
@media (max-width: 900px) {
  .news-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .news-item img {
    aspect-ratio: 16/9;
  }
}
`;

fs.appendFileSync(cssFile, '\\n' + newCss);
console.log('Appended new sections CSS');
