const Tag = require('./TagValidator');

test('empty', async () => {
  const req = {};
  req.body = { tags: '' };
  const data = Tag.isTag(req);
  expect(data.valid).toBe(true);
});

test('single tag', async () => {
  const req = {};
  req.body = { tags: ['Single'] };
  const data = Tag.isTag(req);
  expect(data.valid).toBe(true);
});

test('multiple tag', async () => {
  const req = {};
  req.body = { tags: ['Multiple', 'Multiple'] };
  const data = Tag.isTag(req);
  expect(data.valid).toBe(true);
});

test('Bad characters', async () => {
  const req = {};
  req.body = { tags: ['Single1'] };
  const data = Tag.isTag(req);
  expect(data.valid).toBe(true);
});

test('Bad characters2', async () => {
  const req = {};
  req.body = { tags: ['Single;'] };
  const data = Tag.isTag(req);
  expect(data.valid).toBe(false);
});

test('Bad characters3', async () => {
  const req = {};
  req.body = { tags: ["a'"] };
  const data = Tag.isTag(req);
  expect(data.valid).toBe(false);
});

test('Overflow', async () => {
  const req = {};
  req.body = {
    tags: [
      'dpjlxewnxwzhyiuwqyupaicsuavqwtxqfrdtolukvhphyvqblpooudlomolhygtiagsuzzlxitypjyixfrfvxtzvdbsmqovkihqupvrvjntszwwmxlqvsgfiduoaanbqbuvtvzpdzlzecvyxhnqahukdxqqnmvzgynlfpfgbrprkrgtbhnaopntuohzgceggplduuppvcbgulgqsjxvmomvqorpatfbfvzomhrpackuayhmnqiddmbpwrcbbelvw',
    ],
  };
  const data = Tag.isTag(req);
  expect(data.valid).toBe(false);
});
