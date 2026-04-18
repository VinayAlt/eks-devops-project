const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// 👇 IMPORTANT: serve login.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@test.com' && password === '1234') {
    res.send('<h2>Login Successful 🎉</h2>');
  } else {
    res.send('<h2>Invalid Credentials ❌</h2>');
  }
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});