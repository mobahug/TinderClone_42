const Password = require('../models/Password');

test('hash right password', async () => {
  const data = await Password.hashPassword('test');
  const answ = await Password.verifyPassword('test', data);

  expect(answ).toBe(true);
});

test('hash wrong password', async () => {
  const data = await Password.hashPassword('test2');
  const answ = await Password.verifyPassword('test', data);

  expect(answ).toBe(true);
});
