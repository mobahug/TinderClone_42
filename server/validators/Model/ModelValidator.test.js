const Model = require('./UserValidator');

test('valid num', async () => {
  const data = Model.isPositiveNumber(1);
  expect(data).toBe(true);
});

test('empty', async () => {
  const data = Model.isPositiveNumber('');
  expect(data).toBe(false);
});

test('smaller than 1', async () => {
  const data = Model.isPositiveNumber('-1');
  expect(data).toBe(false);
});

test('smaller than 1', async () => {
  const data = Model.isPositiveNumber('0');
  expect(data).toBe(false);
});

test('overflow', async () => {
  const data = Model.isPositiveNumber((Number.MAX_VALUE * 2).toString());
  expect(data).toBe(false);
});

test('underflow', async () => {
  const data = Model.isPositiveNumber('-2147483648');
  expect(data).toBe(false);
});

test('valid date', async () => {
  const data = Model.isDate('01-01-2021');
  expect(data).toBe(true);
});

test('invalid date', async () => {
  const data = Model.isDate('01');
  expect(data).toBe(false);
});

test('valid string', async () => {
  const data = Model.isString('asdf aasdf');
  expect(data).toBe(true);
});

test('empty string', async () => {
  const data = Model.isString('');
  expect(data).toBe(false);
});
test('number', async () => {
  const data = Model.isString(1);
  expect(data).toBe(false);
});
