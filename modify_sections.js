const fs = require('fs');

// 1. Modify Home.jsx
const homeFile = 'C:/Users/C-131/.gemini/antigravity/scratch/hastmilap-cms/frontend/src/components/Home.jsx';
let jsx = fs.readFileSync(homeFile, 'utf8');

const catStart = jsx.indexOf('{/*  ═══ SECTION 7.5: CATEGORIES ═══  */}');
const techStart = jsx.indexOf('{/*  ═══ SECTION 8: TECHNOLOGY & INNOVATION ═══  */}');
const stylesStart = jsx.indexOf('{/*  ═══ SECTION 9: REGIONAL STYLES ═══  */}');
const igStart = jsx.indexOf('{/*  ═══ SECTION 10: INSTAGRAM ═══  */}');

if (catStart !== -1 && techStart !== -1 && stylesStart !== -1 && igStart !== -1) {
    const categoriesBlock = jsx.substring(catStart, techStart);
    const techBlock = jsx.substring(techStart, stylesStart);
    const beforeCat = jsx.substring(0, catStart);
    const afterIg = jsx.substring(igStart);
    
    // The new order: Tech then Categories
    // Then Instagram (styles is deleted)
    const newJsx = beforeCat + techBlock + categoriesBlock + afterIg;
    fs.writeFileSync(homeFile, newJsx);
    console.log('Home.jsx modified successfully');
} else {
    console.log('Failed to find sections in Home.jsx');
}

// 2. Modify seed.js
const seedFile = 'C:/Users/C-131/.gemini/antigravity/scratch/hastmilap-cms/backend/seed.js';
let seed = fs.readFileSync(seedFile, 'utf8');
const seedRegex = /\\{\\s*section:\\s*'styles'[\\s\\S]*?\\}\\s*\\},/g;
if (seedRegex.test(seed)) {
    seed = seed.replace(seedRegex, '');
    fs.writeFileSync(seedFile, seed);
    console.log('seed.js modified successfully');
} else {
    console.log('styles not found in seed.js');
}
