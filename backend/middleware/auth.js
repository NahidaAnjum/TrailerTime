// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (roles = []) => {
  return (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).send('Access denied');

      const verified = jwt.verify(token, 'your_jwt_secret');
      req.user = verified;

      if (roles.length && !roles.includes(verified.role)) {
        return res.status(403).send('Forbidden');
      }

      next();
    } catch (err) {
      res.status(400).send('Invalid token');
    }
  };
};

module.exports = auth;