const User = require('../models/user');
const uuid = require('uuid');
exports.createUser = async (req, res) => {
  const { mobile, username } = req.body;

  try {
    let user = await User.findOne({ mobile });
    if (user) {
      await user.invalidateSessions();
    } else {
      user = new User({
        mobile,
        username
      });
    }
    const sessionKey = uuid.v4();
    const userAgent = req.get('User-Agent');
    const ipAddress = req.ip;
    user.sessions.push({
      sessionKey,
      userAgent,
      ipAddress,
      isValid: true, 
      createdAt: new Date() 
    });
    user.activeSession = sessionKey;
    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      user: {
        mobile: user.mobile,
        username: user.username,
        activeSession: user.activeSession,
        sessions: user.sessions.map(session => ({
          sessionKey: session.sessionKey,
          userAgent: session.userAgent,
          ipAddress: session.ipAddress,
          isValid: session.isValid,
          createdAt: session.createdAt
        }))
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user: ' + error.message });
  }
};
exports.doGetUser = async (req, res) => {
  const { mobile } = req.params;

  try {
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      mobile_number: user.mobile,
      user_name: user.username,
      activeSession: user.activeSession,
      sessions: user.sessions.map(session => ({
        sessionKey: session.sessionKey,
        userAgent: session.userAgent,
        ipAddress: session.ipAddress,
        isValid: session.isValid,
        createdAt: session.createdAt
      }))
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user: ' + error.message });
  }
};
