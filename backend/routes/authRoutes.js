const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Provera da li postoje svi podaci
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Sva polja su obavezna' });
    }

    // Provera da li već postoji korisnik sa tim emailom
    const postoji = await User.findOne({ email });
    if (postoji) {
      return res.status(400).json({ message: 'Korisnik sa tim emailom već postoji' });
    }

    // Hashovanje lozinke
    const hashedPassword = await bcrypt.hash(password, 10);

    const noviUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await noviUser.save();

    res.status(201).json({ message: 'Uspešno registrovan korisnik!' });
  } catch (error) {
    console.error('Greška pri registraciji:', error);
    res.status(500).json({ message: 'Greška na serveru' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Neispravan email ili lozinka' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(400).json({ message: 'Neispravan email ili lozinka' });

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Greška pri login-u:', error); // ovo doda
    res.status(500).json({ message: 'Greška na serveru' });
  }
});


module.exports = router;
