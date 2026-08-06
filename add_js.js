const fs = require('fs');

const homeFile = 'C:/Users/C-131/.gemini/antigravity/scratch/hastmilap-cms/frontend/src/components/Home.jsx';
let jsx = fs.readFileSync(homeFile, 'utf-8');

const jsLogic = `
    // Intersection Observer for .reveal
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));

    // Counter animations
    const counters = document.querySelectorAll('[data-count]');
    const counterTriggered = new Set();
    const animateCounter = (el) => {
      const target = +el.getAttribute('data-count');
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / target));
      let current = 0;
      const timer = setInterval(() => {
        current += Math.ceil(target / 100) || 1;
        if (current >= target) {
          el.innerText = target;
          clearInterval(timer);
        } else {
          el.innerText = current;
        }
      }, stepTime);
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counterTriggered.has(entry.target)) {
          counterTriggered.add(entry.target);
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObserver.observe(el));

    // Header scroll
    const header = document.querySelector('.header');
    if (header) {
      const handleScroll = () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
`;

// Insert the jsLogic inside the first useEffect (or a new useEffect)
const newUseEffect = `
  useEffect(() => {
    // API Call
    api.get('/content').then(res => setContent(res.data)).catch(console.error);

    // DOM logic
    // Add a slight timeout to ensure DOM is rendered with React
    const t = setTimeout(() => {
      ${jsLogic}
    }, 100);

    return () => clearTimeout(t);
  }, []);
`;

jsx = jsx.replace(/useEffect\(\(\) => \{\s*api\.get\('\/content'\)\.then\(res => setContent\(res\.data\)\)\.catch\(console\.error\);\s*\}, \[\]\);/s, newUseEffect);

fs.writeFileSync(homeFile, jsx);
console.log("Added JS to Home.jsx");
