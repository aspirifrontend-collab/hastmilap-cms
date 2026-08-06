const fs = require('fs');

const cssFile = 'C:/Users/C-131/.gemini/antigravity/scratch/hastmilap-cms/frontend/src/index.css';

const responsiveRules = `
/* ─── OUR STORY PAGE ────────────────────────────── */

.our-story-page {
  padding: 8vh 5%;
  background-color: #ffffff;
  min-height: 100vh;
}

.our-story-hero {
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
}

.os-subtitle {
  font-size: clamp(14px, 1.5vw, 18px);
  color: #666;
  text-transform: capitalize;
  margin-bottom: 0.5rem;
  font-weight: 400;
}

.os-title {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(28px, 4vw, 42px);
  color: #333;
  margin-bottom: 3rem;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.os-image-wrapper {
  width: 100%;
}

.os-image-wrapper img {
  width: 100%;
  height: auto;
  object-fit: cover;
  background-color: #888; /* Placeholder color matching mockup */
  display: block;
}

/* On Desktop, we expect a wide aspect ratio like 16:9 or 21:9 */
@media (min-width: 769px) {
  .os-image-wrapper img {
    aspect-ratio: 21/9;
  }
}

/* On Mobile, the picture tag swaps the src automatically, 
   but we can enforce a portrait or square aspect ratio */
@media (max-width: 768px) {
  .os-image-wrapper img {
    aspect-ratio: 4/5;
  }
}
`;

fs.appendFileSync(cssFile, '\\n' + responsiveRules);
console.log('Appended Our Story CSS');
