import React from 'react';

const Footer = ({ content }) => {
  return (
    <footer className="site-footer">
      {/* Top Section: Branding & Newsletter */}
      <div className="footer-top">
        <div className="container">
          <div className="newsletter-wrapper">
            <h2>{content?.footer?.newsletterTitle || "GET IN TOUCH"}</h2>
            <p dangerouslySetInnerHTML={{ __html: content?.footer?.newsletterDesc || "Subscribe to our newsletter for the latest<br /> updates and exclusive offers!" }}></p>
            <form className="newsletter-form">
              <div className="input-group">
                <input type="email" placeholder="Enter your email" required />
                <button type="submit">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
        {/* Overlapping Logo Box */}
        <div className="logo-overlap">
          <div className="logo-circle">
            <img src="assets/images/footer_logo.png" alt="Hastmilap Jewels" className="brand-logo" />
          </div>
        </div>
      </div>

      {/* Middle Section: Links and Contact */}
      <div className="footer-middle">
        <div className="container">
          <div className="footer-grid">

            {/* Contact Us Column */}
            <div className="footer-col contact-col">
              <h3>CONTACT US</h3>
              <ul>
                <li>
                  {content?.footer?.locationIconUrl ? <img src={content.footer.locationIconUrl} alt="Location" className="contact-icon" /> : <i className="fa-solid fa-location-dot"></i>}
                  <p>{content?.footer?.address || "H-NO 412, South side, Bardoliya Compound,Near Surat Dawa Bazar, Vasta Devdi Road,Katargam 395004 SURAT, GUJARAT, India."}</p>
                </li>
                <li>
                  {content?.footer?.phoneIconUrl ? <img src={content.footer.phoneIconUrl} alt="Phone" className="contact-icon" /> : <i className="fa-solid fa-phone"></i>}
                  <p>{content?.footer?.phone || "+91 9909871000"}</p>
                </li>
                <li>
                  {content?.footer?.emailIconUrl ? <img src={content.footer.emailIconUrl} alt="Email" className="contact-icon" /> : <i className="fa-solid fa-envelope"></i>}
                  <p>{content?.footer?.email || "sales.hastmilap@gmail.com"}</p>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="footer-col company-col">
              <h3>COMPANY</h3>
              <ul>
                {(content?.footer?.companyLinks || [
                  { text: 'About', url: '#' },
                  { text: 'Privacy Policy', url: '#' },
                  { text: 'Terms & Conditions', url: '#' }
                ]).map((link, index) => (
                  <li key={index}><a href={link.url || '#'}>{link.text || 'Link'}</a></li>
                ))}
              </ul>
            </div>

            {/* Working Hours Column */}
            <div className="footer-col hours-col">
              <h3>WORKING HOURS</h3>
              <ul>
                <li>
                  {content?.footer?.calendarIconUrl ? <img src={content.footer.calendarIconUrl} alt="Calendar" className="contact-icon" /> : <i className="fa-regular fa-calendar"></i>}
                  <p>{content?.footer?.workingDays || "Monday to Saturday"}</p>
                </li>
                <li>
                  {content?.footer?.clockIconUrl ? <img src={content.footer.clockIconUrl} alt="Clock" className="contact-icon" /> : <i className="fa-regular fa-clock"></i>}
                  <p>{content?.footer?.workingHours || "9:00AM to 7:00PM"}</p>
                </li>
              </ul>
            </div>

            {/* Social Media Column */}
            <div className="footer-col social-col">
              <h3>SOCIAL MEDIA</h3>
              <div className="social-icons">
                <a href={content?.footer?.instagramLink || "https://www.instagram.com/hastmilapjewels/"} target="_blank" className="social-icon instagram" rel="noreferrer">
                  {content?.footer?.instagramIconUrl ? <img src={content.footer.instagramIconUrl} alt="Instagram" /> : <i className="fa-brands fa-instagram"></i>}
                </a>
                <a href={content?.footer?.facebookLink || "https://www.facebook.com/hastmilappl"} target="_blank" className="social-icon facebook" rel="noreferrer">
                  {content?.footer?.facebookIconUrl ? <img src={content.footer.facebookIconUrl} alt="Facebook" /> : <i className="fa-brands fa-facebook-f"></i>}
                </a>
                <a href={content?.footer?.pinterestLink || "https://in.pinterest.com/hastmilapsurat/"} target="_blank" className="social-icon pinterest" rel="noreferrer">
                  {content?.footer?.pinterestIconUrl ? <img src={content.footer.pinterestIconUrl} alt="Pinterest" /> : <i className="fa-brands fa-pinterest-p"></i>}
                </a>
                <a href={content?.footer?.linkedinLink || "https://www.linkedin.com/company/hastmilapjewels/"} target="_blank" className="social-icon linkedin" rel="noreferrer">
                  {content?.footer?.linkedinIconUrl ? <img src={content.footer.linkedinIconUrl} alt="LinkedIn" /> : <i className="fa-brands fa-linkedin-in"></i>}
                </a>
                <a href={content?.footer?.youtubeLink || "https://www.youtube.com/"} target="_blank" className="social-icon youtube" rel="noreferrer">
                  {content?.footer?.youtubeIconUrl ? <img src={content.footer.youtubeIconUrl} alt="YouTube" /> : <i className="fa-brands fa-youtube"></i>}
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026 Hastmilap. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
