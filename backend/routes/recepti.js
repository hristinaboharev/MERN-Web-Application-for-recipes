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



module.exports = router;
