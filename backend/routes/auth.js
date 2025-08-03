// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Hardcoded user credentials
const USER = {
  email: 'adibhosale@1013@gmail.com',
  password: '12345'
};

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === USER.email && password === USER.password) {
    return res.status(200).json({ message: 'Login successful', user: email });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
