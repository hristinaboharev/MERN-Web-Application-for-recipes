const express = require('express');
const router = express.Router();
const Recept = require('../models/Recept');

// Svi recepti
router.get('/', async (req, res) => {
  try {
    const recepti = await Recept.find();
    res.json(recepti);
  } catch (err) {
    res.status(500).json({ error: 'Greška pri dohvatanju recepata' });
  }
});



// GET /api/recepti/pretraga?sastojak=banana
router.get('/pretraga', async (req, res) => {
  const { sastojak } = req.query;
  try {
    const rezultati = await Recept.find({
      sastojci: { $regex: sastojak, $options: 'i' }
    });
    res.json(rezultati);
  } catch (err) {
    res.status(500).json({ message: 'Greška pri pretrazi' });
  }
});



// Jedan recept po ID
router.get('/:id', async (req, res) => {
  try {
    const recept = await Recept.findById(req.params.id);
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
    const recepti = await Recept.find({ _id: { $in: ids } });
    res.json(recepti);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Greška prilikom učitavanja sačuvanih recepata.' });
  }
});


module.exports = router;
