const fs = require('fs');

const homeFile = 'C:/Users/C-131/.gemini/antigravity/scratch/hastmilap-cms/frontend/src/components/Home.jsx';
let jsx = fs.readFileSync(homeFile, 'utf-8');

// Replace static content with dynamic variables based on seeded data

// Hero Video
jsx = jsx.replace(/"assets\/hero_h\.mp4"/g, 'content?.hero?.videoUrl || "assets/hero_h.mp4"');
jsx = jsx.replace(/"assets\/hero_v\.jpg"/g, 'content?.hero?.mobileImageUrl || "assets/hero_v.jpg"');

// Strengths Section
jsx = jsx.replace(/>Our Core Strengths</g, '>{content?.strengths?.title || "Our Core Strengths"}<');
jsx = jsx.replace(/"assets\/20-years-of-excellence-576x576\.webp"/g, 'content?.strengths?.diamondImage || "assets/20-years-of-excellence-576x576.webp"');

// About Section
jsx = jsx.replace(/>20 Years</g, '>{content?.about?.years || "20 Years"}<');
jsx = jsx.replace(/>of Excellence</g, '>{content?.about?.excellence || "of Excellence"}<');

// The component state sets `content` to `res.data`. The seeded data gives:
// content.hero = { videoUrl, mobileImageUrl }
// Wait, the API returns `{ hero: { videoUrl: ... }, strengths: { ... } }` because we mapped it in contentRoutes!

fs.writeFileSync(homeFile, jsx);
console.log('Home.jsx updated with dynamic variables');
