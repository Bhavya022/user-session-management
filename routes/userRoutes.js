const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateSuperuser = require('../middleware/authMiddleware');

// Create User Route
router.post('/createUser', authenticateSuperuser, async (req, res) => {
  try {
    await userController.createUser(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Error while creating user: ' + error.message });
  }
});

// Get User Details Route
router.get('/doGetUser/:mobile', authenticateSuperuser, async (req, res) => {
  try {
    await userController.doGetUser(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching user details: ' + error.message });
  }
});

// Login User Route
router.post('/login', authenticateSuperuser, async (req, res) => {
  try {
    await userController.login(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Error while logging in: ' + error.message });
  }
});

// Invalidate Session Route
router.post('/invalidateSession', authenticateSuperuser, async (req, res) => {
  try {
    await userController.invalidateSession(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Error while invalidating session: ' + error.message });
  }
});

module.exports = router;
