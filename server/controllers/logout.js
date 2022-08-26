exports.logout = (req, res) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    // add bearerToken to blacklist
  }
  return res.sendStatus(200);
};
