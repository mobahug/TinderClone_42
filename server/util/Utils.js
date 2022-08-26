// const getRandomBytes() {
// 	crypto.randomBytes(48, (_err, buffer) => {
// 		var token = buffer.toString('hex');
// 		return token;
// 	});
// }

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

module.exports = { getTokenFrom };
