require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const receptiRouter = require('./routes/recepti');
const usersRouter = require('./routes/users');


const app = express();

app.use(cors());
app.use(express.json());


// Rute
app.use('/api/auth',authRoutes);
app.use('/api/recepti', receptiRouter);
app.use('/api/users', usersRouter);

//Za upload slika
app.use('/uploads', express.static('uploads'));

// Poveži se na MongoDB
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB je povezan'))
  .catch(err => console.error(err));


//Pokreni server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server radi na portu ${PORT}`));
