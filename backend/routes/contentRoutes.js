const express = require('express');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Content = require('../models/Content');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const ImageKit = require('imagekit');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// Multer storage setup
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

// Get all content
router.get('/content', async (req, res) => {
  try {
    const contents = await Content.find();
    // Convert array to object keyed by section name
    const data = {};
    contents.forEach(c => {
      data[c.section] = c.data;
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update specific section content
router.put('/content/:section', authMiddleware, async (req, res) => {
  try {
    const { section } = req.params;
    const { data } = req.body;
    console.log(`[UPDATE] Received update for ${section}`);

    let content = await Content.findOne({ section });
    if (!content) {
      content = new Content({ section, data });
    } else {
      content.data = data;
      content.markModified('data');
    }
    await content.save();
    
    console.log(`[UPDATE SUCCESS] Updated ${section}`);
    res.json(content);
  } catch (err) {
    console.error(`[UPDATE ERROR]`, err.message);
    res.status(500).json({ error: err.message });
  }
});

// Upload file
router.post('/upload', authMiddleware, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const isVideo = req.file.mimetype.startsWith('video/');

  if (isVideo) {
    // Upload video to Cloudinary
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'video', folder: 'hastmilap' },
      (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'Upload to Cloudinary failed' });
        }
        res.json({ url: result.secure_url });
      }
    );
    stream.end(req.file.buffer);
  } else {
    // Upload image to ImageKit
    imagekit.upload({
      file: req.file.buffer, // required, from memory storage
      fileName: req.file.originalname, // required
      folder: '/hastmilap' // optional
    }, function(error, result) {
      if(error) {
        console.log(error);
        return res.status(500).json({ error: 'Upload to ImageKit failed' });
      }
      res.json({ url: result.url });
    });
  }
});

module.exports = router;
