import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { fetchContentWithRetry } from '../api';
import { getCachedContent, setCachedContent } from '../contentCache';
import './ContactUs.css';

const ContactUs = () => {
  const [content, setContent] = useState(getCachedContent);
  const [loading, setLoading] = useState(() => !getCachedContent());

  useEffect(() => {
    fetchContentWithRetry().then(data => {
      setContent(data);
      setCachedContent(data);
      setLoading(false);
    }).catch(err => {
      console.error('Error fetching content:', err);
      setLoading(false);
    });
  }, []);

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '', agreed: false });
  const [submitted, setSubmitted] = useState(false);

  const handleField = (field) => (e) => {
    const value = field === 'agreed' ? e.target.checked : e.target.value;
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ firstName: '', lastName: '', email: '', phone: '', message: '', agreed: false });
    setTimeout(() => setSubmitted(false), 4000);
  };

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spinner"></div></div>;

  const data = content?.contactUs || {};

  return (
    <>
      <Header content={content} />
      <div className="contact-us-page">
        {/* Hero Banner */}
        <section
          className="contact-hero"
          style={{ backgroundImage: `url(${data.heroImageUrl || 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'})` }}
        >
          <h1>{data.heroTitle || 'Contact Us'}</h1>
        </section>

        {/* Get In Touch */}
        <section className="get-in-touch">
          <div className="container git-grid">
            <div className="git-info">
              <span className="git-label">{data.subtitle || 'Contact Us'}</span>
              <h2>{data.title || 'Get In Touch'}</h2>
              <p className="git-desc">{data.description || 'Subscribe to our newsletter for the latest updates and exclusive offers!'}</p>

              <div className="info-row">
                <div className="info-icon icon-email">
                  <i className="fa-regular fa-envelope"></i>
                </div>
                <div className="info-text">
                  <h4>{data.emailLabel || 'Email'}</h4>
                  <p>{data.emailDesc || 'Our friendly team is here to help.'}</p>
                  <a href={`mailto:${data.email || 'sales.hastmilapp@gmail.com'}`}>{data.email || 'sales.hastmilapp@gmail.com'}</a>
                </div>
              </div>

              <div className="info-row">
                <div className="info-icon icon-phone">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="info-text">
                  <h4>{data.phoneLabel || 'Phone'}</h4>
                  <p>{data.phoneDesc || 'Mon-Sat from 9:00am to 7:00pm.'}</p>
                  <a href={`tel:${data.phone || '+919909871000'}`}>{data.phone || '+91 9909871000'}</a>
                </div>
              </div>

              <div className="info-row">
                <div className="info-icon icon-office">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="info-text">
                  <h4>{data.officeLabel || 'Office'}</h4>
                  <p>{data.officeDesc || 'Come say hello at our office HQ.'}</p>
                  <address>
                    {(data.officeAddress || 'Bardoliya Compound, Near Surat Dawa Bazar,\nVastia Devdi Road, Katargam 395004\nSURAT, GUJARAT, INDIA')
                      .split('\n').map((line, i) => <span key={i}>{line}</span>)}
                  </address>
                </div>
              </div>
            </div>

            <div className="git-form-card">
              <p className="form-intro">{data.formIntro || "We'd love to hear from you. Please fill out this form."}</p>
              <form onSubmit={handleSubmit}>
                <div className="form-row two-col">
                  <div className="form-field">
                    <label>First name</label>
                    <input type="text" placeholder="First name" value={form.firstName} onChange={handleField('firstName')} required />
                  </div>
                  <div className="form-field">
                    <label>Last name</label>
                    <input type="text" placeholder="Last name" value={form.lastName} onChange={handleField('lastName')} required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>Email</label>
                    <input type="email" placeholder="you@company.com" value={form.email} onChange={handleField('email')} required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>Phone number</label>
                    <div className="phone-input">
                      <span className="phone-code">US +1</span>
                      <input type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={handleField('phone')} />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label>Message</label>
                    <textarea placeholder="Leave us a message..." rows="4" value={form.message} onChange={handleField('message')} required></textarea>
                  </div>
                </div>

                <label className="agree-check">
                  <input type="checkbox" checked={form.agreed} onChange={handleField('agreed')} required />
                  <span>You agree to our friendly privacy policy.</span>
                </label>

                <button type="submit" className="send-btn">{submitted ? 'Message Sent' : 'Send Message'}</button>
              </form>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="contact-map">
          <iframe
            title="Hastmilap Office Location"
            src={data.mapEmbedSrc || 'https://www.google.com/maps?q=Bardoliya+Compound,+Near+Surat+Dawa+Bazar,+Vastia+Devdi+Road,+Katargam,+Surat,+Gujarat+395004,+India&output=embed'}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </div>
      <Footer content={content} />
    </>
  );
};

export default ContactUs;
