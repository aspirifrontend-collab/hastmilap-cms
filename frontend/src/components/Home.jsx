
import React, { useEffect, useState } from 'react';
import api from '../api';
import Header from './Header';
import Footer from './Footer';

export default function Home() {

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

  const scrollCategories = (direction) => {
    const grid = document.getElementById('categoriesCarousel');
    if (!grid) return;
    const card = grid.querySelector('.category-item');
    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width;
    const gap = parseInt(getComputedStyle(grid).gap) || 20;
    const scrollAmount = (cardWidth + gap) * 2; 

    grid.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
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

  const [content, setContent] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  const renderStatLabel = (label) => {
    if (!label) return null;
    const spaceIndex = label.indexOf(' ');
    if (spaceIndex === -1) {
      return <span className="stat-label">{label}</span>;
    }
    return (
      <span className="stat-label">
        {label.substring(0, spaceIndex)}<br />
        {label.substring(spaceIndex + 1)}
      </span>
    );
  };

  useEffect(() => {
    // API Call
    api.get('/content').then(res => setContent(res.data)).catch(console.error);

    let renderTechFrameId;
    let handleScroll;

    // DOM logic
    // Add a slight timeout to ensure DOM is rendered with React
    const t = setTimeout(() => {
      
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
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / target)) || 20; // fallback if target is 0
      let current = 0;
      const timer = setInterval(() => {
        current += Math.ceil(target / 100) || 1;
        if (current >= target) {
          el.innerText = target + suffix;
          clearInterval(timer);
        } else {
          el.innerText = current + suffix;
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

    
    // Tech Section Animations
    const wrapper = document.getElementById('techWrapper');
    const tl = document.getElementById('techTL');
    const tr = document.getElementById('techTR');
    const bl = document.getElementById('techBL');
    const br = document.getElementById('techBR');
    const center = document.getElementById('techCenter');

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
        el.style.transform = `translate(${x}px, ${y}px)`;
        el.style.width = `${size.w}px`;
        el.style.height = `${size.h}px`;
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
        center.style.transform = `translate(-50%, calc(-50% + ${(1 - textP) * 40}px))`;

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


    }, 100);

    return () => { 
      clearTimeout(t); 
      if(renderTechFrameId) cancelAnimationFrame(renderTechFrameId); 
      if(handleScroll) window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const categoriesList = [];
  if (content?.categories) {
    for (let i = 1; i <= 6; i++) {
      const label = content.categories[`cat${i}Label`];
      const imageUrl = content.categories[`cat${i}ImageUrl`];
      if (label || imageUrl) {
        categoriesList.push({ label, imageUrl });
      }
    }
  }

  const faqItems = [];
  if (content?.faq) {
    for (let i = 1; i <= 10; i++) {
      if (content.faq[`faq${i}Question`]) {
        faqItems.push({
          question: content.faq[`faq${i}Question`],
          answer: content.faq[`faq${i}Answer`]
        });
      }
    }
  }

  return (
    <>
      <div className="custom-cursor" id="customCursor"></div>
      
      {/* ═ MAIN PROGRESS BAR ═ */}
      <div className="main-progress-bar">
        <div className="main-progress-bar-fill" id="mainProgressBar"></div>
      </div>

  {/*  ═══ SECTION 1: HEADER ═══  */}
  <Header content={content} />

  {/*  ═══ SECTION 2: HERO VIDEO/IMAGE ═══  */}
  <section className="hero" id="hero">
    {content?.hero?.mediaType === 'image' ? (
      <>
        {/* Desktop Image */}
        <img className="hero-video desktop-hero" src={content?.hero?.imageUrl || "assets/images/hero.jpg"} alt="Hero" />
        
        {/* Mobile Image */}
        <img className="hero-video mobile-hero" src={content?.hero?.mobileImageUrl || "assets/images/hero_mobile.png"} alt="Hero" />
      </>
    ) : (
      <>
        {/* Desktop Video */}
        <video className="hero-video desktop-hero" autoPlay muted loop playsInline poster={content?.hero?.imageUrl || "assets/images/hero.jpg"}
          src={content?.hero?.videoUrl || "assets/videos/desktop_hero.mp4"}></video>
        
        {/* Mobile Video */}
        <video className="hero-video mobile-hero" autoPlay muted loop playsInline poster={content?.hero?.mobileImageUrl || "assets/images/hero_mobile.png"}
          src={content?.hero?.mobileVideoUrl || "assets/videos/mobile_hero.mp4"}></video>
      </>
    )}
      
    <div className="hero-overlay"></div>
  </section>

  {/*  ═══ BANNER SECTION ═══  */}
  <section className="banner-section reveal" id="banner">
    <div className="banner-image-container">
      {content?.banner?.linkUrl ? (
        <a href={content.banner.linkUrl} target="_blank" rel="noopener noreferrer">
          <picture>
            <source media="(max-width: 768px)" srcSet={content?.banner?.mobileImageUrl || "assets/images/about_hastmilap_banner_mobile.jpg"} />
            <img src={content?.banner?.imageUrl || "assets/images/about_hastmilap_banner.jpg"} alt="Hastmilap Banner" />
          </picture>
        </a>
      ) : (
        <picture>
          <source media="(max-width: 768px)" srcSet={content?.banner?.mobileImageUrl || "assets/images/about_hastmilap_banner_mobile.jpg"} />
          <img src={content?.banner?.imageUrl || "assets/images/about_hastmilap_banner.jpg"} alt="Hastmilap Banner" />
        </picture>
      )}
    </div>
    
    <div className="banner-text-overlay">
      <h2>{content?.banner?.overlayTitle || "HASTMILAP"}</h2>
      <p>{content?.banner?.overlaySubtitle || "WEAR HAPPINESS ALWAYS SMILE...!"}</p>
      <a href={content?.banner?.buttonLink || "#"} className="banner-btn">
        {content?.banner?.buttonText || "Learn More About our Journey"}
      </a>
    </div>
  </section>



  {/*  ═══ SECTION 3: CORE STRENGTHS ═══  */}
  <section className="strengths" id="strengths">
    <div className="strengths-diamond-bg">
      <img src={content?.strengths?.diamondImageUrl || "assets/images/diamonds_decoration.png"} alt="Diamond Decoration" />
    </div>
    <div className="strengths-center">
      <h2 className="strengths-title reveal">{content?.strengths?.title || "Hastmilap's Core Strengths"}</h2>
      <div className="strengths-stats">
        <div className="stat-item reveal reveal-delay-1">
          <span className="stat-number" data-count={content?.strengths?.stat1Number || "20"} data-suffix={content?.strengths?.stat1Suffix || ""}>0</span>
          {renderStatLabel(content?.strengths?.stat1Label || "Years Experience")}
        </div>
        <div className="stat-item reveal reveal-delay-2">
          <span className="stat-number" data-count={content?.strengths?.stat2Number || "7"} data-suffix={content?.strengths?.stat2Suffix || "+"}>0</span>
          {renderStatLabel(content?.strengths?.stat2Label || "Exporting Countries")}
        </div>
        <div className="stat-item reveal reveal-delay-3">
          <span className="stat-number" data-count={content?.strengths?.stat3Number || "150"} data-suffix={content?.strengths?.stat3Suffix || " Cr+"}>0</span>
          {renderStatLabel(content?.strengths?.stat3Label || "Annual Turnover")}
        </div>
        <div className="stat-item reveal reveal-delay-4">
          <span className="stat-number" data-count={content?.strengths?.stat4Number || "2"} data-suffix={content?.strengths?.stat4Suffix || ""}>0</span>
          {renderStatLabel(content?.strengths?.stat4Label || "Manufacturing Facilities")}
        </div>
        <div className="stat-item reveal reveal-delay-5">
          <span className="stat-number" data-count={content?.strengths?.stat5Number || "250"} data-suffix={content?.strengths?.stat5Suffix || "+"}>0</span>
          {renderStatLabel(content?.strengths?.stat5Label || "Employees")}
        </div>
      </div>
    </div>
  </section>



  {/*  ═══ SECTION 4: 20 YEARS ABOUT ═══  */}
  <section className="about-strip" id="about">
    <div className="container">
      <div className="about-layout-wrapper">
        <img src={content?.about?.imageUrl1 || "assets/images/about_necklace.jpg"} alt="About Hastmilap 1" className="about-img-1 reveal" />
        
        <div className="about-content reveal">
          <div className="about-title-wrapper">
            <h2 className="about-title">
              <span className="years">{content?.about?.years || "20 Years"}</span>
              <span className="excellence">{content?.about?.excellence || "of Crafting Excellence"}</span>
            </h2>
            <div className="about-subtitle">Retail Intelligence</div>
          </div>

          <div className="about-text-wrapper">
            <p className="about-text">
              {content?.about?.description1 || "For over 20 years, Hastmilap has been the trusted manufacturing partner for jewelry retailers worldwide. We bring together skilled artisans, cutting-edge technology, and modern design to deliver pieces of exceptional quality, precision, and elegance. So your collection always stands out, and your business never stops growing."}
            </p>
          </div>
        </div>

        <img src={content?.about?.imageUrl2 || "assets/images/about_showroom.jpg"} alt="About Hastmilap 2" className="about-img-2 reveal" />
      </div>
    </div>
  </section>

  {/*  ═══ SECTION 6: GLOBAL PRESENCE ═══  */}
  <section className="global-presence" id="global">
    <div className="gp-badge reveal">
      <img src={content?.global?.badgeImageUrl || "assets/images/global_badge.png"} alt="Badge" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
    </div>

    <div className="gp-content">
      <h2 className="gp-title reveal">{content?.global?.title || "India To The World"}</h2>
      <div className="gp-divider reveal reveal-delay-1"></div>
      <p className="gp-desc reveal reveal-delay-2">Hastmilap exports jewelry to seven countries, partnering with brands
        across India and global markets.</p>
      <div className="flags-grid reveal reveal-delay-3">
        <div className="flags-row">
          <div className="flag-item">
            <img src={content?.global?.flag1Url || "https://flagcdn.com/us.svg"} alt="USA" />
            <span>{content?.global?.flag1Name || "USA"}</span>
          </div>
          <div className="flag-item">
            <img src="https://flagcdn.com/il.svg" alt="Israel" />
            <span>Israel</span>
          </div>
          <div className="flag-item">
            <img src="https://flagcdn.com/eu.svg" alt="Europe" />
            <span>Europe</span>
          </div>
          <div className="flag-item">
            <img src="https://flagcdn.com/ae.svg" alt="Dubai" />
            <span>Dubai</span>
          </div>
          <div className="flag-item">
            <img src="https://flagcdn.com/tr.svg" alt="Turkey" />
            <span>Turkey</span>
          </div>
          <div className="flag-item">
            <img src="https://flagcdn.com/be.svg" alt="Belgium" />
            <span>Belgium</span>
          </div>
          <div className="flag-item">
            <img src="https://flagcdn.com/hk.svg" alt="Hong Kong" />
            <span>Hong-Kong</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  ═══ BRAND MARQUEE SECTION ═══  */}
  <div className="brand-marquee">
    <div className="brand-marquee-track">
      <div className="brand-marquee-group">
        <span className="brand-marquee-text main">{content?.marquee?.mainText || "Hastmilap"}</span>
        <img src={content?.marquee?.ringImageUrl || "assets/images/ring_marquee.png"} alt="Ring" className="brand-marquee-ring" />
        
        <span className="brand-marquee-sep">//</span>
        <span className="brand-marquee-text sub">{content?.marquee?.subText || "World's Finest Jewellery"}</span>
        <span className="brand-marquee-sep">//</span>
        <span className="brand-marquee-text main">{content?.marquee?.mainText || "Hastmilap"}</span>
        <img src={content?.marquee?.ringImageUrl || "assets/images/ring_marquee.png"} alt="Ring" className="brand-marquee-ring" />
        
        <span className="brand-marquee-sep">//</span>
        <span className="brand-marquee-text sub">{content?.marquee?.subText || "World's Finest Jewellery"}</span>
        <span className="brand-marquee-sep">//</span>
      </div>
      <div className="brand-marquee-group">
        <span className="brand-marquee-text main">{content?.marquee?.mainText || "Hastmilap"}</span>
        <img src={content?.marquee?.ringImageUrl || "assets/images/ring_marquee.png"} alt="Ring" className="brand-marquee-ring" />
        
        <span className="brand-marquee-sep">//</span>
        <span className="brand-marquee-text sub">{content?.marquee?.subText || "World's Finest Jewellery"}</span>
        <span className="brand-marquee-sep">//</span>
        <span className="brand-marquee-text main">{content?.marquee?.mainText || "Hastmilap"}</span>
        <img src={content?.marquee?.ringImageUrl || "assets/images/ring_marquee.png"} alt="Ring" className="brand-marquee-ring" />
        <span className="brand-marquee-sep">//</span>
        <span className="brand-marquee-text sub">{content?.marquee?.subText || "World's Finest Jewellery"}</span>
        <span className="brand-marquee-sep">//</span>
      </div>
    </div>
  </div>

  {/*  ═══ SECTION: FAQ ═══  */}
  <section className="faq-section" id="faq">
    <div className="faq-background-image reveal">
      <img src={content?.faq?.imageUrl || "assets/images/faq_woman.jpg"} alt="Hastmilap FAQ" />
    </div>

    <div className="faq-container container">
      <div className="faq-content reveal reveal-delay-2">
        <h2 className="faq-title">{content?.faq?.title || "OUR UNIQUE EDGE"}</h2>
        
        <div className="faq-accordion">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className={`faq-item ${openFaq === index ? 'active' : ''}`}
            >
              <div 
                className="faq-question" 
                onClick={() => toggleFaq(index)}
              >
                <span>{item.question}</span>
                <span className="faq-icon">{openFaq === index ? '−' : '+'}</span>
              </div>
              <div className="faq-answer">
                <div className="faq-answer-inner">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>


  {/*  ═══ SECTION 8: TECHNOLOGY & INNOVATION ═══  */}
  <div className="tech-wrapper" id="techWrapper">
    <div className="tech-scene" id="techScene">
      <div className="tech-slider-container">
        <div className="tech-panel" id="techTL">
          <img src={content?.tech?.panel1ImageUrl || "assets/images/tech_tl.png"} alt="Wax Prototyping" />
        </div>
        <div className="tech-panel" id="techTR">
          <img src="assets/images/tech_tr.png" alt="Molten Gold Process" />
        </div>
        <div className="tech-panel" id="techBL">
          <img src="assets/images/tech_bl.png" alt="Expert Craftsmanship" />
        </div>
        <div className="tech-panel" id="techBR">
          <img src="assets/images/tech_br.png" alt="Diamond Setting" />
        </div>
      </div>
      <div className="tech-center-content" id="techCenter">
        <h2>{content?.tech?.title || "Technology & Innovation"}</h2>
        <p>{content?.tech?.description || "From advanced 3D CAD modeling to the final master setting, we redefine the boundaries of jewelry excellence through precision and artistry."}</p>
        {content?.tech?.buttonText && (
          <a href={content?.tech?.buttonLink || "#contact"} className="tech-cta-link">{content.tech.buttonText}</a>
        )}
      </div>
    </div>
  </div>

  {/*  ═══ SECTION 7.5: CATEGORIES ═══  */}
  <section className="categories-section" id="categories">
    <h2 className="categories-title reveal">{content?.categories?.title || "Explore Our Categories"}</h2>
    
    <div className="ig-slider-wrapper reveal" style={{ marginTop: '40px' }}>
      <button className="ig-nav-btn prev" onClick={() => scrollCategories(-1)} aria-label="Previous">
        <svg viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>

      <div className="categories-carousel" id="categoriesCarousel">
        {categoriesList.map((cat, index) => (
          <div className="category-item" key={index}>
            <div className="category-img-wrap">
              <img src={cat.imageUrl} alt={cat.label} />
            </div>
            <p className="category-label">{cat.label}</p>
          </div>
        ))}
      </div>

      <button className="ig-nav-btn next" onClick={() => scrollCategories(1)} aria-label="Next">
        <svg viewBox="0 0 24 24">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
        </svg>
      </button>
    </div>
  </section>
  {/*  ═══ SECTION: IN THE NEWS ═══  */}
  <section className="news-section" id="news">
    <h2 className="section-title desktop-title reveal" style={{textAlign: 'center'}}>{content?.news?.desktopTitle || "IN THE NEWS"}</h2>
    <h2 className="section-title mobile-title reveal" style={{textAlign: 'center'}}>{content?.news?.mobileTitle || "Sustainability"}</h2>
    <div className="news-grid">
      <div className="news-item reveal mobile-visible">
        <a href={content?.news?.image1Link || "#"}>
          <img src={content?.news?.image1Url || "assets/images/news1.png"} alt="News 1" />
        </a>
      </div>
      <div className="news-item reveal reveal-delay-1 mobile-hidden">
        <a href={content?.news?.image2Link || "#"}>
          <img src={content?.news?.image2Url || "assets/images/news2.png"} alt="News 2" />
        </a>
      </div>
      <div className="news-item reveal reveal-delay-2 mobile-hidden">
        <a href={content?.news?.image3Link || "#"}>
          <img src={content?.news?.image3Url || "assets/images/news3.png"} alt="News 3" />
        </a>
      </div>
    </div>
    <div className="section-description reveal">
      <p>{content?.news?.description}</p>
    </div>
  </section>

  {/*  ═══ SECTION 10: INSTAGRAM ═══  */}
  <section className="instagram-section" id="instagram">
    <div className="ig-left reveal">
      <p className="ig-follow">{content?.instagram?.subtitle || "WORLD FOLLOWING US"}</p>
      <h2 className="ig-title">{content?.instagram?.title || "Instagram"}</h2>
      <div className="ig-graphic">
        <svg width="130" height="140" viewBox="0 0 182 182" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_852_660)">
            <path
              d="M85.9944 50.2405C84.2081 34.9318 82.3219 18.7683 82.3219 -0.000488281H99.1747C99.1747 18.5574 97.2976 34.7005 95.5135 50.0263C94.0602 62.516 92.6699 74.463 92.4117 86.7322C100.874 77.9056 108.276 68.5462 116.031 58.7422C125.592 46.6546 135.688 33.8915 148.959 20.6204L160.876 32.5375C147.753 45.66 135.009 55.7466 122.911 65.3229L122.9 65.3315C113.046 73.1327 103.619 80.5949 94.7639 89.0844C106.988 88.8262 118.84 87.4432 131.255 85.9944C146.563 84.2076 162.728 82.3214 181.497 82.3214V99.1742C162.939 99.1742 146.796 97.2962 131.471 95.513L131.46 95.5121C118.973 94.0592 107.029 92.6699 94.7639 92.4112C103.585 100.867 112.939 108.266 122.737 116.015L122.752 116.028C134.84 125.59 147.604 135.686 160.876 148.958L148.959 160.875C135.836 147.753 125.75 135.01 116.175 122.913L116.152 122.882L116.133 122.857C108.342 113.018 100.889 103.606 92.4117 94.7634C92.6699 107.033 94.0602 118.98 95.5135 131.469C97.2976 146.795 99.1747 162.938 99.1747 181.496H82.3219C82.3219 162.728 84.2081 146.564 85.9944 131.255L85.9981 131.23C87.4451 118.824 88.8267 106.979 89.0849 94.7634C80.6076 103.606 73.1545 113.018 65.3633 122.857L65.3442 122.882L65.3215 122.913C55.7467 135.01 45.6605 147.753 32.538 160.875L20.6209 148.958C33.8926 135.686 46.6564 125.59 58.7445 116.028L58.76 116.015C68.5576 108.266 77.9119 100.867 86.7327 92.4112C74.4635 92.6703 62.516 94.0601 50.0254 95.513C34.7003 97.2962 18.5573 99.1742 0 99.1742V82.3214C18.7687 82.3214 34.9333 84.2076 50.2419 85.9944C62.6567 87.4432 74.5089 88.8262 86.7327 89.0844C77.8743 80.5917 68.4437 73.1272 58.5853 65.3229C46.4872 55.7466 33.7432 45.66 20.6209 32.5375L32.538 20.6204C45.8084 33.8915 55.905 46.6546 65.4658 58.7422C73.2203 68.5458 80.6226 77.9051 89.0849 86.7313C88.8267 74.5161 87.4451 62.6716 85.9981 50.2654L85.9944 50.2405Z"
              fill="#151313" fillOpacity="0.2" />
          </g>
          <defs>
            <clipPath id="clip0_852_660">
              <rect width="181.497" height="181.497" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>

    <div className="ig-slider-wrapper reveal reveal-delay-2">
      <button className="ig-nav-btn prev" onClick={() => scrollIG(-1)} aria-label="Previous">
        <svg viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>

      <div className="ig-grid" id="igGrid">
        {/*  Video 1  */}
        <div className="ig-video-card" onClick={togglePlay}>
          <div className="ig-placeholder">
            <span className="ig-placeholder-num">01</span>
            <svg className="ig-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="rgba(100,80,60,0.5)"
              strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span className="ig-placeholder-label">Hastmilap</span>
          </div>
          <video loop muted playsInline src={content?.instagram?.videoUrl1 || "assets/videos/instagram/(1).mp4"}></video>
          <div className="ig-video-overlay">
            <div className="ig-icon-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
          </div>
        </div>
        {/*  Video 2  */}
        <div className="ig-video-card" onClick={togglePlay}>
          <div className="ig-placeholder">
            <span className="ig-placeholder-num">02</span>
            <svg className="ig-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="rgba(100,80,60,0.5)"
              strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span className="ig-placeholder-label">Hastmilap</span>
          </div>
          <video loop muted playsInline src={content?.instagram?.videoUrl2 || "assets/videos/instagram/07-06.mp4"}></video>
          <div className="ig-video-overlay">
            <div className="ig-icon-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
          </div>
        </div>
        {/*  Video 3  */}
        <div className="ig-video-card" onClick={togglePlay}>
          <div className="ig-placeholder">
            <span className="ig-placeholder-num">03</span>
            <svg className="ig-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="rgba(100,80,60,0.5)"
              strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span className="ig-placeholder-label">Hastmilap</span>
          </div>
          <video loop muted playsInline src={content?.instagram?.videoUrl3 || "assets/videos/instagram/2999 14-08.mp4"}></video>
          <div className="ig-video-overlay">
            <div className="ig-icon-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
          </div>
        </div>
        {/*  Video 4  */}
        <div className="ig-video-card" onClick={togglePlay}>
          <div className="ig-placeholder">
            <span className="ig-placeholder-num">04</span>
            <svg className="ig-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="rgba(100,80,60,0.5)"
              strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span className="ig-placeholder-label">Hastmilap</span>
          </div>
          <video loop muted playsInline src={content?.instagram?.videoUrl4 || "assets/videos/instagram/3099 22-08.mp4"}></video>
          <div className="ig-video-overlay">
            <div className="ig-icon-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
          </div>
        </div>
        {/*  Video 5  */}
        <div className="ig-video-card" onClick={togglePlay}>
          <div className="ig-placeholder">
            <span className="ig-placeholder-num">05</span>
            <svg className="ig-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="rgba(100,80,60,0.5)"
              strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span className="ig-placeholder-label">Hastmilap</span>
          </div>
          <video loop muted playsInline src={content?.instagram?.videoUrl5 || "assets/videos/instagram/3314 05-09.mp4"}></video>
          <div className="ig-video-overlay">
            <div className="ig-icon-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
          </div>
        </div>
        {/*  Video 6  */}
        <div className="ig-video-card" onClick={togglePlay}>
          <div className="ig-placeholder">
            <span className="ig-placeholder-num">06</span>
            <svg className="ig-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="rgba(100,80,60,0.5)"
              strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span className="ig-placeholder-label">Hastmilap</span>
          </div>
          <video loop muted playsInline src={content?.instagram?.videoUrl6 || "assets/videos/instagram/3357 10-09.mp4"}></video>
          <div className="ig-video-overlay">
            <div className="ig-icon-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
          </div>
        </div>
        {/*  Video 7  */}
        <div className="ig-video-card" onClick={togglePlay}>
          <div className="ig-placeholder">
            <span className="ig-placeholder-num">07</span>
            <svg className="ig-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="rgba(100,80,60,0.5)"
              strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span className="ig-placeholder-label">Hastmilap</span>
          </div>
          <video loop muted playsInline src={content?.instagram?.videoUrl7 || "assets/videos/instagram/EXPORT VIDEO-3.mp4"}></video>
          <div className="ig-video-overlay">
            <div className="ig-icon-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
          </div>
        </div>
        {/*  Video 8  */}
        <div className="ig-video-card" onClick={togglePlay}>
          <div className="ig-placeholder">
            <span className="ig-placeholder-num">08</span>
            <svg className="ig-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="rgba(100,80,60,0.5)"
              strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span className="ig-placeholder-label">Hastmilap</span>
          </div>
          <video loop muted playsInline src={content?.instagram?.videoUrl8 || "assets/videos/instagram/Final 02.mp4"}></video>
          <div className="ig-video-overlay">
            <div className="ig-icon-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      <button className="ig-nav-btn next" onClick={() => scrollIG(1)} aria-label="Next">
        <svg viewBox="0 0 24 24">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
        </svg>
      </button>
      <div className="ig-dots" id="igDots"></div>
    </div>
  </section>

  {/*  Start of Footer  */}
  <Footer content={content} />

  
    </>
  );
}
