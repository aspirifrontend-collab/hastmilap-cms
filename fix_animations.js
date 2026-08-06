const fs = require('fs');

const homeFile = 'C:/Users/C-131/.gemini/antigravity/scratch/hastmilap-cms/frontend/src/components/Home.jsx';
let jsx = fs.readFileSync(homeFile, 'utf-8');

// The tech animation script to inject
const techScript = `
    // Tech Section Animations
    const wrapper = document.getElementById('techWrapper');
    const tl = document.getElementById('techTL');
    const tr = document.getElementById('techTR');
    const bl = document.getElementById('techBL');
    const br = document.getElementById('techBR');
    const center = document.getElementById('techCenter');

    let renderTechFrameId;

    if (wrapper && tl && tr && bl && br && center) {
      function easeOutQuint(t) { return 1 - Math.pow(1 - t, 5); }

      function getFinalPositions() {
        const W = window.innerWidth, H = window.innerHeight;
        return {
          tl: { cx: W * 0.145, cy: H * 0.235 },
          tr: { cx: W * 0.860, cy: H * 0.220 },
          bl: { cx: W * 0.145, cy: H * 0.750 },
          br: { cx: W * 0.860, cy: H * 0.750 },
        };
      }

      function getPanelSizes() {
        const W = window.innerWidth, H = window.innerHeight;
        const isMobile = W < 900;
        if (isMobile) return null;
        return {
          tl: { w: W * 0.29, h: H * 0.46 },
          tr: { w: W * 0.28, h: H * 0.44 },
          bl: { w: W * 0.29, h: H * 0.50 },
          br: { w: W * 0.28, h: H * 0.50 },
        };
      }

      function getStartPositions() {
        const W = window.innerWidth, H = window.innerHeight;
        return {
          tl: { cx: W * 0.42, cy: H * 0.44 },
          tr: { cx: W * 0.58, cy: H * 0.48 },
          bl: { cx: W * 0.40, cy: H * 0.50 },
          br: { cx: W * 0.58, cy: H * 0.48 },
        };
      }

      function applyPanel(el, cx, cy, size, opacity, zIndex) {
        if (!size) return;
        const x = cx - size.w / 2;
        const y = cy - size.h / 2;
        el.style.transform = \`translate(\${x}px, \${y}px)\`;
        el.style.width = \`\${size.w}px\`;
        el.style.height = \`\${size.h}px\`;
        el.style.opacity = opacity;
        el.style.zIndex = zIndex;
        el.style.top = '0';
        el.style.left = '0';
      }

      let targetP = 0;
      let currentP = 0;
      const lerpFactor = 0.08;

      function renderTech() {
        if (window.innerWidth < 900) {
          renderTechFrameId = requestAnimationFrame(renderTech);
          return;
        }

        const rect = wrapper.getBoundingClientRect();
        const total = wrapper.offsetHeight - window.innerHeight;
        const scrolled = Math.max(0, -rect.top);
        targetP = Math.min(1, Math.max(0, scrolled / total));

        currentP += (targetP - currentP) * lerpFactor;
        if (Math.abs(targetP - currentP) < 0.0001) currentP = targetP;

        const sz = getPanelSizes();
        const fin = getFinalPositions();
        const st = getStartPositions();

        const splitP = easeOutQuint(Math.min(1, currentP / 0.65));
        const textP = easeOutQuint(Math.max(0, Math.min(1, (currentP - 0.5) / 0.45)));

        applyPanel(tl, st.tl.cx + (fin.tl.cx - st.tl.cx) * splitP, st.tl.cy + (fin.tl.cy - st.tl.cy) * splitP, sz.tl, 1, 5);
        applyPanel(tr, st.tr.cx + (fin.tr.cx - st.tr.cx) * splitP, st.tr.cy + (fin.tr.cy - st.tr.cy) * splitP, sz.tr, 1, 5);
        applyPanel(bl, st.bl.cx + (fin.bl.cx - st.bl.cx) * splitP, st.bl.cy + (fin.bl.cy - st.bl.cy) * splitP, sz.bl, 1, 6);
        applyPanel(br, st.br.cx + (fin.br.cx - st.br.cx) * splitP, st.br.cy + (fin.br.cy - st.br.cy) * splitP, sz.br, 1, 7);

        center.style.opacity = textP;
        center.style.transform = \`translate(-50%, calc(-50% + \${(1 - textP) * 40}px))\`;

        if (textP > 0.5) center.classList.add('active');
        else center.classList.remove('active');

        renderTechFrameId = requestAnimationFrame(renderTech);
      }

      function initTech() {
        if (window.innerWidth < 900) {
          [tl, tr, bl, br, center].forEach(el => {
            el.style.transform = ''; el.style.opacity = ''; el.style.width = ''; el.style.height = '';
          });
          return;
        }
        const sz = getPanelSizes();
        const st = getStartPositions();
        applyPanel(tl, st.tl.cx, st.tl.cy, sz.tl, 1, 5);
        applyPanel(tr, st.tr.cx, st.tr.cy, sz.tr, 1, 5);
        applyPanel(bl, st.bl.cx, st.bl.cy, sz.bl, 1, 6);
        applyPanel(br, st.br.cx, st.br.cy, sz.br, 1, 7);
        center.style.opacity = '0';
        center.style.transform = 'translate(-50%, calc(-50% + 40px))';
      }

      window.addEventListener('resize', initTech);
      initTech();
      renderTechFrameId = requestAnimationFrame(renderTech);
    }
`;

// Insert the techScript into the useEffect
// Find the comment "// Header scroll" inside useEffect and insert before it
jsx = jsx.replace('// Header scroll', techScript + '\n    // Header scroll');

// Fix global window event cleanup
jsx = jsx.replace('return () => clearTimeout(t);', 'return () => { clearTimeout(t); if(renderTechFrameId) cancelAnimationFrame(renderTechFrameId); };');

// Now add the React functions outside the useEffect
const reactMethods = `
  const togglePlay = (e) => {
    const card = e.currentTarget;
    const vid = card.querySelector('video');
    if (!vid) return;
    const allCards = document.querySelectorAll('.ig-video-card');

    if (vid.paused) {
      allCards.forEach(c => {
        const v = c.querySelector('video');
        if (v) v.pause();
        c.classList.remove('playing');
      });
      vid.play().catch(() => { });
      card.classList.add('playing');
    } else {
      vid.pause();
      card.classList.remove('playing');
    }
  };

  const scrollIG = (direction) => {
    const grid = document.getElementById('igGrid');
    if (!grid) return;
    const card = grid.querySelector('.ig-video-card');
    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width;
    const gap = parseInt(getComputedStyle(grid).gap) || 14;
    const scrollAmount = (cardWidth + gap) * 3; // scroll 3 cards (1 page) at a time

    grid.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  };
`;

jsx = jsx.replace('export default function Home() {', 'export default function Home() {\n' + reactMethods);

// Fix the onclick attributes to onClick
jsx = jsx.replace(/onclick="togglePlay\(this\)"/g, 'onClick={togglePlay}');
jsx = jsx.replace(/onclick="scrollIG\(-1\)"/g, 'onClick={() => scrollIG(-1)}');
jsx = jsx.replace(/onclick="scrollIG\(1\)"/g, 'onClick={() => scrollIG(1)}');
jsx = jsx.replace(/autoplay/g, 'autoPlay');
jsx = jsx.replace(/playsinline/g, 'playsInline');
jsx = jsx.replace(/font-family/g, 'fontFamily');
jsx = jsx.replace(/font-size/g, 'fontSize');
jsx = jsx.replace(/font-weight/g, 'fontWeight');
jsx = jsx.replace(/letter-spacing/g, 'letterSpacing');
jsx = jsx.replace(/fill-opacity/g, 'fillOpacity');

fs.writeFileSync(homeFile, jsx);
console.log('Animations fixed and injected.');
