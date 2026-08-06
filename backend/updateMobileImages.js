const mongoose = require('mongoose');
require('dotenv').config();
const Content = require('./models/Content');

mongoose.connect('mongodb://127.0.0.1:27017/hastmilap-cms').then(async () => {
  console.log('Connected to MongoDB');
  
  const sectionsToUpdate = [
    { name: 'ourLegacy', fields: ['mobileImageUrl'] },
    { name: 'storyName', fields: ['mobileImageUrl'] },
    { name: 'ourValues', fields: ['visionMobileImageUrl', 'missionMobileImageUrl'] },
    { name: 'ourPhilosophy', fields: ['mobileImageUrl'] },
    { name: 'leadership', fields: ['mobileImageUrl'] },
    { name: 'cpHero', fields: ['mobileBgImageUrl'] }
  ];

  for (const item of sectionsToUpdate) {
    const doc = await Content.findOne({ section: item.name });
    if (doc) {
      let data = doc.data || {};
      for (const field of item.fields) {
        if (data[field] === undefined) {
          data[field] = '';
        }
      }
      doc.data = data;
      doc.markModified('data');
      await doc.save();
      console.log(item.name + ' updated successfully');
    }
  }

  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
