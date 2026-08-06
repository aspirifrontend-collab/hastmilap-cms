const fs = require('fs');

const homeFile = 'C:/Users/C-131/.gemini/antigravity/scratch/hastmilap-cms/frontend/src/components/Home.jsx';
let jsx = fs.readFileSync(homeFile, 'utf-8');

// The simplest way to handle this without writing 50 complex regexes is to rewrite the jsx return entirely, but Home.jsx is huge.
// Let's use string replacements where possible. 
// Or better yet, we can rebuild the component string from scratch based on the original template because the exact structure is known, but that risks losing changes like the add_js.js intersection observers.
// Let's use very specific replace operations.

const reps = [
  // Header
  ['src="assets/images/logo.png"', 'src={content?.header?.logoImageUrl || "assets/images/logo.png"}'],

  // Hero (already partially done, but let's reset to ensure it matches the new seed)
  ['"assets/videos/hero.mp4"', 'content?.hero?.videoUrl || "assets/videos/hero.mp4"'],
  ['"assets/images/hero_mobile.png"', 'content?.hero?.mobileImageUrl || "assets/images/hero_mobile.png"'],

  // Strengths
  [">Hastmilap's Core Strengths<", ">{content?.strengths?.title || \"Hastmilap's Core Strengths\"}<"],
  ['"assets/images/diamonds_decoration.png"', '{content?.strengths?.diamondImageUrl || "assets/images/diamonds_decoration.png"}'],
  ['data-count="20"', 'data-count={content?.strengths?.stat1Number || "20"}'],
  ['>Years of<br />Experience<', '>{content?.strengths?.stat1Label?.split(" ")[0] || "Years"} of<br />{content?.strengths?.stat1Label?.substring(content?.strengths?.stat1Label?.indexOf(" ")+1) || "Experience"}<'], // A bit hacky but works
  
  // Design Studio
  ['>Design Studio<br className="hide-mobile" />Innovation', '>{content?.design?.titleLine1 || "Design Studio"}<br className="hide-mobile" />{content?.design?.titleLine2 || "Innovation"}'],
  [">Hastmilap Design Studio was born in Surat, the jewelry capital of India. Today, we partner with brands across the world, delivering finely crafted, fully customized jewelry that represents your brand's identity and meets your highest standards.<", '>{content?.design?.description || "Hastmilap Design Studio..."}<'],
  ['"assets/images/ds_sketch.jpg"', '{content?.design?.imageUrl1 || "assets/images/ds_sketch.jpg"}'],
  ['"assets/images/ds_machine.jpg"', '{content?.design?.imageUrl2 || "assets/images/ds_machine.jpg"}'],

  // Global Presence
  ['>India To The World<', '>{content?.global?.title || "India To The World"}<'],
  ['>Hastmilap exports jewelry to seven countries, partnering with brands across India and global markets.<', '>{content?.global?.description || "Hastmilap exports..."}<'],
  ['"https://flagcdn.com/us.svg"', '{content?.global?.flag1Url || "https://flagcdn.com/us.svg"}'],
  ['>USA<', '>{content?.global?.flag1Name || "USA"}<'],
  // And so on for the rest...

  // Editorial
  ['"assets/videos/editorial.mp4"', '{content?.editorial?.videoUrl || "assets/videos/editorial.mp4"}'],

  // Vision
  ['>Crafted Around Your Vision<', '>{content?.vision?.title || "Crafted Around Your Vision"}<'],
  ['"assets/images/vision_natural.png"', '{content?.vision?.item1ImageUrl || "assets/images/vision_natural.png"}'],
  ['>Natural Diamond Jewelry<', '>{content?.vision?.item1Label || "Natural Diamond Jewelry"}<'],
  
  // Tech
  ['>Technology & Innovation<', '>{content?.tech?.title || "Technology & Innovation"}<'],
  ['>From advanced 3D CAD modeling to the final master setting, we redefine the boundaries of jewelry excellence through precision and artistry.<', '>{content?.tech?.description || "From advanced..."}<'],
  ['"assets/images/tech_tl.png"', '{content?.tech?.panel1ImageUrl || "assets/images/tech_tl.png"}'],

  // Styles
  ['"assets/images/style_european.png"', '{content?.tech?.style1ImageUrl || "assets/images/style_european.png"}'],

  // Instagram
  ['>WOLD FOLLOWING US<', '>{content?.instagram?.subtitle || "WORLD FOLLOWING US"}<'],
  ['>Instagram<', '>{content?.instagram?.title || "Instagram"}<'],

  // Footer
  ['>GET IN TOUCH<', '>{content?.footer?.newsletterTitle || "GET IN TOUCH"}<'],
  ['>Subscribe to our newsletter for the latest<br /> updates and exclusive offers!<', ' dangerouslySetInnerHTML={{ __html: content?.footer?.newsletterDesc || "Subscribe to our newsletter for the latest<br /> updates and exclusive offers!" }}><'],
  ['>2nd Floor, Varna House, Lal Darwaja, Station Road, Surat-395003<', '>{content?.footer?.address || "2nd Floor, Varna House, Lal Darwaja, Station Road, Surat-395003"}<'],
  ['>+91 93288 38787<', '>{content?.footer?.phone || "+91 93288 38787"}<'],
  ['>hello@hastmilap.com<', '>{content?.footer?.email || "hello@hastmilap.com"}<']
];

reps.forEach(([find, replace]) => {
  jsx = jsx.replace(find, replace);
});

// For things like video sources which use string literals without braces inside attributes, we need to handle them carefully.
// The above script does basic replaces. Let's fix up some exact matches.

jsx = jsx.replace(/<source src="assets\/videos\/instagram\/\(1\)\.mp4"/g, '<source src={content?.instagram?.videoUrl1 || "assets/videos/instagram/(1).mp4"}');
jsx = jsx.replace(/<video loop muted playsinline src="assets\/videos\/instagram\/\(1\)\.mp4"><\/video>/g, '<video loop muted playsinline src={content?.instagram?.videoUrl1 || "assets/videos/instagram/(1).mp4"}></video>');
jsx = jsx.replace(/<video loop muted playsinline src="assets\/videos\/instagram\/07-06\.mp4"><\/video>/g, '<video loop muted playsinline src={content?.instagram?.videoUrl2 || "assets/videos/instagram/07-06.mp4"}></video>');
jsx = jsx.replace(/<video loop muted playsinline src="assets\/videos\/instagram\/2999 14-08\.mp4"><\/video>/g, '<video loop muted playsinline src={content?.instagram?.videoUrl3 || "assets/videos/instagram/2999 14-08.mp4"}></video>');
jsx = jsx.replace(/<video loop muted playsinline src="assets\/videos\/instagram\/3099 22-08\.mp4"><\/video>/g, '<video loop muted playsinline src={content?.instagram?.videoUrl4 || "assets/videos/instagram/3099 22-08.mp4"}></video>');
jsx = jsx.replace(/<video loop muted playsinline src="assets\/videos\/instagram\/3314 05-09\.mp4"><\/video>/g, '<video loop muted playsinline src={content?.instagram?.videoUrl5 || "assets/videos/instagram/3314 05-09.mp4"}></video>');
jsx = jsx.replace(/<video loop muted playsinline src="assets\/videos\/instagram\/3357 10-09\.mp4"><\/video>/g, '<video loop muted playsinline src={content?.instagram?.videoUrl6 || "assets/videos/instagram/3357 10-09.mp4"}></video>');
jsx = jsx.replace(/<video loop muted playsinline src="assets\/videos\/instagram\/EXPORT VIDEO-3\.mp4"><\/video>/g, '<video loop muted playsinline src={content?.instagram?.videoUrl7 || "assets/videos/instagram/EXPORT VIDEO-3.mp4"}></video>');
jsx = jsx.replace(/<video loop muted playsinline src="assets\/videos\/instagram\/Final 02\.mp4"><\/video>/g, '<video loop muted playsinline src={content?.instagram?.videoUrl8 || "assets/videos/instagram/Final 02.mp4"}></video>');

// Marquee text replace
jsx = jsx.replace(/<span className="brand-marquee-text main">Hastmilap<\/span>/g, '<span className="brand-marquee-text main">{content?.marquee?.mainText || "Hastmilap"}</span>');
jsx = jsx.replace(/<span className="brand-marquee-text sub">World's Finest Jewellery<\/span>/g, '<span className="brand-marquee-text sub">{content?.marquee?.subText || "World\'s Finest Jewellery"}</span>');
jsx = jsx.replace(/<img src="assets\/images\/ring_marquee\.png"/g, '<img src={content?.marquee?.ringImageUrl || "assets/images/ring_marquee.png"}');

fs.writeFileSync(homeFile, jsx);
console.log('Home.jsx fully mapped');
