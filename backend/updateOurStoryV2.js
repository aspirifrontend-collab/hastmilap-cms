const mongoose = require('mongoose');
require('dotenv').config();
const Content = require('./models/Content');

mongoose.connect('mongodb://127.0.0.1:27017/hastmilap-cms').then(async () => {
  console.log('Connected to MongoDB');
  
  // 1. Update ourLegacy
  const legacyData = await Content.findOne({ section: 'ourLegacy' });
  if (legacyData) {
    let data = legacyData.data || {};
    data = {
      ...data,
      imageUrl: data.imageUrl || 'assets/images/building.png',
    };
    legacyData.data = data;
    legacyData.markModified('data');
    await legacyData.save();
    console.log('ourLegacy updated successfully');
  }

  // 2. Update ourValues
  const valuesData = await Content.findOne({ section: 'ourValues' });
  if (valuesData) {
    // We are replacing desc1, desc2, desc3 with the new fields
    const data = {
      visionTitle: 'OUR VISION',
      visionDesc: "To become the world's most trusted jewellery manufacturing partner by setting new benchmarks in craftsmanship, innovation, and responsible manufacturing while proudly showcasing India's excellence on the global stage.",
      visionImageUrl: valuesData.data.imageUrl || 'assets/images/vision.png',
      missionTitle: 'OUR MISSION',
      missionDesc: "At Hastmilap, our mission is to transform ideas into exceptional jewellery through advanced manufacturing, precision engineering, and skilled craftsmanship. We are committed to delivering uncompromising quality, fostering long-term partnerships, empowering our people, embracing sustainable practices, and continuously innovating to shape the future of the global jewellery industry.",
      missionImageUrl: 'assets/images/mission.png'
    };
    valuesData.data = data;
    valuesData.markModified('data');
    await valuesData.save();
    console.log('ourValues updated successfully');
  }

  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
