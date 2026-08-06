const fs = require('fs');
const cssFile = 'C:/Users/C-131/.gemini/antigravity/scratch/hastmilap-cms/frontend/src/index.css';

const rule = `
.legacy-image {
  margin-top: 4rem;
}
`;

fs.appendFileSync(cssFile, '\\n' + rule);
console.log('Appended Legacy Image margin CSS');
