const jwt = require('jsonwebtoken');

// this middleware will on continue on if the token is inside the local storage

// const auth = (req, res, next) => {
//   // Get token from header
//   const token = req.header('jwt_token');

//   // Check if not token
//   if (!token) {
//     res.status(403).json({ msg: 'authorization denied' });
//   }
//   // Verify token
//   try {
//     // it is going to give use the user id (user:{id: user.id})
//     const verify = jwt.verify(token, 'secretsauce');
//     req.user = verify.user;
//   } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
//   next();
// };

// module.exports = {
//   auth,
// };

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('jwt_token');
  // Check if not token
  if (!token) {
    res.status(403).json({ msg: 'authorization denied' });
  }
  // Verify token
  try {
    // it is going to give use the user id (user:{id: user.id})
    const verify = jwt.verify(token, 'secretsauce');
    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// module.exports = {
//   auth,
// };
