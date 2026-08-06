require('dotenv').config();
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

imagekit.listFiles({
  skip: 0,
  limit: 100
}, function(error, result) {
  if (error) console.log(error);
  else {
    const urls = result.map(f => f.url);
    console.log(urls.join('\n'));
  }
});
