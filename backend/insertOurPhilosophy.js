const mongoose = require('mongoose');
require('dotenv').config();
const Content = require('./models/Content');

mongoose.connect('mongodb://127.0.0.1:27017/hastmilap-cms').then(async () => {
  console.log('Connected to MongoDB');
  
  const existing = await Content.findOne({ section: 'ourPhilosophy' });
  if (!existing) {
    const newSection = new Content({
      section: 'ourPhilosophy',
      data: {
        title: 'Our Values & Philosophy',
        desc1: "The finest jewelry does not just catch the eye. It touches the heart. At Hastmilap our vision is to be the world's most trusted jewelry manufacturing partner creating pieces that go beyond beauty and carry meaning, emotion and happiness to every person who wears them. That is what “Wear Happiness” means to us.",
        desc2: "It is not just a thought. It is the standard we hold every design, every detail and every delivery to. When your customers wear Hastmilap they do not just wear jewelry. They wear a moment, a memory and a feeling that stays with them.",
        desc3: "That is the promise we make to you and to every customer you serve.",
        imageUrl: "assets/images/jewelry.jpg"
      }
    });
    await newSection.save();
    console.log('ourPhilosophy created successfully');
  } else {
    console.log('ourPhilosophy already exists');
  }

  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
