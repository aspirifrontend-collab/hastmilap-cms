import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ content }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header');
      if (header) {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetHref) => {
    setIsMobileMenuOpen(false); // Close mobile menu on click
    if (targetHref && targetHref.startsWith('#')) {
      e.preventDefault();
      
      let elementId = targetHref.substring(1);
      
      if (elementId === 'vision') {
        elementId = 'categories';
      } else if (elementId === 'contact') {
        const footer = document.querySelector('footer.site-footer') || document.querySelector('.footer-top');
        if (footer) {
          footer.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      
      const el = document.getElementById(elementId);
      if (el) {
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        navigate(`/${targetHref}`);
      }
    }
  };

  return (
    <>
      <header className={`header ${isMobileMenuOpen ? 'menu-open' : ''}`}>
        <div className="header-left">
          <div className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="header-logo">
            <a href="/" style={{ height: '100%', display: 'flex' }}>
              <img src={content?.header?.logoImageUrl || "assets/images/logo.png"} alt="Hastmilap Logo" />
            </a>
          </div>
        </div>
        
        <div className="header-center">
          <nav className="header-nav">
            <a href="/">Home</a>
            {content?.header?.nav1Text !== '' && <a href={content?.header?.nav1Link || "#about"} onClick={(e) => handleNavClick(e, content?.header?.nav1Link || "#about")}>{content?.header?.nav1Text || "Company"}</a>}
            {content?.header?.nav2Text !== '' && <a href={content?.header?.nav2Link || "#styles"} onClick={(e) => handleNavClick(e, content?.header?.nav2Link || "#styles")}>{content?.header?.nav2Text || "Collection"}</a>}
            {content?.header?.nav3Text !== '' && <a href={content?.header?.nav3Link || "#categories"} onClick={(e) => handleNavClick(e, content?.header?.nav3Link || "#categories")}>{content?.header?.nav3Text || "Categories"}</a>}
            {content?.header?.nav4Text !== '' && <a href={content?.header?.nav4Link || "#strengths"} onClick={(e) => handleNavClick(e, content?.header?.nav4Link || "#strengths")}>{content?.header?.nav4Text || "Why Hastmilap"}</a>}
            {content?.header?.nav5Text !== '' && <a href={content?.header?.nav5Link || "#footer"} onClick={(e) => handleNavClick(e, content?.header?.nav5Link || "#footer")}>{content?.header?.nav5Text || "Contact"}</a>}
          </nav>
        </div>

        <div className="header-right">
          <a href={content?.header?.profileLink || "/login"} className="header-icon" style={{ display: 'inline-block', color: 'inherit' }}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </a>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
          <nav className="mobile-nav-links">
            <a href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
            {content?.header?.nav1Text !== '' && <a href={content?.header?.nav1Link || "#about"} onClick={(e) => handleNavClick(e, content?.header?.nav1Link || "#about")}>{content?.header?.nav1Text || "Company"}</a>}
            {content?.header?.nav2Text !== '' && <a href={content?.header?.nav2Link || "#styles"} onClick={(e) => handleNavClick(e, content?.header?.nav2Link || "#styles")}>{content?.header?.nav2Text || "Collection"}</a>}
            {content?.header?.nav3Text !== '' && <a href={content?.header?.nav3Link || "#categories"} onClick={(e) => handleNavClick(e, content?.header?.nav3Link || "#categories")}>{content?.header?.nav3Text || "Categories"}</a>}
            {content?.header?.nav4Text !== '' && <a href={content?.header?.nav4Link || "#strengths"} onClick={(e) => handleNavClick(e, content?.header?.nav4Link || "#strengths")}>{content?.header?.nav4Text || "Why Hastmilap"}</a>}
            {content?.header?.nav5Text !== '' && <a href={content?.header?.nav5Link || "#footer"} onClick={(e) => handleNavClick(e, content?.header?.nav5Link || "#footer")}>{content?.header?.nav5Text || "Contact"}</a>}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
