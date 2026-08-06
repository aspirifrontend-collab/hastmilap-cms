const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Content = require('./models/Content');
const User = require('./models/User');

const defaultContent = [
  {
    section: 'header',
    data: { 
      logoImageUrl: 'assets/images/logo.png',
      nav1Text: 'Company', nav1Link: '#about',
      nav2Text: 'Collection', nav2Link: '#styles',
      nav3Text: 'Categories', nav3Link: '#vision',
      nav4Text: 'Why Hastmilap', nav4Link: '#strengths',
      nav5Text: 'Contact', nav5Link: '#footer',
      profileLink: '/login'
    }
  },
  {
    section: 'hero',
    data: { videoUrl: 'assets/videos/hero.mp4', mobileImageUrl: 'assets/images/hero_mobile.png' }
  },
  {
    section: 'strengths',
    data: {
      title: "Hastmilap's Core Strengths",
      diamondImageUrl: 'assets/images/diamonds_decoration.png',
      stat1Number: '20', stat1Suffix: '', stat1Label: 'Years of Experience',
      stat2Number: '7', stat2Suffix: '+', stat2Label: 'Exporting Countries',
      stat3Number: '150', stat3Suffix: ' Cr+', stat3Label: 'Annual Turnover',
      stat4Number: '2', stat4Suffix: '', stat4Label: 'Manufacturing Facilities',
      stat5Number: '250', stat5Suffix: '+', stat5Label: 'Employees'
    }
  },
  {
    section: 'about',
    data: {
      imageUrl1: 'assets/images/about_necklace.jpg',
      imageUrl2: 'assets/images/about_showroom.jpg',
      years: '20 Years',
      excellence: 'of Crafting Excellence',
      description1: 'For over 20 years, Hastmilap has been the trusted manufacturing partner for jewelry retailers worldwide. We bring together skilled artisans, cutting-edge technology, and modern design to deliver pieces of exceptional quality, precision, and elegance. So your collection always stands out, and your business never stops growing.'
    }
  },
  {
    section: 'design',
    data: {
      titleLine1: 'Design Studio',
      titleLine2: 'Innovation',
      description: "Hastmilap Design Studio was born in Surat, the jewelry capital of India. Today, we partner with brands across the world, delivering finely crafted, fully customized jewelry that represents your brand's identity and meets your highest standards.",
      imageUrl1: 'assets/images/ds_sketch.jpg',
      imageUrl2: 'assets/images/ds_machine.jpg'
    }
  },
  {
    section: 'global',
    data: {
      title: 'India To The World',
      description: 'Hastmilap exports jewelry to seven countries, partnering with brands across India and global markets.',
      badgeImageUrl: 'assets/images/global_badge.png',
      flag1Url: 'https://flagcdn.com/us.svg', flag1Name: 'USA',
      flag2Url: 'https://flagcdn.com/il.svg', flag2Name: 'Israel',
      flag3Url: 'https://flagcdn.com/eu.svg', flag3Name: 'Europe',
      flag4Url: 'https://flagcdn.com/ae.svg', flag4Name: 'Dubai',
      flag5Url: 'https://flagcdn.com/tr.svg', flag5Name: 'Turkey',
      flag6Url: 'https://flagcdn.com/be.svg', flag6Name: 'Belgium',
      flag7Url: 'https://flagcdn.com/hk.svg', flag7Name: 'Hong-Kong'
    }
  },
  {
    section: 'marquee',
    data: {
      mainText: 'Hastmilap',
      subText: "World's Finest Jewellery",
      ringImageUrl: 'assets/images/ring_marquee.png'
    }
  },
  {
    section: 'faq',
    data: { 
      title: 'OUR UNIQUE EDGE',
      imageUrl: 'assets/images/faq_woman.jpg',
      faq1Question: 'What products does Hastmilap manufacture?',
      faq1Answer: 'We manufacture fine jewelry in 9K, 10K, 14K, 18K, 22K Gold, along with Natural Diamonds, Lab-Grown Diamonds, Gold Vermeil, and Sterling Silver collections. From timeless classics to trend-driven designs, we cater to global retail brands and wholesalers.',
      faq2Question: 'Is Hastmilap a fully integrated manufacturer?',
      faq2Answer: 'Yes, we are a fully integrated manufacturer, handling everything from design and casting to setting and polishing in-house.',
      faq3Question: 'Can you manufacture custom jewelry designs?',
      faq3Answer: 'Yes, we offer OEM and ODM services to manufacture custom designs tailored to your brand.',
      faq4Question: 'What quality standards do you follow?',
      faq4Answer: 'We adhere to stringent international quality standards, ensuring precision and excellence in every piece.',
      faq5Question: 'Do you work with international brands?',
      faq5Answer: 'Absolutely, we export our products to over 7 countries and partner with leading international retail brands.'
    }
  },
  {
    section: 'banner',
    data: { 
      imageUrl: 'assets/images/about_hastmilap_banner.jpg',
      mobileImageUrl: 'assets/images/about_hastmilap_banner_mobile.jpg',
      linkUrl: ''
    }
  },
    {
      section: 'categories',
      data: {
        title: 'Explore Our Categories',
        cat1Label: 'Natural Diamond Jewelry', cat1ImageUrl: 'assets/images/vision_natural.png',
        cat2Label: 'Lab Grown Diamond Jewelry', cat2ImageUrl: 'assets/images/vision_lab.png',
        cat3Label: 'Light Weight Jewelry', cat3ImageUrl: 'assets/images/vision_light.png',
        cat4Label: 'Light Weight Jewelry', cat4ImageUrl: 'assets/images/vision_light.png',
        cat5Label: '', cat5ImageUrl: '',
        cat6Label: '', cat6ImageUrl: ''
      }
    },
  {
    section: 'tech',
    data: {
      title: 'Technology & Innovation',
      description: 'From advanced 3D CAD modeling to the final master setting, we redefine the boundaries of jewelry excellence through precision and artistry.',
      ctaText: 'Innovate with us',
      ctaLink: '#contact',
      panel1ImageUrl: 'assets/images/tech_tl.png', panel1Alt: 'Wax Prototyping',
      panel2ImageUrl: 'assets/images/tech_tr.png', panel2Alt: 'Molten Gold Process',
      panel3ImageUrl: 'assets/images/tech_bl.png', panel3Alt: 'Expert Craftsmanship',
      panel4ImageUrl: 'assets/images/tech_br.png', panel4Alt: 'Diamond Setting'
    }
  },
  {
    section: 'ourStory',
    data: {
      subtitle: 'Our Story',
      title: 'Deep Roots, Unfettered Imagination',
      imageUrl: 'https://placehold.co/1000x400/999999/ffffff?text=Our+Story+Image'
    }
  },
  {
    section: 'ourLegacy',
    data: {
      subtitle: 'Our Legacy',
      title: 'The World Of Jewelry And The Evolving New Consumer',
      description: 'Twenty years is not just a number. It is thousands of designs, hundreds of partnerships and millions of pieces crafted with care, precision and purpose. From our roots in Surat to brands and retailers across 7 countries, our legacy is written in the trust of every partner we serve and the happiness of every customer who wears our jewelry.'
    }
  },
  {
    section: 'storyName',
    data: {
      title: 'The Story Of Our Name',
      desc1: 'Hastmilap means the meeting of hands. It is the moment a skilled artisan\'s hand meets raw material, where a designer\'s hand meets a brand\'s vision and where craftsmanship meets purpose. That belief has guided us for over 20 years.',
      desc2: 'Founded in Surat, the heart of India\'s jewelry industry, Hastmilap was built on one idea — that the best jewelry is born when the right hands come together. Today we bring that belief to brands and retailers across 7 countries, delivering fully customized jewelry designed around your vision and manufactured to the highest standards.',
      imageUrl: 'https://placehold.co/1000x350/999999/ffffff?text=Team+Image'
    }
  },
  {
    section: 'ourValues',
    data: {
      title: 'Our Values & Philosophy',
      desc1: 'The finest jewelry does not just catch the eye. It touches the heart. At Hastmilap our vision is to be the world\'s most trusted jewelry manufacturing partner creating pieces that go beyond beauty and carry meaning, emotion and happiness to every person who wears them. That is what “Wear Happiness” means to us.',
      desc2: 'It is not just a thought. It is the standard we hold every design, every detail and every delivery to. When your customers wear Hastmilap they do not just wear jewelry. They wear a moment, a memory and a feeling that stays with them.',
      desc3: 'That is the promise we make to you and to every customer you serve.',
      imageUrl: 'https://placehold.co/800x800/d6c8b8/333333?text=Jewelry+Image'
    }
  },
  {
    section: 'leadership',
    data: {
      title: 'Meet The Leadership',
      intro: 'We are united by a singular vision, to never stop bringing a new point of view to the table. Our headquarters in India house some of the best talent in product design and the latest technologies, skilled craftsmanship, artists, writers and poets.',
      role: 'FOUNDER & MANAGING DIRECTOR',
      name: 'Mr. Vishal Dholiya',
      desc1: 'Driven by passion and 2 decades of industry expertise, Mr. Vishal Dholiya built Hastmilap on one powerful belief. That jewelry should do more than shine. It should make people feel something. That belief became Wear Happiness, the philosophy that drives every decision, every design and every partnership at Hastmilap.',
      desc2: 'Under his leadership, Hastmilap has grown from a passionate studio in Surat into a globally trusted jewelry manufacturing partner, serving brands across 7 countries with craftsmanship, precision and purpose.',
      imageUrl: 'https://placehold.co/600x750/cccccc/333333?text=Leadership+Portrait'
    }
  },
  {
    section: 'stats',
    data: {
      title: 'A Collection Of Leaders, Creators And Innovators',
      desc: 'Crafting a meaningful response to the jewelry creation process with of innovation and design thinking.',
      stat1Value: '20',
      stat1Label: 'Years of Experience',
      stat2Value: '7+',
      stat2Label: 'Exporting Countries',
      stat3Value: '2',
      stat3Label: 'Manufacturing Facilities',
      stat4Value: '250+',
      stat4Label: 'Employees'
    }
  },
  {
    section: 'news',
    data: {
      desktopTitle: 'IN THE NEWS',
      mobileTitle: 'Sustainability',
      image1Url: 'assets/images/news1.png', image1Link: '#',
      image2Url: 'assets/images/news2.png', image2Link: '#',
      image3Url: 'assets/images/news3.png', image3Link: '#',
      description: 'Every milestone tells a story. Every feature reflects our pursuit of excellence. Discover how Hastmilap continues to shape the future of fine jewelry manufacturing through innovation, craftsmanship and global partnerships.'
    }
  },

  {
    section: 'instagram',
    data: {
      subtitle: 'WOLD FOLLOWING US',
      title: 'Instagram',
      videoUrl1: 'assets/videos/instagram/(1).mp4', videoLabel1: 'Hastmilap',
      videoUrl2: 'assets/videos/instagram/07-06.mp4', videoLabel2: 'Hastmilap',
      videoUrl3: 'assets/videos/instagram/2999 14-08.mp4', videoLabel3: 'Hastmilap',
      videoUrl4: 'assets/videos/instagram/3099 22-08.mp4', videoLabel4: 'Hastmilap',
      videoUrl5: 'assets/videos/instagram/3314 05-09.mp4', videoLabel5: 'Hastmilap',
      videoUrl6: 'assets/videos/instagram/3357 10-09.mp4', videoLabel6: 'Hastmilap',
      videoUrl7: 'assets/videos/instagram/EXPORT VIDEO-3.mp4', videoLabel7: 'Hastmilap',
      videoUrl8: 'assets/videos/instagram/Final 02.mp4', videoLabel8: 'Hastmilap'
    }
  },
  {
    section: 'footer',
    data: {
      newsletterTitle: 'GET IN TOUCH',
      newsletterDesc: 'Subscribe to our newsletter for the latest updates and exclusive offers!',
      address: '2nd Floor, Varna House, Lal Darwaja, Station Road, Surat-395003',
      phone: '+91 93288 38787',
      email: 'hello@hastmilap.com',
      instagramUrl: 'https://www.instagram.com/hastmilapjewels/',
      facebookUrl: 'https://www.facebook.com/hastmilappl',
      pinterestUrl: 'https://in.pinterest.com/hastmilapsurat/',
      linkedinUrl: 'https://www.linkedin.com/company/hastmilapjewels/',
      youtubeUrl: 'https://www.youtube.com/'
    }
  },
  {
    section: 'b2bHero',
    data: {
      imageUrl: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
    }
  },
  {
    section: 'b2bInsights',
    data: {
      heading: 'Industry Vision.<br />Expert Craftsmanship.<br />Meaningful Connections.',
      bodyText: 'At Walking Tree, we assist retail partners in maintaining their competitive edge by offering jewelry designs that adapt to the modern consumer. By reimagining traditional techniques, cuts, categories, and colors, we produce contemporary collections that resonate with today\'s audience. Our design studio relies on sharp consumer insights to create pieces that perfectly align with modern lifestyle demands.',
      imageUrl: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  },
  {
    section: 'b2bUnrounds',
    data: {
      heading: 'Unrounds',
      subtitle: 'Revealing New Facets',
      bodyText: 'While the classic round cut is widely celebrated for its beauty, we push the boundaries by harnessing the power of fancy-cut diamonds. This creates distinctive pieces that stand as a mark of individuality and creativity. We celebrate shapes beyond the traditional, giving them previously unrecognized stature. From daily wear to exclusive designer pieces, this collection sets us apart, providing retailers with an updated assortment to meet contemporary demands.',
      imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b6348e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    }
  },
  {
    section: 'b2bHeritage',
    data: {
      heading: 'Heritage: Renaissance',
      subtitle: 'Where Tradition Meets Modernity',
      bodyText: 'Merging the rich heritage of traditional Indian finery with contemporary style, this legacy collection offers stunning, lightweight jewelry. The intricate detailing combined with modern aesthetics allows for versatile pieces suitable for both casual and formal wear. It serves as a beautiful reminder of our roots while fully embracing the fashion trends of the times.',
      imageUrl: 'https://images.unsplash.com/photo-1599643478524-fb52490715b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  },
  {
    section: 'b2bAureate',
    data: {
      heading: 'Aureate',
      subtitle: 'Infusing Classics With Vibrant Hues',
      bodyText: 'We have reimagined fine jewelry by introducing a wide array of colors through a unique collection of gemstones. Featuring bold designs and interesting forms, each piece remains light, flexible, and wearable. Extensive hours of cutting and polishing ensure that every custom stone meets our strict quality standards for shape, color, and sparkle.',
      leftImgUrl: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rightImg1Url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rightImg2Url: 'https://images.unsplash.com/photo-1602173574767-37ac01994b4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  },
  {
    section: 'b2bAesthete',
    data: {
      heading: 'Aesthete',
      subtitle: 'Celebrating Master Craftsmanship',
      bodyText: 'Representing the perfect blend of engineering, craft, and design, this signature collection celebrates timeless luxury. Crafted from the rarest materials by highly skilled artisans over hundreds of hours, each masterpiece delivers uncontested international caliber for the most discerning audiences.',
      imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
    }
  },
  {
    section: 'b2bPrivateLabel',
    data: {
      privateSubtitle: 'Private Label Services',
      privateHeading: 'From Offering The Whole Bouquet To Standalone Design And Manufacturing Services',
      privateBody: 'As a full-stack design studio, we understand that every partner has unique challenges. We collaborate closely with retailers to build a completely customized showcase that captures their distinct aesthetic. By plugging into industry insights, we design and manufacture dedicated key lines for leading retail brands.',
      harmonyHeading: 'Harmony',
      harmonySubtitle: 'Our Collections',
      harmonyBody: 'A premium assortment of diamond jewelry designed exclusively for top-tier retail partners, complete with comprehensive marketing collateral, lookbooks, and promotional videos. Merging the heritage finery of India with modern style, this collection offers stunning, lightweight jewelry.',
      slide1ImgUrl: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      slide1Caption: 'Pink Premium',
      slide2ImgUrl: 'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      slide2Caption: 'Nature Collection',
      slide3ImgUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      slide3Caption: 'Visit Store'
    }
  },
  {
    section: 'b2bUniqueInsight',
    data: {
      heading: 'A Unique Insight',
      subtitle: 'Retail Intelligence',
      bodyText: 'Walking Tree we have a stimulating retail space where we showcase all our designs in a highly immersive experience geared towards our modern day shopper. This is where we gain insights and identify emerging trends, that help us create a distinctive style and keep our product mix relevant for consumers and retailers alike.',
      rightImgUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      leftImgUrl: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  },
  {
    section: 'cpHero',
    data: {
      title: 'Our Creative Process',
      text: 'At Hastmilap, every piece of jewelry begins long before the first sketch is drawn. It begins with a conversation, a vision and a deep understanding of what your brand stands for.',
      bgImageUrl: 'https://ik.imagekit.io/kqkm4unsy/hastmilap/Banner1_hCsNsgsMo.png',
      mobileBgImageUrl: 'https://ik.imagekit.io/kqkm4unsy/hastmilap/Banner1_0ERKCykEcX.png'
    }
  },
  {
    section: 'cpDiscovery',
    data: {
      heading: 'Discovery',
      para1: 'With the wearer at the centre of our world, every jewel crafted by a Walking Tree brand will always have one thing in common. It is precious first because of the meaning it holds.',
      para2: 'Every design finds its inspiration in real, personal, intimately-shared insights. These true stories and precious moments are brought to life in every facet through a combination of exceptional skill and thoughtful design.',
      para3: 'Our studios house some of the best talent in product design, who work in tandem with a world-class team of craftsmen, artists, visualisers, writers, poets, photographers, digital experts and innovators. Each piece is therefore a culmination of study, research and passion to be ahead of the curve.',
      imageUrl1: 'https://ik.imagekit.io/kqkm4unsy/hastmilap/1_AjjmN337z7.png',
      imageUrl2: 'https://ik.imagekit.io/kqkm4unsy/hastmilap/2_Adp6uMMNJ.png',
      imageUrl3: 'https://ik.imagekit.io/kqkm4unsy/hastmilap/3_ueAiaxPby.png'
    }
  },
  {
    section: 'cpConcept',
    data: {
      heading: 'Concept & Design',
      para1: 'Once we understand your vision, our designers get to work. Using a blend of artistic intuition and market insight, we develop concept sketches and mood boards that capture the essence of your collection. Every line, curve and detail is considered with purpose. We design jewelry that not only looks beautiful but tells a story your customers will connect with.',
      imageUrl1: 'https://ik.imagekit.io/kqkm4unsy/hastmilap/4_cNJdMfcG8.png',
      imageUrl2: 'https://ik.imagekit.io/kqkm4unsy/hastmilap/5_x9PEq9u3-q.png',
      imageUrl3: 'https://ik.imagekit.io/kqkm4unsy/hastmilap/6_t_vk3V_u_.png'
    }
  },
  {
    section: 'cp3dModelling',
    data: {
      heading: '3D Modelling',
      para1: 'Concept becomes reality through our advanced 3D design process. Our skilled designers translate every sketch into a precise 3D model, allowing you to see exactly how your piece will look before a single gram of metal is used. This stage ensures complete accuracy, eliminating guesswork and giving you full confidence in the final design.',
      imageUrl: 'https://ik.imagekit.io/kqkm4unsy/hastmilap/7_IHrvU5VEp.png'
    }
  },
  {
    section: 'cpPrototyping',
    data: {
      heading: 'Prototyping',
      para1: 'Using cutting-edge 3D printing technology, we bring your design to life in physical form. Our prototypes are crafted with exceptional detail and precision, giving you a real feel for the piece before full production begins. This stage allows for refinement, adjustment and perfection, ensuring the final product exceeds your expectations.',
      imageUrl: 'https://ik.imagekit.io/kqkm4unsy/hastmilap/8_FBh5aZSpkM.png'
    }
  },
  {
    section: 'cpManufacturing',
    data: {
      heading: 'Manufacturing',
      para1: 'Once the design is approved, our master artisans and CNC manufacturing technology work in harmony to produce your jewelry to the highest standards. Every piece is crafted with care, skill and uncompromising attention to detail. Whether you require a single custom piece or a full production run, our manufacturing process delivers consistency, quality and excellence every time.',
      imageUrlMain: 'https://ik.imagekit.io/kqkm4unsy/hastmilap/9_CrOPglEufu.png',
      imageUrlInline: 'https://ik.imagekit.io/kqkm4unsy/hastmilap/10_K4GvwjGb_.png'
    }
  },
  {
    section: 'cpQuality',
    data: {
      heading: 'Quality Control',
      para1: 'At Hastmilap, quality is not a final step. It is present at every stage of our process. Before any piece leaves our studio, it goes through a rigorous quality control inspection, measured against the highest standards of finish, durability and design accuracy. Only when a piece meets our standard does it carry the Hastmilap promise.',
      imageUrl1: 'https://ik.imagekit.io/kqkm4unsy/hastmilap/11_YQED9eOVn.png',
      imageUrl2: 'https://ik.imagekit.io/kqkm4unsy/hastmilap/12_UwiOJK0ZO.png'
    }
  },
  {
    section: 'cpDelivery',
    data: {
      heading: 'Delivery',
      para1: 'Your collection arrives ready to impress. Packaged with care and delivered on time, every order from Hastmilap reflects the trust you place in us. We understand that your timelines matter and your customers cannot wait. That is why we treat every delivery with the same urgency and precision we bring to every design.',
      para2: 'From idea to delivery, we are with you at every step. At Hastmilap our creative process is built around one goal. To give your brand jewelry that your customers will love and your business will be proud of. We do not just manufacture pieces. We craft experiences, stories and happiness, one collection at a time.',
      imageUrl: 'https://ik.imagekit.io/kqkm4unsy/hastmilap/13_S1QZ8G2kp.png'
    }
  }
];

mongoose.connect('mongodb://127.0.0.1:27017/hastmilap-cms')
  .then(async () => {
    console.log('Connected to MongoDB');
    await Content.deleteMany({});
    await Content.insertMany(defaultContent);

    // Seed admin user
    await User.deleteMany({});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('hastmilap123', salt);
    await User.create({
      username: 'admin',
      password: hashedPassword
    });

    console.log('Database seeded fully with content and admin user');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Connection error', err);
  });
