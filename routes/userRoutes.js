
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateSuperuser = require('../middleware/authMiddleware');
router.post('/createUser', authenticateSuperuser, async (req, res) => {
  try {
    await userController.createUser(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Error while creating user: ' + error.message });
  }
});
router.get('/doGetUser/:mobile', authenticateSuperuser, async (req, res) => {
  try {
    await userController.doGetUser(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching user details: ' + error.message });
  }
});

module.exports = router;
