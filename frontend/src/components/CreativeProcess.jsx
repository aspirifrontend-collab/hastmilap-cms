import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import api from '../api';
import './CreativeProcess.css';

const CreativeProcess = () => {
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

  const heroData = content?.cpHero || {};
  const discoveryData = content?.cpDiscovery || {};
  const conceptData = content?.cpConcept || {};
  const modelData = content?.cp3dModelling || {};
  const protoData = content?.cpPrototyping || {};
  const mfgData = content?.cpManufacturing || {};
  const qcData = content?.cpQuality || {};
  const deliveryData = content?.cpDelivery || {};

  return (
    <>
      <Header content={content} />
      <div className="app-wrapper creative-process-page">
        {/* Hero Section */}
        <section 
          className="hero"
          style={{
            '--desktop-bg': `url(${heroData.bgImageUrl || 'https://images.unsplash.com/photo-1611080880193-4700d23f3889?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'})`,
            '--mobile-bg': `url(${heroData.mobileBgImageUrl || heroData.bgImageUrl || 'https://images.unsplash.com/photo-1611080880193-4700d23f3889?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'})`
          }}
        >
          {heroData.title !== '' && (
            <h1 dangerouslySetInnerHTML={{ __html: heroData.title || 'Our Creative Process' }}></h1>
          )}
          {heroData.text !== '' && (
            <p dangerouslySetInnerHTML={{ __html: heroData.text || 'At Hastmilap, every piece of jewelry begins long before the first sketch is drawn. It begins with a conversation, a vision and a deep understanding of what your brand stands for.' }}></p>
          )}
        </section>

        {/* Main Content */}
        <main className="container process-sections">
          
          {/* Discovery */}
          <div className="process-row grid-3-col">
            <div className="image-stack mobile-order-2">
              <img src={discoveryData.imageUrl1 || "https://images.unsplash.com/photo-1599643478524-fb66f70d00de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} alt="Detail painting" />
              <img src={discoveryData.imageUrl2 || "https://images.unsplash.com/photo-1618220179428-22790b46a0eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} alt="Moodboards" />
            </div>
            <div className="text-content mobile-order-1">
              <h2 dangerouslySetInnerHTML={{ __html: discoveryData.heading || 'Discovery' }}></h2>
              <p dangerouslySetInnerHTML={{ __html: discoveryData.para1 || 'With the wearer at the centre of our world, every jewel crafted by a Walking Tree brand will always have one thing in common. It is precious first because of the meaning it holds.' }}></p>
              <p dangerouslySetInnerHTML={{ __html: discoveryData.para2 || 'Every design finds its inspiration in real, personal, intimately-shared insights. These true stories and precious moments are brought to life in every facet through a combination of exceptional skill and thoughtful design.' }}></p>
              <p dangerouslySetInnerHTML={{ __html: discoveryData.para3 || 'Our studios house some of the best talent in product design, who work in tandem with a world-class team of craftsmen, artists, visualisers, writers, poets, photographers, digital experts and innovators. Each piece is therefore a culmination of study, research and passion to be ahead of the curve.' }}></p>
            </div>
            <div className="image-single mobile-order-3 discovery-third-img">
              <img src={discoveryData.imageUrl3 || "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"} alt="Designers working" />
            </div>
          </div>

          {/* Concept & Design */}
          <div className="concept-section-wrapper">
            <h2 className="concept-main-title" dangerouslySetInnerHTML={{ __html: conceptData.heading || 'Concept & Design' }}></h2>
            <div className="process-row concept-layout">
              <div className="concept-left mobile-order-2">
                <img src={conceptData.imageUrl1 || "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"} alt="Sketching" />
              </div>
              <div className="concept-right">
                <div className="image-side-by-side mobile-order-3">
                  <img src={conceptData.imageUrl2 || "https://images.unsplash.com/photo-1611080880193-4700d23f3889?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} alt="Pattern design" />
                  <img src={conceptData.imageUrl3 || "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} alt="Working process" />
                </div>
                <p className="concept-para mobile-order-1" dangerouslySetInnerHTML={{ __html: conceptData.para1 || 'Once we understand your vision, our designers get to work. Using a blend of artistic intuition and market insight, we develop concept sketches and mood boards that capture the essence of your collection. Every line, curve and detail is considered with purpose. We design jewelry that not only looks beautiful but tells a story your customers will connect with.' }}></p>
              </div>
            </div>
          </div>

          {/* 3D Modelling */}
          <div className="process-row grid-2-col">
            <div className="text-content mobile-order-1">
              <h2 dangerouslySetInnerHTML={{ __html: modelData.heading || '3D Modelling' }}></h2>
              <p dangerouslySetInnerHTML={{ __html: modelData.para1 || 'Concept becomes reality through our advanced 3D design process. Our skilled designers translate every sketch into a precise 3D model, allowing you to see exactly how your piece will look before a single gram of metal is used. This stage ensures complete accuracy, eliminating guesswork and giving you full confidence in the final design.' }}></p>
            </div>
            <div className="image-single mobile-order-2">
              <img src={modelData.imageUrl || "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt="3D Modelling" />
            </div>
          </div>

          {/* Prototyping */}
          <div className="process-row grid-2-col-reverse">
            <div className="image-single mobile-order-2">
              <img src={protoData.imageUrl || "https://images.unsplash.com/photo-1588693959600-474d2b270034?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt="Prototyping" />
            </div>
            <div className="text-content mobile-order-1">
              <h2 dangerouslySetInnerHTML={{ __html: protoData.heading || 'Prototyping' }}></h2>
              <p dangerouslySetInnerHTML={{ __html: protoData.para1 || 'Using cutting-edge 3D printing technology, we bring your design to life in physical form. Our prototypes are crafted with exceptional detail and precision, giving you a real feel for the piece before full production begins. This stage allows for refinement, adjustment and perfection, ensuring the final product exceeds your expectations.' }}></p>
            </div>
          </div>

          {/* Manufacturing */}
          <div className="concept-section-wrapper">
            <h2 className="concept-main-title mfg-desktop-title" dangerouslySetInnerHTML={{ __html: mfgData.heading || 'Manufacturing' }}></h2>
            <div className="process-row manufacturing-layout">
              <div className="manufacturing-left mobile-order-1">
                <img src={mfgData.imageUrlMain || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"} alt="Manufacturing machine" />
              </div>
              <div className="manufacturing-right">
                <h2 className="mfg-mobile-title mobile-order-2" dangerouslySetInnerHTML={{ __html: mfgData.heading || 'Manufacturing' }}></h2>
                <p className="mobile-order-3" dangerouslySetInnerHTML={{ __html: mfgData.para1 || 'Once the design is approved, our master artisans and CNC manufacturing technology work in harmony to produce your jewelry to the highest standards. Every piece is crafted with care, skill and uncompromising attention to detail. Whether you require a single custom piece or a full production run, our manufacturing process delivers consistency, quality and excellence every time.' }}></p>
                <div className="image-single mobile-order-4">
                  <img src={mfgData.imageUrlInline || "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt="Manufacturing process" />
                </div>
              </div>
            </div>
          </div>

          {/* Quality Control */}
          <div className="process-row grid-2-col">
            <div className="text-content mobile-order-1">
              <h2 dangerouslySetInnerHTML={{ __html: qcData.heading || 'Quality Control' }}></h2>
              <p dangerouslySetInnerHTML={{ __html: qcData.para1 || 'At Hastmilap, quality is not a final step. It is present at every stage of our process. Before any piece leaves our studio, it goes through a rigorous quality control inspection, measured against the highest standards of finish, durability and design accuracy. Only when a piece meets our standard does it carry the Hastmilap promise.' }}></p>
            </div>
            <div className="image-side-by-side mobile-order-2">
              <img src={qcData.imageUrl1 || "https://images.unsplash.com/photo-1599643477874-c8c3e8093d58?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} alt="Quality inspection 1" />
              <img src={qcData.imageUrl2 || "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"} alt="Quality inspection 2" />
            </div>
          </div>

          {/* Delivery */}
          <div className="process-row grid-2-col-reverse">
            <div className="image-single mobile-order-2">
              <img src={deliveryData.imageUrl || "https://images.unsplash.com/photo-1605100804763-247f67b2548e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt="Delivery Ring Display" />
            </div>
            <div className="text-content mobile-order-1">
              <h2 dangerouslySetInnerHTML={{ __html: deliveryData.heading || 'Delivery' }}></h2>
              <hr className="section-divider" />
              <p dangerouslySetInnerHTML={{ __html: deliveryData.para1 || 'Your collection arrives ready to impress. Packaged with care and delivered on time, every order from Hastmilap reflects the trust you place in us. We understand that your timelines matter and your customers cannot wait. That is why we treat every delivery with the same urgency and precision we bring to every design.' }}></p>
              <p dangerouslySetInnerHTML={{ __html: deliveryData.para2 || 'From idea to delivery, we are with you at every step. At Hastmilap our creative process is built around one goal. To give your brand jewelry that your customers will love and your business will be proud of. We do not just manufacture pieces. We craft experiences, stories and happiness, one collection at a time.' }}></p>
            </div>
          </div>
        </main>
        <Footer content={content} />
      </div>
    </>
  );
};

export default CreativeProcess;
