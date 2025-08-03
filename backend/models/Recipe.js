const mongoose = require('mongoose');

const receptSchema = new mongoose.Schema({
  naziv: { type: String, required: true },
  sastojci: [String],
  priprema: [String],
  vreme: String,
  slika: String,
  kategorija: [String],  // niz stringova

  // veza sa User modelom
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {timestamps: true}); //automatski dodaje createdAt i updateAt


module.exports = mongoose.model('Recept', receptSchema);
