import React, { useState, useEffect } from 'react';
import api from '../api';
import Header from './Header';
import Footer from './Footer';
import './OurStory.css';

const OurStory = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/content').then(res => {
      setContent(res.data);
      setLoading(false);
    }).catch(err => {
      console.error('Error fetching content:', err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spinner"></div></div>;

  const storyData = content?.ourStory || {};
  const legacyData = content?.ourLegacy || {};
  const nameData = content?.storyName || {};
  const valuesData = content?.ourValues || {};
  const leadershipData = content?.leadership || {};
  const statsData = content?.stats || {};

  return (
    <>
    <Header content={content} />
    <div className="hastmilap-wrapper">
      
      {/* Our Story Section (Raleway) */}
      <section className="section text-center raleway-section">
        <div className="container">
          <span className="subtitle">{storyData.subtitle || 'Our Story'}</span>
          <h2 dangerouslySetInnerHTML={{ __html: storyData.title || 'Deep Roots,<br />Unfettered Imagination' }} />
          {storyData.mediaType === 'video' ? (
            <>
              {storyData.videoUrl && storyData.videoUrl.trim() !== '' && (
                <video 
                  src={storyData.videoUrl} 
                  autoPlay muted loop playsInline 
                  className="full-width-img large-img desktop-hero-img"
                  style={{ objectFit: 'cover' }}
                />
              )}
              {(storyData.mobileVideoUrl || storyData.videoUrl) && (storyData.mobileVideoUrl || storyData.videoUrl).trim() !== '' && (
                <video 
                  src={storyData.mobileVideoUrl || storyData.videoUrl} 
                  autoPlay muted loop playsInline 
                  className="full-width-img large-img mobile-hero-img"
                  style={{ objectFit: 'cover' }}
                />
              )}
            </>
          ) : (
            <>
              {storyData.imageUrl && storyData.imageUrl.trim() !== '' && (
                <img 
                  src={storyData.imageUrl} 
                  alt="Our Story Desktop" 
                  className="full-width-img large-img desktop-hero-img" 
                />
              )}
              {(storyData.mobileImageUrl || storyData.imageUrl) && (storyData.mobileImageUrl || storyData.imageUrl).trim() !== '' && (
                <img 
                  src={storyData.mobileImageUrl || storyData.imageUrl} 
                  alt="Our Story Mobile" 
                  className="full-width-img large-img mobile-hero-img" 
                />
              )}
            </>
          )}
        </div>
      </section>

      {/* Our Legacy Section (Raleway) */}
      {content?.ourLegacy && (
        <section className="section text-center our-legacy raleway-section">
          <div className="container">
            <span className="subtitle">{legacyData.subtitle || 'Our Legacy'}</span>
            <h2>{legacyData.title || 'The World Of Jewelry And The Evolving New Consumer'}</h2>
            <p className="max-w-text">
              {legacyData.description || 'Twenty years is not just a number. It is thousands of designs, hundreds of partnerships and millions of pieces crafted with care, precision and purpose. From our roots in Surat to brands and retailers across 7 countries, our legacy is written in the trust of every partner we serve and the happiness of every customer who wears our jewelry.'}
            </p>
            {legacyData.imageUrl && legacyData.imageUrl.trim() !== '' && (
              <img 
                src={legacyData.imageUrl} 
                alt="Our Legacy" 
                className="full-width-img large-img" 
                style={{ marginTop: '40px' }}
              />
            )}
          </div>
        </section>
      )}

      {/* The Story Of Our Name Section (Radley) */}
      {content?.storyName && (
        <section className="section text-center story-name">
        <div className="container">
            {nameData.imageUrl && nameData.imageUrl.trim() !== '' && (
              <img 
                src={nameData.imageUrl} 
                alt="The Story Of Our Name" 
                className="full-width-img medium-img" 
                style={{ marginBottom: '60px' }}
              />
            )}
          <h2>{nameData.title || 'The Story Of Our Name'}</h2>
          <div className="max-w-text">
            <p>{nameData.desc1 || 'Hastmilap means the meeting of hands. It is the moment a skilled artisan\'s hand meets raw material, where a designer\'s hand meets a brand\'s vision and where craftsmanship meets purpose. That belief has guided us for over 20 years.'}</p>
            <p>{nameData.desc2 || 'Founded in Surat, the heart of India\'s jewelry industry, Hastmilap was built on one idea — that the best jewelry is born when the right hands come together. Today we bring that belief to brands and retailers across 7 countries, delivering fully customized jewelry designed around your vision and manufactured to the highest standards.'}</p>
          </div>
        </div>
      </section>
      )}

      {/* Our Vision & Mission Section (Radley) */}
      {content?.ourValues && (
        <section className="section our-values">
        <div className="container">
          {/* Vision Row */}
          <div className="flex-row vision-row">
            <div className="content-col text-left">
              <h2>{valuesData.visionTitle || 'OUR VISION'}</h2>
              <p>{valuesData.visionDesc || 'To become the world\'s most trusted jewellery manufacturing partner by setting new benchmarks in craftsmanship, innovation, and responsible manufacturing while proudly showcasing India\'s excellence on the global stage.'}</p>
            </div>
            {content.ourValues?.visionImageUrl && content.ourValues.visionImageUrl.trim() !== '' && (
              <div className="image-col">
                <img className="img-desktop" src={content.ourValues.visionImageUrl} alt="Our Vision" />
                <img className="img-mobile" src={content.ourValues.visionMobileImageUrl || content.ourValues.visionImageUrl} alt="Our Vision" />
              </div>
            )}
          </div>
          
          {/* Mission Row */}
          <div className="flex-row mission-row">
            {content.ourValues?.missionImageUrl && content.ourValues.missionImageUrl.trim() !== '' && (
              <div className="image-col">
                <img className="img-desktop" src={content.ourValues.missionImageUrl} alt="Our Mission" />
                <img className="img-mobile" src={content.ourValues.missionMobileImageUrl || content.ourValues.missionImageUrl} alt="Our Mission" />
              </div>
            )}
            <div className="content-col text-left">
              <h2>{valuesData.missionTitle || 'OUR MISSION'}</h2>
              <p>{valuesData.missionDesc || 'At Hastmilap, our mission is to transform ideas into exceptional jewellery through advanced manufacturing, precision engineering, and skilled craftsmanship. We are committed to delivering uncompromising quality, fostering long-term partnerships, empowering our people, embracing sustainable practices, and continuously innovating to shape the future of the global jewellery industry.'}</p>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Our Values & Philosophy Section (New) */}
      {content?.ourPhilosophy && (
        <section className="our-philosophy">
          <div className="container philosophy-container">
            <div className="philosophy-text-col">
              <h2>{content.ourPhilosophy?.title || 'Our Values & Philosophy'}</h2>
              <p>{content.ourPhilosophy?.desc1 || 'The finest jewelry does not just catch the eye. It touches the heart. At Hastmilap our vision is to be the world\'s most trusted jewelry manufacturing partner creating pieces that go beyond beauty and carry meaning, emotion and happiness to every person who wears them. That is what “Wear Happiness” means to us.'}</p>
              <p>{content.ourPhilosophy?.desc2 || 'It is not just a thought. It is the standard we hold every design, every detail and every delivery to. When your customers wear Hastmilap they do not just wear jewelry. They wear a moment, a memory and a feeling that stays with them.'}</p>
              <p>{content.ourPhilosophy?.desc3 || 'That is the promise we make to you and to every customer you serve.'}</p>
            </div>
          </div>
          {content.ourPhilosophy?.imageUrl && content.ourPhilosophy.imageUrl.trim() !== '' && (
            <div className="philosophy-image-col">
              <img className="img-desktop" src={content.ourPhilosophy.imageUrl} alt="Our Values & Philosophy" />
              <img className="img-mobile" src={content.ourPhilosophy.mobileImageUrl || content.ourPhilosophy.imageUrl} alt="Our Values & Philosophy" />
            </div>
          )}
        </section>
      )}

      {/* Meet The Leadership Section (Radley) */}
      {content?.leadership && (
        <section className="section meet-leadership">
        <div className="container text-center">
          <h2>{leadershipData.title || 'Meet The Leadership'}</h2>
          <p className="max-w-text leadership-intro">
            {leadershipData.intro || 'We are united by a singular vision, to never stop bringing a new point of view to the table. Our headquarters in India house some of the best talent in product design and the latest technologies, skilled craftsmanship, artists, writers and poets.'}
          </p>

          <div className="flex-row text-left leadership-profile">
            <div className="content-col">
              <span className="sub-heading">{leadershipData.role || 'FOUNDER & MANAGING DIRECTOR'}</span>
              <h3>{leadershipData.name || 'Mr. Vishal Dholiya'}</h3>
              <div className="divider"></div>
              <p>{leadershipData.desc1 || 'Driven by passion and 2 decades of industry expertise, Mr. Vishal Dholiya built Hastmilap on one powerful belief. That jewelry should do more than shine. It should make people feel something. That belief became Wear Happiness, the philosophy that drives every decision, every design and every partnership at Hastmilap.'}</p>
              <p>{leadershipData.desc2 || 'Under his leadership, Hastmilap has grown from a passionate studio in Surat into a globally trusted jewelry manufacturing partner, serving brands across 7 countries with craftsmanship, precision and purpose.'}</p>
            </div>
            {content.leadership?.imageUrl && content.leadership.imageUrl.trim() !== '' && (
              <div className="image-col">
                <img className="img-desktop portrait-img" src={content.leadership.imageUrl} alt="Meet The Leadership" />
                <img className="img-mobile portrait-img" src={content.leadership.mobileImageUrl || content.leadership.imageUrl} alt="Meet The Leadership" />
              </div>
            )}
          </div>
        </div>
      </section>
      )}

      {/* Stats / Collection Section (Radley) */}
      {content?.stats && (
        <section className="section text-center stats-section">
        <div className="container">
          <h2>{statsData.title || 'A Collection Of Leaders, Creators And Innovators'}</h2>
          <p className="max-w-text">{statsData.desc || 'Crafting a meaningful response to the jewelry creation process with of innovation and design thinking.'}</p>
          
          <div className="stats-grid">
            <div className="stat-item">
              <h4>{statsData.stat1Value || '20'}</h4>
              <p dangerouslySetInnerHTML={{ __html: statsData.stat1Label || 'Years of<br />Experience' }} />
            </div>
            <div className="stat-item">
              <h4>{statsData.stat2Value || '7+'}</h4>
              <p dangerouslySetInnerHTML={{ __html: statsData.stat2Label || 'Exporting<br />Countries' }} />
            </div>
            <div className="stat-item">
              <h4>{statsData.stat3Value || '2'}</h4>
              <p dangerouslySetInnerHTML={{ __html: statsData.stat3Label || 'Manufacturing<br />Facilities' }} />
            </div>
            <div className="stat-item">
              <h4>{statsData.stat4Value || '250+'}</h4>
              <p dangerouslySetInnerHTML={{ __html: statsData.stat4Label || 'Employees' }} />
            </div>
          </div>
        </div>
      </section>
      )}

    </div>
    <Footer content={content} />
    </>
  );
};

export default OurStory;
