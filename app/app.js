const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// TEMP: store users in memory
const users = [];

// Login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Signup page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'signup.html'));
});

// Handle signup
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  users.push({ name, email, password });

  console.log("Users:", users);

  res.send('<h2>Signup successful 🎉 <br><a href="/">Login Now</a></h2>');
});

// Handle login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    res.send(`<h2>Welcome ${user.name} 🎉</h2>`);
  } else {
    res.send('<h2>Invalid credentials ❌</h2>');
  }
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});