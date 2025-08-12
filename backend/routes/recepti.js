const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Recept = require('../models/Recipe');
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken'); // middleware za JWT autentifikaciju



// Multer podešavanja
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // folder mora postojati
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });


// POST - kreiranje novog recepta (sa slikom i autentifikacijom)
router.post('/', upload.single('slika'), authenticateToken, async (req, res) => {
  try {
    const { naziv, kategorija, sastojci, priprema, vreme } = req.body;

    if (!naziv || !kategorija || !sastojci || !priprema) {
      return res.status(400).json({ message: 'Nedostaju obavezni podaci.' });
    }

    const noviRecept = new Recept({
      naziv,
      kategorija: JSON.parse(kategorija),
      sastojci: JSON.parse(sastojci),
      priprema: JSON.parse(priprema),
      vreme: vreme || '',
      user: req.user.id,
      slika: req.file ? `/uploads/${req.file.filename}` : '',
    });

    await noviRecept.save();

    res.status(201).json({ message: 'Recept uspešno dodat', recept: noviRecept });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Greška na serveru' });
  }
});

// Svi recepti sa username-om
router.get('/', async (req, res) => {
  try {
    const recepti = await Recept.find().populate('user', 'username');
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
    }).populate('user', 'username');
    res.json(rezultati);
  } catch (err) {
    res.status(500).json({ message: 'Greška pri pretrazi' });
  }
});

// GET recepti za jednog korisnika po ID-ju (npr. za UserProfile)
router.get('/korisnik/:userId', async (req, res) => {
  try {
    const recepti = await Recept.find({ user: req.params.userId }).populate('user', 'username');
    res.json(recepti);
  } catch (err) {
    res.status(500).json({ message: 'Greška prilikom dohvatanja recepata korisnika.' });
  }
});

// Jedan recept po ID sa populacijom user-a (username)
router.get('/:id', async (req, res) => {
  try {
    const recept = await Recept.findById(req.params.id).populate('user', 'username');
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

// GET najnoviji recepti (poslednjih 10 dana)
router.get('/najnoviji', async (req, res) => {
  try {
    const danas = new Date();
    const stariDatum = new Date();
    stariDatum.setDate(danas.getDate() - 10);

    const recepti = await Recept.find({
      createdAt: { $gte: stariDatum }
    }).sort({ createdAt: -1 });

    res.json(recepti);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Greška pri dohvaćanju najnovijih recepata.' });
  }
});

module.exports = router;
