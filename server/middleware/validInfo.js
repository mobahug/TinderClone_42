// module.exports = function (req, res, next) {
//   const { email, name, password } = req.body;

//   function validEmail(userEmail) {
//     return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
//   }

//   if (req.path === '/register') {
//     if (![email, name, password].every(Boolean)) {
//       res.json('Missing Credentials');
//     }
//     if (!validEmail(email)) {
//       res.json('Invalid Email');
//     }
//   } else if (req.path === '/login') {
//     if (![email, password].every(Boolean)) {
//       res.json('Missing Credentials');
//     }
//     if (!validEmail(email)) {
//       res.json('Invalid Email');
//     }
//   }

//   next();
// };
