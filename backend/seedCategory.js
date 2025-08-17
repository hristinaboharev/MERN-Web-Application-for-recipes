const mongoose = require('mongoose');
const Category = require('./models/Category'); // putanja do modela
require('dotenv').config();

const categories = [
  { naziv: 'Doručak' },
  { naziv: 'Ručak' },
  { naziv: 'Večera' },
  { naziv: 'Zdrav obrok' },
  { naziv: 'Dezert' }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');

    for (const cat of categories) {
      // insert only if it doesn't exist
      const postoji = await Category.findOne({ naziv: cat.naziv });
      if (!postoji) {
        await Category.create(cat);
        console.log(`Dodata kategorija: ${cat.naziv}`);
      } else {
        console.log(`Kategorija već postoji: ${cat.naziv}`);
      }
    }

    console.log('Seed završen!');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
