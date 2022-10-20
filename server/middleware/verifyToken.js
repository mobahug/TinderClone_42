const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = verifyToken = (req, res, next) => {
  req.user = { username: null, verified: false };
  const bearerHeader = req.headers.authorization;
  // console.log(req.headers);
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify(bearerToken, process.env.SECRET, (err, data) => {
      // console.log(data);
      if (!(err && typeof data === 'undefined')) {
        req.user = { username: data.username, id: data.id, verified: true };
        // console.log(req.user);
        next();
      } else console.log(err);
    });
  }
  if (!req.user?.verified) {
    res.status(401).json({
      status: 'fail',
    });
    return;
  }
};
