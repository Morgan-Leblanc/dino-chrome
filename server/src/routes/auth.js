const express = require('express');
const User = require('../models/Users');

const router = express.Router();

// Register path
router.post('/register', async (req, res) => {
  try {
    const { accountName, username, password } = req.body;
    
    const user = new User({ accountName, username, password });
    await user.save();
    
    res.status(201).json({ message: "User successfully created" });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Login path
router.post('/login', async (req, res) => {
  try {
    const { accountName, password } = req.body;
    
    const user = await User.findOne({ accountName });
    if (!user) {
      return res.status(401).json({ message: "Invalid account name or password" });
    }

    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid account name or password" });
    }

    res.status(200).json({ 
      message: "Login successful",
      user: {
        id: user._id,
        accountName: user.accountName,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
