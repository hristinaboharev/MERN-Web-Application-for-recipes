const mongoose = require('mongoose');

const receptSchema = new mongoose.Schema({
  naziv: { type: String, required: true },
  sastojci: [String],
  priprema: [String],
  vreme: String,
  slika: String,
  kategorija: [String]  // ovde niz stringova
});


module.exports = mongoose.model('Recept', receptSchema);
