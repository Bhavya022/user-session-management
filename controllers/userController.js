const User = require('../models/user');
const uuid = require('uuid');

// Create or Update User with New Session
exports.createUser = async (req, res) => {
  const { mobile, username } = req.body;

  try {
    let user = await User.findOne({ mobile });
    if (user) {
      await user.invalidateSessions(); 
    } else {
      user = new User({ mobile, username });
    }

    const sessionKey = uuid.v4();
    const userAgent = req.get('User-Agent') || 'Unknown';
    const ipAddress = req.ip || 'Unknown IP';

    user.sessions.push({
      sessionKey,
      userAgent,
      ipAddress,
      isValid: true,
      createdAt: new Date(),
    });

    user.activeSession = sessionKey;
    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      user: {
        mobile: user.mobile,
        username: user.username,
        activeSession: user.activeSession,
        sessions: user.sessions.map(({ sessionKey, userAgent, ipAddress, isValid, createdAt }) => ({
          sessionKey,
          userAgent,
          ipAddress,
          isValid,
          createdAt,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({ error: `Error creating user: ${error.message}` });
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
      mobile: user.mobile,
      username: user.username,
      activeSession: user.activeSession,
      sessions: user.sessions.map(({ sessionKey, userAgent, ipAddress, isValid, createdAt }) => ({
        sessionKey,
        userAgent,
        ipAddress,
        isValid,
        createdAt,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: `Error fetching user: ${error.message}` });
  }
};

// Login User and Create New Session
exports.login = async (req, res) => {
  const { mobile, username, userAgent, ipAddress } = req.body;

  try {
    const user = await User.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Invalidate current active session if it exists
    if (user.activeSession) {
      user.sessions.forEach(session => {
        session.isValid = false; // Invalidate existing sessions
      });
    }

    // Create new session
    const sessionKey = uuid.v4();
    user.sessions.push({
      sessionKey,
      userAgent: userAgent || req.get('User-Agent') || 'Unknown',
      ipAddress: ipAddress || req.ip || 'Unknown IP',
      isValid: true,
      createdAt: new Date(),
    });

    user.activeSession = sessionKey;
    await user.save();

    res.status(200).json({
      message: 'Login successful',
      user: {
        mobile: user.mobile,
        username: user.username,
        activeSession: user.activeSession,
        sessions: user.sessions.map(({ sessionKey, userAgent, ipAddress, isValid, createdAt }) => ({
          sessionKey,
          userAgent,
          ipAddress,
          isValid,
          createdAt,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({ error: `Error logging in: ${error.message}` });
  }
};

// Invalidate a Specific Session
exports.invalidateSession = async (req, res) => {
  const { sessionKey } = req.body;

  try {
    const user = await User.findOne({ 'sessions.sessionKey': sessionKey });
    if (!user) {
      return res.status(404).json({ error: 'Session not found' });
    }
    const session = user.sessions.find(s => s.sessionKey === sessionKey);
    if (session && session.isValid) {
      session.isValid = false;
      if (user.activeSession === sessionKey) {
        user.activeSession = null; 
      }
      await user.save();

      res.status(200).json({
        message: 'Session invalidated successfully',
        user: {
          mobile: user.mobile,
          username: user.username,
          activeSession: user.activeSession,
          sessions: user.sessions.map(({ sessionKey, userAgent, ipAddress, isValid, createdAt }) => ({
            sessionKey,
            userAgent,
            ipAddress,
            isValid,
            createdAt,
          })),
        },
      });
    } else {
      res.status(400).json({ error: 'Session is already invalid or does not exist' });
    }
  } catch (error) {
    res.status(500).json({ error: `Error invalidating session: ${error.message}` });
  }
};
