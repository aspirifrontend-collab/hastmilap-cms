const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/hastmilap-cms';

const contentSchema = new mongoose.Schema({
  section: { type: String, required: true, unique: true },
  data: { type: Object, required: true }
});

const Content = mongoose.models.Content || mongoose.model('Content', contentSchema);

async function addPhilosophy() {
  await mongoose.connect(MONGODB_URI);
  
  let ourPhilosophy = await Content.findOne({ section: 'ourPhilosophy' });
  if (!ourPhilosophy) {
    ourPhilosophy = new Content({
      section: 'ourPhilosophy',
      data: {
        title: 'Our Values & Philosophy',
        desc1: 'The finest jewelry does not just catch the eye. It touches the heart. At Hastmilap our vision is to be the world\'s most trusted jewelry manufacturing partner creating pieces that go beyond beauty and carry meaning, emotion and happiness to every person who wears them. That is what "Wear Happiness" means to us.',
        desc2: 'It is not just a thought. It is the standard we hold every design, every detail and every delivery to. When your customers wear Hastmilap they do not just wear jewelry. They wear a moment, a memory and a feeling that stays with them.',
        desc3: 'That is the promise we make to you and to every customer you serve.',
        imageUrl: 'https://placehold.co/800x800/cccccc/333333?text=Philosophy+Image',
        mobileImageUrl: ''
      }
    });
    await ourPhilosophy.save();
    console.log('Added ourPhilosophy section');
  } else {
    if (!ourPhilosophy.data.imageUrl) ourPhilosophy.data.imageUrl = 'https://placehold.co/800x800/cccccc/333333?text=Philosophy+Image';
    if (!ourPhilosophy.data.mobileImageUrl) ourPhilosophy.data.mobileImageUrl = '';
    ourPhilosophy.markModified('data');
    await ourPhilosophy.save();
    console.log('Updated ourPhilosophy section');
  }

  // Also check if ourValues is missing fields
  let ourValues = await Content.findOne({ section: 'ourValues' });
  if (ourValues) {
    if (!ourValues.data.visionMobileImageUrl) ourValues.data.visionMobileImageUrl = '';
    if (!ourValues.data.missionMobileImageUrl) ourValues.data.missionMobileImageUrl = '';
    ourValues.markModified('data');
    await ourValues.save();
    console.log('Updated ourValues');
  }

  // Check leadership mobile image
  let leadership = await Content.findOne({ section: 'leadership' });
  if (leadership) {
    if (!leadership.data.mobileImageUrl) leadership.data.mobileImageUrl = '';
    leadership.markModified('data');
    await leadership.save();
    console.log('Updated leadership');
  }

  console.log('Done');
  mongoose.disconnect();
}

addPhilosophy();
