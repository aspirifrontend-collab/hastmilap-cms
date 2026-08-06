const mongoose = require('mongoose');
require('dotenv').config();
const Content = require('./models/Content');

mongoose.connect('mongodb://127.0.0.1:27017/hastmilap-cms').then(async () => {
  console.log('Connected to MongoDB');
  const footerData = await Content.findOne({ section: 'footer' });
  if (footerData) {
    let data = footerData.data || {};
    
    // Copy URL values to LINK if they exist
    if (data.instagramUrl && !data.instagramLink) data.instagramLink = data.instagramUrl;
    if (data.facebookUrl && !data.facebookLink) data.facebookLink = data.facebookUrl;
    if (data.pinterestUrl && !data.pinterestLink) data.pinterestLink = data.pinterestUrl;
    if (data.linkedinUrl && !data.linkedinLink) data.linkedinLink = data.linkedinUrl;
    if (data.youtubeUrl && !data.youtubeLink) data.youtubeLink = data.youtubeUrl;

    // Delete the old 'Url' fields that are causing the duplicate upload buttons
    delete data.instagramUrl;
    delete data.facebookUrl;
    delete data.pinterestUrl;
    delete data.linkedinUrl;
    delete data.youtubeUrl;

    footerData.data = data;
    footerData.markModified('data');
    await footerData.save();
    console.log('Footer cleaned successfully');
  } else {
    console.log('Footer document not found');
  }
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
