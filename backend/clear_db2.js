const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const contentSchema = new mongoose.Schema({
  section: { type: String, required: true, unique: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true }
});

const Content = mongoose.model('Content', contentSchema);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Connected to MongoDB');
  await Content.deleteMany({ section: { $in: ['ourStory', 'ourLegacy', 'storyName', 'ourValues', 'leadership', 'stats'] } });
  console.log('Cleared new Our Story schemas');
  process.exit();
}).catch(err => console.log(err));
