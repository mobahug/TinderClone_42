const jwt = require('jsonwebtoken');




module.exports =  verifyToken = (req, res, next) => {
  req.user = { username: null, verified: false };
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify(bearerToken, 'secretsauce', (err, data) => {
      if (!(err && typeof data === 'undefined')) {
        req.user = { username: data.username, id: data.id, verified: true };
        console.log(req.user);
        next();
      } else console.log(err);
    });
  }
  //     return res.sendStatus(403);
};

