import React, { useState, useEffect } from 'react';
import api from '../api';
import Header from './Header';
import Footer from './Footer';
import './B2b.css';

const B2b = () => {
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

  const heroData = content?.b2bHero || {};
  const insightsData = content?.b2bInsights || {};
  const unroundsData = content?.b2bUnrounds || {};
  const heritageData = content?.b2bHeritage || {};
  const aureateData = content?.b2bAureate || {};
  const aestheteData = content?.b2bAesthete || {};
  const privateLabelData = content?.b2bPrivateLabel || {};
  const uniqueInsightData = content?.b2bUniqueInsight || {};

  return (
    <>
      <Header content={content} />
      <div className="jewelry-app">
        {/* Hero Section */}
        <section className="hero-section">
          <img 
            src={heroData.imageUrl || "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"} 
            alt="Hero Diamond" 
            className="img-placeholder"
          />
        </section>

        {/* Insights / Our Story Section (Uses Raleway) */}
        <section className="font-raleway">
          <div className="container split-row">
            <div>
              <div className="accent-underline">
                <h2 className="heading-lg font-radley" dangerouslySetInnerHTML={{ __html: insightsData.heading || 'Industry Vision.<br />Expert Craftsmanship.<br />Meaningful Connections.' }}></h2>
              </div>
              <p className="body-text">
                {insightsData.bodyText || 'At Walking Tree, we assist retail partners in maintaining their competitive edge by offering jewelry designs that adapt to the modern consumer. By reimagining traditional techniques, cuts, categories, and colors, we produce contemporary collections that resonate with today\'s audience. Our design studio relies on sharp consumer insights to create pieces that perfectly align with modern lifestyle demands.'}
              </p>
            </div>
            <div>
              <img 
                src={insightsData.imageUrl || "https://images.unsplash.com/photo-1617038220319-276d3cfab638?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                alt="Insights" 
                className="main-img img-placeholder" 
                style={{ marginTop: 0 }}
              />
            </div>
          </div>
        </section>

        {/* Unrounds Section (Uses Radley) */}
        <section className="bg-alt font-radley">
          <div className="container unrounds-container">
            <h2 className="heading-lg">{unroundsData.heading || 'Unrounds'}</h2>
            <p className="subtitle">{unroundsData.subtitle || 'Revealing New Facets'}</p>
            <p className="body-text">
              {unroundsData.bodyText || 'While the classic round cut is widely celebrated for its beauty, we push the boundaries by harnessing the power of fancy-cut diamonds. This creates distinctive pieces that stand as a mark of individuality and creativity. We celebrate shapes beyond the traditional, giving them previously unrecognized stature. From daily wear to exclusive designer pieces, this collection sets us apart, providing retailers with an updated assortment to meet contemporary demands.'}
            </p>
            <img 
              src={unroundsData.imageUrl || "https://images.unsplash.com/photo-1605100804763-247f67b6348e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"} 
              alt="Unrounds" 
              className="main-img img-placeholder"
            />
          </div>
        </section>

        {/* Heritage / Renaissance Section / Legacy (Uses Raleway) */}
        <section className="font-raleway">
          <div className="container split-row reverse-mobile">
            <div className="desktop-order-2">
              <h2 className="heading-lg font-radley">{heritageData.heading || 'Heritage: Renaissance'}</h2>
              <p className="subtitle">{heritageData.subtitle || 'Where Tradition Meets Modernity'}</p>
              <div className="gradient-line"></div>
              <p className="body-text">
                {heritageData.bodyText || 'Merging the rich heritage of traditional Indian finery with contemporary style, this legacy collection offers stunning, lightweight jewelry. The intricate detailing combined with modern aesthetics allows for versatile pieces suitable for both casual and formal wear. It serves as a beautiful reminder of our roots while fully embracing the fashion trends of the times.'}
              </p>
            </div>
            <div className="desktop-order-1">
              <img 
                src={heritageData.imageUrl || "https://images.unsplash.com/photo-1599643478524-fb52490715b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                alt="Heritage" 
                className="main-img img-placeholder" 
                style={{ marginTop: 0 }}
              />
            </div>
          </div>
        </section>

        {/* Aureate Grid Section (Uses Radley) */}
        <section className="bg-alt font-radley">
          <div className="container split-row">
            <div>
              <h2 className="heading-lg">{aureateData.heading || 'Aureate'}</h2>
              <p className="subtitle">{aureateData.subtitle || 'Infusing Classics With Vibrant Hues'}</p>
              <div className="gradient-line"></div>
              <p className="body-text">
                {aureateData.bodyText || 'We have reimagined fine jewelry by introducing a wide array of colors through a unique collection of gemstones. Featuring bold designs and interesting forms, each piece remains light, flexible, and wearable. Extensive hours of cutting and polishing ensure that every custom stone meets our strict quality standards for shape, color, and sparkle.'}
              </p>
            </div>
            
            <div className="aureate-grid">
              <img src={aureateData.leftImgUrl || "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} alt="Sketch Components" className="left-img img-placeholder" />
              <img src={aureateData.rightImg1Url || "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} alt="Pink Gemstone Ring" className="right-img img-placeholder" />
              <img src={aureateData.rightImg2Url || "https://images.unsplash.com/photo-1602173574767-37ac01994b4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} alt="Purple Gemstone Ring" className="right-img img-placeholder" />
            </div>
          </div>
        </section>

        {/* Aesthete Section (Uses Radley) */}
        <section className="font-radley">
          <div className="container text-center-desk">
            <div className="aesthete-container">
              <h2 className="heading-lg">{aestheteData.heading || 'Aesthete'}</h2>
              <p className="subtitle">{aestheteData.subtitle || 'Celebrating Master Craftsmanship'}</p>
              <p className="body-text">
                {aestheteData.bodyText || 'Representing the perfect blend of engineering, craft, and design, this signature collection celebrates timeless luxury. Crafted from the rarest materials by highly skilled artisans over hundreds of hours, each masterpiece delivers uncontested international caliber for the most discerning audiences.'}
              </p>
            </div>
            <img 
              src={aestheteData.imageUrl || "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"} 
              alt="Aesthete" 
              className="aesthete-img img-placeholder"
            />
          </div>
        </section>

        {/* Private Label & Harmony (Uses Radley) */}
        <section className="bg-alt font-radley">
          <div className="container">
            <div className="private-label-intro">
              <p className="subtitle uppercase-sub">{privateLabelData.privateSubtitle || 'Private Label Services'}</p>
              <h2 className="heading-lg" style={{ marginBottom: '20px' }}>{privateLabelData.privateHeading || 'From Offering The Whole Bouquet To Standalone Design And Manufacturing Services'}</h2>
              <p className="body-text">
                {privateLabelData.privateBody || 'As a full-stack design studio, we understand that every partner has unique challenges. We collaborate closely with retailers to build a completely customized showcase that captures their distinct aesthetic. By plugging into industry insights, we design and manufacture dedicated key lines for leading retail brands.'}
              </p>
            </div>

            <div className="split-row" style={{ alignItems: 'flex-end' }}>
              <div className="harmony-intro">
                <h2 className="heading-lg">{privateLabelData.harmonyHeading || 'Harmony'}</h2>
                <p className="subtitle">{privateLabelData.harmonySubtitle || 'Our Collections'}</p>
                <p className="body-text">
                  {privateLabelData.harmonyBody || 'A premium assortment of diamond jewelry designed exclusively for top-tier retail partners, complete with comprehensive marketing collateral, lookbooks, and promotional videos. Merging the heritage finery of India with modern style, this collection offers stunning, lightweight jewelry.'}
                </p>
              </div>

              {/* Collection Slider (Mobile) / Grid (Desktop) */}
              <div className="slider-container">
                <div className="slider-track">
                  <div className="slide-item">
                    <img src={privateLabelData.slide1ImgUrl || "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} alt="Pink Premium Collection" className="img-placeholder" />
                    <p className="uppercase-sub slide-caption">{privateLabelData.slide1Caption || 'Pink Premium'}</p>
                  </div>
                  <div className="slide-item">
                    <img src={privateLabelData.slide2ImgUrl || "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} alt="Nature Collection" className="img-placeholder" />
                    <p className="uppercase-sub slide-caption">{privateLabelData.slide2Caption || 'Nature Collection'}</p>
                  </div>
                  <div className="slide-item">
                    <img src={privateLabelData.slide3ImgUrl || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} alt="Visit Store Collection" className="img-placeholder" />
                    <p className="uppercase-sub slide-caption">{privateLabelData.slide3Caption || 'Visit Store'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Unique Insight Section (Uses Radley) */}
        <section className="font-radley">
          <div className="container">
            <div className="insight-images">
              <img src={uniqueInsightData.rightImgUrl || "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt="Retail Store Interior" className="insight-right-img img-placeholder" />
              <img src={uniqueInsightData.leftImgUrl || "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"} alt="Necklaces close up" className="insight-left-img img-placeholder" />
            </div>
            
            <div className="insight-text-row">
              <div className="insight-text-title">
                <h2 className="heading-lg">{uniqueInsightData.heading || 'A Unique Insight'}</h2>
                <p className="subtitle" style={{ marginBottom: '10px' }}>{uniqueInsightData.subtitle || 'Retail Intelligence'}</p>
              </div>
              <div className="insight-text-desc">
                <p className="body-text">
                  {uniqueInsightData.bodyText || 'Walking Tree we have a stimulating retail space where we showcase all our designs in a highly immersive experience geared towards our modern day shopper. This is where we gain insights and identify emerging trends, that help us create a distinctive style and keep our product mix relevant for consumers and retailers alike.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer content={content} />
    </>
  );
};

export default B2b;
