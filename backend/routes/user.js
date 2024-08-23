const express = require('express');
const User = require('../models/User');
const router = express.Router();
const Message = require('../models/Chat');


// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.post('/getInstitute', async (req, res) => {
  try {
    const users = await User.find({institute:req.body.institute});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

// Update user by ID
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user fields with incoming request body data
    Object.assign(user, req.body);
    await user.save();

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log("req.params.id=>",req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    

    const data = await User.findOneAndDelete({_id:req.params.id})
    res.json({ message: 'User deleted successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
