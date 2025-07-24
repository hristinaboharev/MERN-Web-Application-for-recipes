require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoutes);

const receptiRouter = require('./routes/recepti');
app.use('/api/recepti', receptiRouter);


// Poveži se na MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB povezan'))
  .catch(err => console.error(err));


// Routes
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server radi na portu ${PORT}`));
