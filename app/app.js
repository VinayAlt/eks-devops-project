const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));


// Load routes
app.use('/', authRoutes);


// Start server
app.listen(3000, () => {
  console.log('App running on port 3000');
});