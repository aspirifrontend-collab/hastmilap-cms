const fs = require('fs');

const cssFile = 'C:/Users/C-131/.gemini/antigravity/scratch/hastmilap-cms/frontend/src/index.css';

const responsiveRules = `
/* ─── OUR LEGACY SECTION ────────────────────────────── */

.our-legacy {
  padding: 10vh 5%;
  background-color: #ffffff;
  text-align: center;
}

.legacy-container {
  max-width: 900px;
  margin: 0 auto;
}

.legacy-title {
  margin-bottom: 2rem;
  line-height: 1.3;
}

.legacy-desc {
  font-size: clamp(15px, 1.2vw, 18px);
  color: #777;
  line-height: 1.8;
  font-weight: 300;
}

/* Ensure mobile layout adds some side padding so text doesn't touch edges */
@media (max-width: 768px) {
  .our-legacy {
    padding: 8vh 6%;
  }
}
`;

fs.appendFileSync(cssFile, '\\n' + responsiveRules);
console.log('Appended Our Legacy CSS');
