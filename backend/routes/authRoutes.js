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
    //tražimo korisnika u bazi po email adresi
    const user = await User.findOne({ email });
    //Ako korisnik ne postoji vrati grešku
    if (!user) 
      return res.status(400).json({ message: 'Neispravan email ili lozinka' });

    //Poređenje lozinke sa hashovanom lozinkom u bazi
    const passwordMatch = await bcrypt.compare(password, user.password);

    //Ako lozinka nije tačna, vrati grešku
    if (!passwordMatch)
       return res.status(400).json({ message: 'Neispravan email ili lozinka' });

     //Ako su kredencijali ispravni, generišemo JWT token
    const token = jwt.sign(
      //Podaci koji se smeštaju u token
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET, //ovo je tajni ključ za potpisivanje tokena
      { expiresIn: '1d' } //trajanje tokena na 1 dan
    );

    //Vraćamo token kao odgovor klijentu
    res.json({ token });
  } catch (error) {
    console.error('Greška pri login-u:', error); a
    res.status(500).json({ message: 'Greška na serveru' });
  }
});


module.exports = router;
