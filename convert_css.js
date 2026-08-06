const fs = require('fs');

const cssFile = 'C:/Users/C-131/.gemini/antigravity/scratch/hastmilap-cms/frontend/src/index.css';
let css = fs.readFileSync(cssFile, 'utf-8');

// The user asked to make every height and width take in vh/auto for responsive screens.
// We can use a regex to replace fixed px values for height and width properties.

css = css.replace(/(width|height):\s*(\d+)px/g, (match, prop, val) => {
  if (val === '0') return match;
  // Convert based on 1080p height for vh or just use vh
  // 1080px height -> 1px = (100 / 1080) vh ≈ 0.0925vh
  // For better auto responsiveness, we can set it to auto and use min-height in vh
  // Or literally replace with vh based on 1080 height
  const vhVal = (parseInt(val) / 1080 * 100).toFixed(2);
  return `${prop}: ${vhVal}vh`;
});

// Also handle min-height, max-height, min-width, max-width
css = css.replace(/(min-width|max-width|min-height|max-height):\s*(\d+)px/g, (match, prop, val) => {
  if (val === '0') return match;
  const vhVal = (parseInt(val) / 1080 * 100).toFixed(2);
  return `${prop}: ${vhVal}vh`;
});

fs.writeFileSync(cssFile, css);
console.log('CSS updated with vh units');
