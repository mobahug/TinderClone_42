const User = require('./UserValidator');

/* =========== INPUTS FOR EMAIL TESTING =========== */

const email = 'foo@bar.com';
const email2 = '@bar.com';
const email3 = 'foobar.com';
const email4 = 'foo@.com';
const email5 = 'foo@barcom';
const email6 = 'foo@bar.';
const email7 = '.com';
const email8 = '!/&#%!"€@/&%/&%.9823536';
const email9 = 123123;
const email10 = '';
const email11 =
  'ƒFÖKSdöksadsökFNsklnfklSFNkn@gmail.comnfasdnfkasdnfaskjfnasknjf \
  					askflaksdlökdsöakdökasdakdlöakdöalkdlaökdlakdalkdakdaklöakdöa \
					kjsdlkadföadskfjöaskdjfaöskdfjaösjfasöjfpwiq45938245792340529 \
					)/()/#=()&€=(#%(%HJI#H%J#B%JH#V%)%(#)=U)U)%)#%/()#/ \
					)#(%YFCDSÖKFN#P8957829u53joiefjsdiofu235723579798782934ijdsd \
					asjfasjfnksdjfnlskjDFNLKSJdfljksadfbalsbdflbfljsdbfjsbadfjbas \
					jsfhjladfhjasdfhljasdkfhajlsdhfasdhflashfiouewr8q70835y8054uh \
					askflaksdlökdsöakdökasdakdlöakdöalkdlaökdlakdalkdakdaklöakdöa \
					kjsdlkadföadskfjöaskdjfaöskdfjaösjfasöjfpwiq45938245792340529 \
					)/()/#=()&€=(#%(%HJI#H%J#B%JH#V%)%(#)=U)U)%)#%/()#/ \
					)#(%YFCDSÖKFN#P8957829u53joiefjsdiofu235723579798782934ijdsd \
					asjfasjfnksdjfnlskjDFNLKSJdfljksadfbalsbdflbfljsdbfjsbadfjbas \
					jsfhjladfhjasdfhljasdkfhajlsdhfasdhflashfiouewr8q70835y8054uh \
					jsadhfajksdfnkjasnfjkasfnkajsdnfsajkfnjksdanksadnfsdnffnsjkdanf';

test('email address the proper one', async () => {
  const req = {};
  req.body = { email: 'mail@gmail.com' };
  const data = User.isEmail(req);
  expect(data.valid).toBe(true);
});

/* =========== INVALID TEST FOR EMAIL =========== */

test('email address without first part', async () => {
  const req = {};
  req.body = { email: email2 };
  const data = User.isEmail(req);
  expect(data.valid).toBe(false);
});
test('email address without @', async () => {
  const req = {};
  req.body = { email: email3 };
  const data = User.isEmail(req);
  expect(data.valid).toBe(false);
});
test('email address without email provider', async () => {
  const req = {};
  req.body = { email: email4 };
  const data = User.isEmail(req);
  expect(data.valid).toBe(false);
});
test('email address without "."', async () => {
  const req = {};
  req.body = { email: email5 };
  const data = User.isEmail(req);
  expect(data.valid).toBe(false);
});
test('email address without ending part', async () => {
  const req = {};
  req.body = { email: email6 };
  const data = User.isEmail(req);
  expect(data.valid).toBe(false);
});
test('email address with only ending part', async () => {
  const req = {};
  req.body = { email: email7 };
  const data = User.isEmail(req);
  expect(data.valid).toBe(false);
});
test('email address with special characters', async () => {
  const req = {};
  req.body = { email: email8 };
  const data = User.isEmail(req);
  expect(data.valid).toBe(false);
});
test('email address with intiger numbers', async () => {
  const req = {};
  req.body = { email: email9 };
  const data = User.isEmail(req);
  expect(data.valid).toBe(false);
});
test('email address with intiger numbers', async () => {
  const req = {};
  req.body = { email: email10 };
  const data = User.isEmail(req);
  expect(data.valid).toBe(false);
});
test('email address with intiger numbers', async () => {
  const req = {};
  req.body = { email: email11 };
  const data = User.isEmail(req);
  expect(data.valid).toBe(false);
});

/* =========== INPUTS FOR PASWORD TESTING =========== */
const password = 'testTEST123456@';
const password2 = 'testTEST123456';
const password3 = 'testTEST@';
const password4 = 'test123456@';
const password5 = 'TEST123456@';
const password6 = 123456789;
const password7 = '';
const password8 = '@@@@@@@@@';
const password9 = '123456789';
const password10 = 'testtest';
const password11 = 'TESTTEST';
const password12 = 'tT@1';
const password13 =
  'ƒFÖKSdöksadsökFNsklnfklSFNkn@gmail.comnfasdnfkasdnfaskjfnasknjf \
  					askflaksdlökdsöakdökasdakdlöakdöalkdlaökdlakdalkdakdaklöakdöa \
					kjsdlkadföadskfjöaskdjfaöskdfjaösjfasöjfpwiq45938245792340529 \
					)/()/#=()&€=(#%(%HJI#H%J#B%JH#V%)%(#)=U)U)%)#%/()#/ \
					)#(%YFCDSÖKFN#P8957829u53joiefjsdiofu235723579798782934ijdsd \
					asjfasjfnksdjfnlskjDFNLKSJdfljksadfbalsbdflbfljsdbfjsbadfjbas \
					jsfhjladfhjasdfhljasdkfhajlsdhfasdhflashfiouewr8q70835y8054uh \
					askflaksdlökdsöakdökasdakdlöakdöalkdlaökdlakdalkdakdaklöakdöa \
					kjsdlkadföadskfjöaskdjfaöskdfjaösjfasöjfpwiq45938245792340529 \
					)/()/#=()&€=(#%(%HJI#H%J#B%JH#V%)%(#)=U)U)%)#%/()#/ \
					)#(%YFCDSÖKFN#P8957829u53joiefjsdiofu235723579798782934ijdsd \
					asjfasjfnksdjfnlskjDFNLKSJdfljksadfbalsbdflbfljsdbfjsbadfjbas \
					jsfhjladfhjasdfhljasdkfhajlsdhfasdhflashfiouewr8q70835y8054uh \
					jsadhfajksdfnkjasnfjkasfnkajsdnfsajkfnjksdanksadnfsdnffnsjkdanf';

/* =========== VALID TEST FOR PASSWORD =========== */
test('password the proper one', async () => {
  const req = {};
  req.body = { password: password };
  const data = User.isPassword(req);
  expect(data.valid).toBe(true);
});

/* =========== INVALID TEST FOR PASSWORD =========== */
test('password without special character', async () => {
  const req = {};
  req.body = { password: password2 };
  const data = User.isPassword(req);
  expect(data.valid).toBe(false);
});
test('password without numbers', async () => {
  const req = {};
  req.body = { password: password3 };
  const data = User.isPassword(req);
  expect(data.valid).toBe(false);
});
test('password without upper case letter', async () => {
  const req = {};
  req.body = { password: password4 };
  const data = User.isPassword(req);
  expect(data.valid).toBe(false);
});
test('password without smaller case letter', async () => {
  const req = {};
  req.body = { password: password5 };
  const data = User.isPassword(req);
  expect(data.valid).toBe(false);
});
test('password with intiger numbers', async () => {
  const req = {};
  req.body = { password: password6 };
  const data = User.isPassword(req);
  expect(data.valid).toBe(false);
});
test('password with empty string', async () => {
  const req = {};
  req.body = { password: password7 };
  const data = User.isPassword(req);
  expect(data.valid).toBe(false);
});
test('password with only special characters', async () => {
  const req = {};
  req.body = { password: password8 };
  const data = User.isPassword(req);
  expect(data.valid).toBe(false);
});
test('password with only numbers', async () => {
  const req = {};
  req.body = { password: password9 };
  const data = User.isPassword(req);
  expect(data.valid).toBe(false);
});
test('password with only smaller case letter', async () => {
  const req = {};
  req.body = { password: password10 };
  const data = User.isPassword(req);
  expect(data.valid).toBe(false);
});
test('password with only upper case letter', async () => {
  const req = {};
  req.body = { password: password11 };
  const data = User.isPassword(req);
  expect(data.valid).toBe(false);
});
test('password with too short string', async () => {
  const req = {};
  req.body = { password: password12 };
  const data = User.isPassword(req);
  expect(data.valid).toBe(false);
});
test('password with too long string', async () => {
  const req = {};
  req.body = { password: password13 };
  const data = User.isPassword(req);
  expect(data.valid).toBe(false);
});

const firstname_lastname = 'Gabor';

const firstname_lastname2 = 'testTEST123456@';
const firstname_lastname3 = 'testTEST123456';
const firstname_lastname4 = 'testTEST@';

const firstname_lastname5 = 123456789;
const firstname_lastname6 = '';
const firstname_lastname7 =
  'ƒFÖKSdöksadsökFNsklnfklSFNkn@gmail.comnfasdnfkasdnfaskjfnasknjf \
  					askflaksdlökdsöakdökasdakdlöakdöalkdlaökdlakdalkdakdaklöakdöa \
					kjsdlkadföadskfjöaskdjfaöskdfjaösjfasöjfpwiq45938245792340529 \
					)/()/#=()&€=(#%(%HJI#H%J#B%JH#V%)%(#)=U)U)%)#%/()#/ \
					)#(%YFCDSÖKFN#P8957829u53joiefjsdiofu235723579798782934ijdsd \
					asjfasjfnksdjfnlskjDFNLKSJdfljksadfbalsbdflbfljsdbfjsbadfjbas \
					jsfhjladfhjasdfhljasdkfhajlsdhfasdhflashfiouewr8q70835y8054uh \
					askflaksdlökdsöakdökasdakdlöakdöalkdlaökdlakdalkdakdaklöakdöa \
					kjsdlkadföadskfjöaskdjfaöskdfjaösjfasöjfpwiq45938245792340529 \
					)/()/#=()&€=(#%(%HJI#H%J#B%JH#V%)%(#)=U)U)%)#%/()#/ \
					)#(%YFCDSÖKFN#P8957829u53joiefjsdiofu235723579798782934ijdsd \
					asjfasjfnksdjfnlskjDFNLKSJdfljksadfbalsbdflbfljsdbfjsbadfjbas \
					jsfhjladfhjasdfhljasdkfhajlsdhfasdhflashfiouewr8q70835y8054uh \
					jsadhfajksdfnkjasnfjkasfnkajsdnfsajkfnjksdanksadnfsdnffnsjkdanf';

/* =========== VALID TEST FOR NAMES =========== */
test('name valid', async () => {
  const req = {};
  req.body = { firstname: firstname_lastname };
  const data = User.isName(req);
  expect(data.valid).toBe(true);
});

/* =========== INVALID TEST FOR NAMES =========== */

test('name number and specialcharacters', async () => {
  const req = {};
  req.body = { firstname: firstname_lastname2 };
  const data = User.isName(req);
  expect(data.valid).toBe(false);
});
test('name characters and numbers', async () => {
  const req = {};
  req.body = { firstname: firstname_lastname3 };
  const data = User.isName(req);
  expect(data.valid).toBe(false);
});
test('name characters and special characters', async () => {
  const req = {};
  req.body = { firstname: firstname_lastname4 };
  const data = User.isName(req);
  expect(data.valid).toBe(false);
});
test('name integer', async () => {
  const req = {};
  req.body = { firstname: firstname_lastname5 };
  const data = User.isName(req);
  expect(data.valid).toBe(false);
});

test('name integer', async () => {
  const req = {};
  req.body = { firstname: firstname_lastname6 };
  const data = User.isName(req);
  expect(data.valid).toBe(false);
});

test('name empty', async () => {
  const req = {};
  req.body = { firstname: firstname_lastname7 };
  const data = User.isName(req);
  expect(data.valid).toBe(false);
});

/*
============
ID
============
*/

test('id body valid', async () => {
  const req = {};
  req.body = { id: '123' };
  const data = User.isId(req);
  expect(data.valid).toBe(true);
});

test('id param valid', async () => {
  const req = {};
  req.params = { id: '123' };
  const data = User.isId(req);
  expect(data.valid).toBe(true);
});
test('id param valid', async () => {
  const req = {};
  req.params = { id: 123 };
  const data = User.isId(req);
  expect(data.valid).toBe(true);
});
test('id body empty', async () => {
  const req = {};
  req.body = { id: '' };
  const data = User.isId(req);
  expect(data.valid).toBe(false);
});

test('id params empty', async () => {
  const req = {};
  req.params = { id: '' };
  const data = User.isId(req);
  expect(data.valid).toBe(false);
});

test('id body empty', async () => {
  const req = {};
  req.body = { id: '-1' };
  const data = User.isId(req);
  expect(data.valid).toBe(false);
});

test('id body string', async () => {
  const req = {};
  req.body = { id: 'asdfasdf' };
  const data = User.isId(req);
  expect(data.valid).toBe(false);
});

test('id overflow', async () => {
  const req = {};
  req.body = { id: Number.MAX_VALUE * 2 };
  const data = User.isId(req);
  expect(data.valid).toBe(false);
});

/*
============
BIRTHDATE
============
*/

test('valid birthdate', async () => {
  const req = {};
  req.body = { birthdate: '10-01-1995' };
  const data = User.isBirthDate(req);
  expect(data.valid).toBe(true);
});

test('valid birthdate', async () => {
  const req = {};
  req.body = { birthdate: '1995-10-01' };
  const data = User.isBirthDate(req);
  expect(data.valid).toBe(true);
});

test('invalid birthdate', async () => {
  const req = {};
  req.body = { birthdate: '1995-99-01' };
  const data = User.isBirthDate(req);
  expect(data.valid).toBe(false);
});

test('invalid birthdate', async () => {
  const req = {};
  req.body = { birthdate: '#-01-99' };
  const data = User.isBirthDate(req);
  expect(data.valid).toBe(false);
});

/*
============
USERNAME
============
*/

test('valid username', async () => {
  const req = {};
  req.body = { username: 'user' };
  const data = User.isRegisterUsername(req);
  expect(data.valid).toBe(true);
});

test('empty username', async () => {
  const req = {};
  req.body = { username: '' };
  const data = User.isRegisterUsername(req);
  expect(data.valid).toBe(false);
});
