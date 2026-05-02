const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Job = require('../models/job');
const Candidate = require('../models/candidate');


// Login Page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../login.html'));
});

// Signup Page
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../signup.html'));
});


// Signup Logic
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword
  });

  await newUser.save();

  res.send('<h2>Signup successful 🎉 <br><a href="/">Login Now</a></h2>');
});


// Login Logic
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.send('<h2>User not found ❌</h2>');
  }

  const isMatch = await bcrypt.compare(password, user.password);

if (isMatch) {

  // Create JWT token
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email
    },
    'mysecretkey',
    {
      expiresIn: '1h'
    }
  );

res.redirect(`/dashboard?token=${token}`);

} else {
    res.send('<h2>Invalid credentials ❌</h2>');
  }
});

router.get('/dashboard', (req, res) => {

  const token = req.query.token;

  if (!token) {
    return res.send('<h2>Access denied ❌ Token missing</h2>');
  }

  try {

    jwt.verify(token, 'mysecretkey');

    res.sendFile(path.join(__dirname, '../dashboard.html'));

  } catch (error) {

    res.send('<h2>Invalid token ❌</h2>');

  }

});

router.get('/create-job', (req, res) => {
  res.sendFile(path.join(__dirname, '../job.html'));
});


router.post('/create-job', async (req, res) => {

  const { title, skills, experience, location } = req.body;

  const newJob = new Job({
    title,
    skills,
    experience,
    location
  });

  await newJob.save();

  res.send('<h2>Job Created Successfully 🎉</h2>');

});

router.get('/jobs', async (req, res) => {

  const jobs = await Job.find();

  let html = `
    <html>
    <head>
      <title>ATS Jobs</title>
      <style>
        body {
          font-family: Arial;
          background: #f5f7fb;
          padding: 30px;
        }

        h1 {
          color: #111827;
        }

        .job-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 20px;
          box-shadow: 0 6px 15px rgba(0,0,0,0.08);
        }

        h3 {
          margin-top: 0;
          color: #2563eb;
        }

        p {
          color: #374151;
        }
      </style>
    </head>
    <body>

      <h1>Available Jobs 📋</h1>
  `;

jobs.forEach(job => {
  html += `
    <div class="job-card">
      <h3>${job.title}</h3>

      <p><b>Skills:</b> ${job.skills}</p>
      <p><b>Experience:</b> ${job.experience}</p>
      <p><b>Location:</b> ${job.location}</p>

      <form method="POST" action="/delete-job/${job._id}">
        <button style="
          background: red;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 8px;
          cursor: pointer;">
          Delete ❌
        </button>
      </form>

    </div>
  `;
});

  html += `
    </body>
    </html>
  `;

  res.send(html);

});

router.post('/delete-job/:id', async (req, res) => {

  await Job.findByIdAndDelete(req.params.id);

  res.redirect('/jobs');

});

router.get('/apply', (req, res) => {
  res.sendFile(path.join(__dirname, '../apply.html'));
});


router.post('/apply', async (req, res) => {

  const { name, email, phone, experience } = req.body;

  const newCandidate = new Candidate({
    name,
    email,
    phone,
    experience
  });

  await newCandidate.save();

  res.send('<h2>Application Submitted Successfully 🎉</h2>');

});

router.get('/candidates', async (req, res) => {

  const candidates = await Candidate.find();

  let html = `
    <html>
    <head>
      <title>Candidates | ATS</title>

      <style>
        body {
          font-family: Arial;
          background: #f5f7fb;
          padding: 30px;
        }

        h1 {
          color: #111827;
        }

        .candidate-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 20px;
          box-shadow: 0 6px 15px rgba(0,0,0,0.08);
        }

        h3 {
          margin-top: 0;
          color: #7c3aed;
        }

        p {
          color: #374151;
        }
      </style>

    </head>

    <body>

      <h1>Candidate Applications 👨‍💼</h1>
  `;

  candidates.forEach(candidate => {

    html += `
      <div class="candidate-card">

        <h3>${candidate.name}</h3>

        <p><b>Email:</b> ${candidate.email}</p>

        <p><b>Phone:</b> ${candidate.phone}</p>

        <p><b>Experience:</b> ${candidate.experience}</p>

      </div>
    `;

  });

  html += `
    </body>
    </html>
  `;

  res.send(html);

});

module.exports = router;