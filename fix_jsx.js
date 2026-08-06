const fs = require('fs');

const srcFile = 'C:/Users/C-131/.gemini/antigravity/scratch/hastmilap-cms/frontend/src/components/Home.jsx';
let jsx = fs.readFileSync(srcFile, 'utf-8');

jsx = jsx.replace(/<br(.*?)>/g, (m, p1) => {
  if (p1.endsWith('/')) return m;
  return `<br${p1} />`;
});

// Fix unescaped braces in JS within HTML text
jsx = jsx.replace(/catch\(\(\) => \{ \}\);/g, "catch(() => { /* nothing */ });");
jsx = jsx.replace(/\{ left:/g, "{ 'left':"); // quick hack for scrolling inline stuff if any

fs.writeFileSync(srcFile, jsx);
