const mongoose = require('mongoose');
require('dotenv').config();
const Content = require('./models/Content');

mongoose.connect('mongodb://127.0.0.1:27017/hastmilap-cms').then(async () => {
  console.log('Connected to MongoDB');
  const techData = await Content.findOne({ section: 'tech' });
  if (techData) {
    let data = techData.data || {};
    data = {
      ...data,
      title: data.title || 'Technology & Innovation',
      description: data.description || 'From advanced 3D CAD modeling to the final master setting, we redefine the boundaries of jewelry excellence through precision and artistry.',
      buttonText: data.buttonText || 'Innovate with us',
      buttonLink: data.buttonLink || '#contact',
    };
    techData.data = data;
    techData.markModified('data');
    await techData.save();
    console.log('Tech updated successfully');
  } else {
    console.log('Tech document not found');
  }
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
