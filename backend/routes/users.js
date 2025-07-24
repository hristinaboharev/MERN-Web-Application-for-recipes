const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Registracija
router.post('/signup', async (req, res) => {
  const { ime, email, password } = req.body;
  try {
    let postoji = await User.findOne({ email });
    if (postoji) return res.status(400).json({ message: 'Email je već zauzet' });

    const noviUser = new User({ ime, email, password });
    await noviUser.save();

    res.status(201).json({ message: 'Korisnik uspešno registrovan' });
  } catch (err) {
    res.status(500).json({ message: 'Greška prilikom registracije' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Neispravan email ili lozinka' });

    const isValid = await user.proveriLozinku(password);
    if (!isValid) return res.status(400).json({ message: 'Neispravan email ili lozinka' });

    // Generiši JWT token (koristi tajni ključ iz .env)
    const token = jwt.sign({ id: user._id, ime: user.ime }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token, ime: user.ime, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Greška prilikom prijave' });
  }
});

module.exports = router;
