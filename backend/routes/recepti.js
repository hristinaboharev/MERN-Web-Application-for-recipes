const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Recept = require('../models/Recipe');
const User = require('../models/User');
const Category = require('../models/Category'); // dodaj model kategorije
const authenticateToken = require('../middleware/authenticateToken');

// Multer podešavanja
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// POST - kreiranje novog recepta
router.post('/', upload.single('slika'), authenticateToken, async (req, res) => {
  try {
    const { naziv, kategorija, sastojci, priprema, vreme } = req.body;

    if (!naziv || !kategorija || !sastojci || !priprema) {
      return res.status(400).json({ message: 'Nedostaju obavezni podaci.' });
    }

    // očekujemo da je kategorija JSON string niza ObjectId-jeva
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

// GET svi recepti sa populacijom user-a i kategorija
router.get('/', async (req, res) => {
  try {
    const recepti = await Recept.find()
      .populate('user', 'username')
      .populate('kategorija', 'naziv'); 
    res.json(recepti);
  } catch (err) {
    res.status(500).json({ error: 'Greška pri dohvatanju recepata' });
  }
});

// GET recepti po kategoriji (po nazivu)
router.get('/kategorija/:naziv', async (req, res) => {
  try {
    const naziv = req.params.naziv;

    // prvo nadji category _id
    const kategorije = await Category.find({ naziv: { $regex: new RegExp(`^${naziv}$`, 'i') } });

    if (!kategorije.length) return res.json([]);

    const ids = kategorije.map(k => k._id);

    const recepti = await Recept.find({ kategorija: { $in: ids } })
      .populate('user', 'username')
      .populate('kategorija', 'naziv');

    res.json(recepti);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Greška pri dohvaćanju recepata po kategoriji.' });
  }
});

// GET /pretraga?sastojak=banana
router.get('/pretraga', async (req, res) => {
  const { sastojak } = req.query;
  try {
    const rezultati = await Recept.find({
      sastojci: { $regex: sastojak, $options: 'i' }
    }).populate('user', 'username').populate('kategorija', 'naziv');
    res.json(rezultati);
  } catch (err) {
    res.status(500).json({ message: 'Greška pri pretrazi' });
  }
});

// GET recepti za jednog korisnika
router.get('/korisnik/:userId', async (req, res) => {
  try {
    const recepti = await Recept.find({ user: req.params.userId })
      .populate('user', 'username')
      .populate('kategorija', 'naziv');
    res.json(recepti);
  } catch (err) {
    res.status(500).json({ message: 'Greška prilikom dohvatanja recepata korisnika.' });
  }
});

// GET recept po ID
router.get('/:id', async (req, res) => {
  try {
    const recept = await Recept.findById(req.params.id)
      .populate('user', 'username')
      .populate('kategorija', 'naziv');

    if (!recept) return res.status(404).json({ message: 'Recept nije pronađen' });
    res.json(recept);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST više recepata po ID-jevima
router.post('/rezervisi-po-id', async (req, res) => {
  const { ids } = req.body;
  try {
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ message: 'Niste poslali ispravnu listu ID-jeva.' });
    }
    const recepti = await Recept.find({ _id: { $in: ids } })
      .populate('user', 'username')
      .populate('kategorija', 'naziv');
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

    const recepti = await Recept.find({ createdAt: { $gte: stariDatum } })
      .sort({ createdAt: -1 })
      .populate('user', 'username')
      .populate('kategorija', 'naziv');

    res.json(recepti);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Greška pri dohvaćanju najnovijih recepata.' });
  }
});

module.exports = router;
