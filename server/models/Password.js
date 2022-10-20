const bcrypt = require('bcrypt');

class Password {
  constructor() {
    this.saltRounds = 10;
  }

  async hashPassword(plaintextPassword) {
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(plaintextPassword, this.saltRounds, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });

    return hashedPassword;
  }

  async verifyPassword(plaintextPassword, hash) {
    const isSame = await bcrypt.compare(plaintextPassword, hash);

    return isSame;
  }
}

module.exports = new Password();
