const mongoose = require('mongoose');
require('dotenv').config();
const Content = require('./models/Content');

mongoose.connect('mongodb://127.0.0.1:27017/hastmilap-cms').then(async () => {
  console.log('Connected to MongoDB');
  const bannerData = await Content.findOne({ section: 'banner' });
  if (bannerData) {
    let data = bannerData.data || {};
    data = {
      ...data,
      overlayTitle: data.overlayTitle || 'HASTMILAP',
      overlaySubtitle: data.overlaySubtitle || 'WEAR HAPPINESS ALWAYS SMILE...!',
      buttonText: data.buttonText || 'Learn More About our Journey',
      buttonLink: data.buttonLink || '/our-story',
    };
    bannerData.data = data;
    bannerData.markModified('data');
    await bannerData.save();
    console.log('Banner updated successfully');
  } else {
    console.log('Banner document not found');
  }
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
