const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/hastmilap-cms';

const contentSchema = new mongoose.Schema({
  section: { type: String, required: true, unique: true },
  data: { type: Object, required: true }
});

const Content = mongoose.models.Content || mongoose.model('Content', contentSchema);

async function updateDB() {
  await mongoose.connect(MONGODB_URI);
  
  // 1. Update Hero
  let hero = await Content.findOne({ section: 'hero' });
  if (hero) {
    if (!hero.data.mediaType) hero.data.mediaType = 'video';
    if (!hero.data.imageUrl) hero.data.imageUrl = 'assets/images/hero.jpg';
    if (!hero.data.mobileImageUrl) hero.data.mobileImageUrl = 'assets/images/hero_mobile.png';
    if (!hero.data.videoUrl) hero.data.videoUrl = 'assets/videos/desktop_hero.mp4';
    if (!hero.data.mobileVideoUrl) hero.data.mobileVideoUrl = 'assets/videos/mobile_hero.mp4';
    
    hero.markModified('data');
    await hero.save();
    console.log('Hero updated');
  }
  
  // 2. Update Our Story
  let ourStory = await Content.findOne({ section: 'ourStory' });
  if (ourStory) {
    if (!ourStory.data.mediaType) ourStory.data.mediaType = 'image';
    if (!ourStory.data.imageUrl) ourStory.data.imageUrl = 'https://placehold.co/1000x400/999999/ffffff?text=Our+Story+Image';
    if (!ourStory.data.mobileImageUrl) ourStory.data.mobileImageUrl = '';
    if (!ourStory.data.videoUrl) ourStory.data.videoUrl = '';
    if (!ourStory.data.mobileVideoUrl) ourStory.data.mobileVideoUrl = '';
    
    ourStory.markModified('data');
    await ourStory.save();
    console.log('Our Story updated');
  }
  
  // 3. Update Editorial
  let editorial = await Content.findOne({ section: 'editorial' });
  if (editorial) {
    if (!editorial.data.mediaType) editorial.data.mediaType = 'video';
    if (!editorial.data.imageUrl) editorial.data.imageUrl = 'assets/images/editorial.jpg';
    if (!editorial.data.videoUrl) editorial.data.videoUrl = 'assets/videos/editorial.mp4';
    
    editorial.markModified('data');
    await editorial.save();
    console.log('Editorial updated');
  }

  console.log('Done');
  mongoose.disconnect();
}

updateDB();
