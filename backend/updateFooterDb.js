const mongoose = require('mongoose');
require('dotenv').config();
const Content = require('./models/Content');

mongoose.connect('mongodb://127.0.0.1:27017/hastmilap-cms').then(async () => {
  console.log('Connected to MongoDB');
  const footerData = await Content.findOne({ section: 'footer' });
  if (footerData) {
    let data = footerData.data || {};
    data = {
      ...data,
      locationIconUrl: data.locationIconUrl || '',
      phoneIconUrl: data.phoneIconUrl || '',
      emailIconUrl: data.emailIconUrl || '',
      calendarIconUrl: data.calendarIconUrl || '',
      clockIconUrl: data.clockIconUrl || '',
    };
    footerData.data = data;
    footerData.markModified('data');
    await footerData.save();
    console.log('Footer updated successfully');
  } else {
    console.log('Footer document not found');
  }
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
