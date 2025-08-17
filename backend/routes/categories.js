const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// GET sve kategorije
router.get('/', async (req, res) => {
  try {
    const kategorije = await Category.find(); // uzima sve kategorije iz kolekcije
    res.json(kategorije); // vrati niz objekata
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Greška pri dohvaćanju kategorija.' });
  }
});

module.exports = router;
