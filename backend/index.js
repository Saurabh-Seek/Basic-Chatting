const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
// const chatRoutes = require('./routes/chat')

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
// app.use('/chat',chatRoutes)

app.listen(5000, () => console.log('Server running on port 5000'));

