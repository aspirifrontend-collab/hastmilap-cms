const mongoose = require('mongoose');
require('dotenv').config();
const Content = require('./models/Content');

mongoose.connect('mongodb://127.0.0.1:27017/hastmilap-cms').then(async () => {
  console.log('Connected to MongoDB');
  const storyData = await Content.findOne({ section: 'ourStory' });
  if (storyData) {
    let data = storyData.data || {};
    data = {
      ...data,
      mediaType: data.mediaType || 'image',
      videoUrl: data.videoUrl || '',
    };
    storyData.data = data;
    storyData.markModified('data');
    await storyData.save();
    console.log('ourStory updated successfully');
  } else {
    console.log('ourStory document not found');
  }
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
