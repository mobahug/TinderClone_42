const Message = require('./MessageValidator');
/*
============
ID
============
*/

test('valid ids', async () => {
  const req = {};
  req.body = { user_id: '123' };
  req.user = { id: '101' };
  const data = Message.isId(req);
  expect(data.valid).toBe(true);
});

test('valid ids2', async () => {
  const req = {};
  req.body = { user_id: 123, sender_id: 101 };
  req.user = { id: 101 };
  const data = Message.isId(req);
  expect(data.valid).toBe(true);
});

test('id body empty', async () => {
  const req = {};
  req.body = { user_id: '', sender_id: '' };
  req.user = { id: '' };
  const data = Message.isId(req);
  expect(data.valid).toBe(false);
});

test('id negative', async () => {
  const req = {};
  req.body = { user_id: '-1' };
  req.user = { id: '5' };
  const data = Message.isId(req);
  expect(data.valid).toBe(false);
});

test('id body string', async () => {
  const req = {};
  req.body = { user_id: 'asd' };
  req.user = { id: '5' };
  const data = Message.isId(req);
  expect(data.valid).toBe(false);
});
