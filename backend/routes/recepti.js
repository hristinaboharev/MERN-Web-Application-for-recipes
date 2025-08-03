const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Svi recepti sa username-om
router.get('/', async (req, res) => {
  try {
    const recepti = await Recipe.find().populate('user', 'username');
    res.json(recepti);
  } catch (err) {
    res.status(500).json({ error: 'Greška pri dohvatanju recepata' });
  }
});



// GET /api/recepti/pretraga?sastojak=banana
router.get('/pretraga', async (req, res) => {
  const { sastojak } = req.query;
  try {
    const rezultati = await Recipe.find({
      sastojci: { $regex: sastojak, $options: 'i' }
    }).populate('user', 'username');
    res.json(rezultati);
  } catch (err) {
    res.status(500).json({ message: 'Greška pri pretrazi' });
  }
});




// Jedan recept po ID sa populacijom user-a (username)
router.get('/:id', async (req, res) => {
  try {
    const recept = await Recipe.findById(req.params.id).populate('user', 'username');
    if (!recept) return res.status(404).json({ message: 'Recept nije pronađen' });
    res.json(recept);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// POST više recepata po ID-jevima (za sačuvane)
router.post('/rezervisi-po-id', async (req, res) => {
  const { ids } = req.body;
  try {
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ message: 'Niste poslali ispravnu listu ID-jeva.' });
    }
    const recepti = await Recipe.find({ _id: { $in: ids } });
    res.json(recepti);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Greška prilikom učitavanja sačuvanih recepata.' });
  }
});


module.exports = router;
