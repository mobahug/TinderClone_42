const Orm = require('../models/Orm');

test('get', async () => {
  const ormi = new Orm('testtable', 'id');
  expect.assertions(1);
  const ans = await ormi.get('name', 'id', 1);

  expect(ans.rows[0].name).toBe('testname');
});
