const fs = require('fs');

const homeFile = 'C:/Users/C-131/.gemini/antigravity/scratch/hastmilap-cms/frontend/src/components/Home.jsx';
let jsx = fs.readFileSync(homeFile, 'utf-8');

// 1. Move let renderTechFrameId; outside the setTimeout
jsx = jsx.replace('    let renderTechFrameId;', '');
jsx = jsx.replace('    const t = setTimeout(() => {', '    let renderTechFrameId;\\n    let handleScroll;\\n    const t = setTimeout(() => {');

// 2. Fix handleScroll definition so it is assigned to the outer variable
jsx = jsx.replace('const handleScroll = () => {', 'handleScroll = () => {');

// 3. Remove the early return
jsx = jsx.replace("return () => window.removeEventListener('scroll', handleScroll);", '');

// 4. Update the actual useEffect cleanup
const oldCleanup = 'return () => { clearTimeout(t); if(renderTechFrameId) cancelAnimationFrame(renderTechFrameId); };';
const newCleanup = 'return () => { clearTimeout(t); if(renderTechFrameId) cancelAnimationFrame(renderTechFrameId); if (handleScroll) window.removeEventListener(\\'scroll\\', handleScroll); };';
jsx = jsx.replace(oldCleanup, newCleanup);

fs.writeFileSync(homeFile, jsx);
console.log('Cleanup fixed');
