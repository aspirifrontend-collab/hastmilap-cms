const ImageKit = require('imagekit');
const dotenv = require('dotenv');
dotenv.config();

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
    result.forEach(f => console.log(f.url));
  }
});
