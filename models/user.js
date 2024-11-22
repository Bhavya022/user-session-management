
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  mobile: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number.']
  },
  username: { 
    type: String, 
    required: true,
    trim: true
  },
  activeSession: { 
    type: String, 
    default: null
  },
  sessions: [
    {
      sessionKey: { type: String, required: true },
      userAgent: { type: String, required: true },
      ipAddress: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      isValid: { type: Boolean, default: true }
    }
  ]
});

userSchema.methods.invalidateSessions = function() {
  this.sessions.forEach(session => session.isValid = false);
};

module.exports = mongoose.model('User', userSchema);
