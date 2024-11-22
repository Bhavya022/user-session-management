
const authenticateSuperuser = (req, res, next) => {
    const { username, password } = req.headers;
  
    if (username === 'admin' && password === 'password') {
      return next();
    }
  
    return res.status(403).json({ error: 'Forbidden: Invalid credentials' });
  };
  
  module.exports = authenticateSuperuser;
  