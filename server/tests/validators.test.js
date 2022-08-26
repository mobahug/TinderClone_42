/* eslint-disable no-multi-str */
/* eslint-disable camelcase */
const {
    geoChecker,
    emailValidation,
    passwordValidator,
    firstname_lastnameValidator
} = require('../util/Validator');


  /* =========== INPUTS FOR EMAIL TESTING =========== */

  const ip = '168.56.18.74';
  const ip2 = '1.518.74';
  const ip3 = '.56.18.74';
  const ip4 = '168.18.74';
  const ip5 = '168.56.74';
  const ip6 = '168.56.18';
  const ip7 = '168.561874';
  const ip8 = '168.56.18.hey';
  const ip11 = '404.404.404.404';




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
  const email11 = 'ƒFÖKSdöksadsökFNsklnfklSFNkn@gmail.comnfasdnfkasdnfaskjfnasknjf \
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




  /* =========== INPUTS FOR PASWORD TESTING =========== */
  const password = 'testTEST123456@';
  const password2 = 'testTEST123456';
  const password3 = 'testTEST@';
  const password4 = 'test123456@';
  const password5 = 'TEST123456@';
  const password6 = 123456789;
  const password7 = ''
  const password8 = '@@@@@@@@@';
  const password9 = '123456789';
  const password10 = 'testtest';
  const password11 = 'TESTTEST';
  const password12 = 'tT@1'
  const password13 = 'ƒFÖKSdöksadsökFNsklnfklSFNkn@gmail.comnfasdnfkasdnfaskjfnasknjf \
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





  const firstname_lastname = 'Gabor';

  const firstname_lastname2 = 'testTEST123456@';
  const firstname_lastname3 = 'testTEST123456';
  const firstname_lastname4 = 'testTEST@';
  const firstname_lastname5 = 'test123456@';
  const firstname_lastname6 = 'TEST123456@';
  const firstname_lastname7 = 123456789;
  const firstname_lastname8 = ''
  const firstname_lastname9 = '@@@@@@@@@';
  const firstname_lastname10 = '123456789';
  const firstname_lastname11 = 'testtest';
  const firstname_lastname12 = 'TESTTEST';
  const firstname_lastname13 = 'tT@1'
  const firstname_lastname14 = 'ƒFÖKSdöksadsökFNsklnfklSFNkn@gmail.comnfasdnfkasdnfaskjfnasknjf \
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



/* =========== VALID TEST FOR IP ADDRESS =========== */
test('Checking for Valid IP address, the proper one', async () => {
	const data = geoChecker(ip);
	expect(data).toBe(true);
});

/* =========== INVALID TEST FOR IP ADDRESS =========== */
test('Checking for Valid IP address with missing number test1', async () => {
	const data = geoChecker(ip2);
	expect(data).toBe(false);
});
test('Checking for Valid IP address with missing number test2', async () => {
	const data = geoChecker(ip3);
	expect(data).toBe(false);
});
test('Checking for Valid IP address with missing number test3', async () => {
	const data = geoChecker(ip4);
	expect(data).toBe(false);
});
test('Checking for Valid IP address with missing number test4', async () => {
	const data = geoChecker(ip5);
	expect(data).toBe(false);
});
test('Checking for Valid IP address with missing number test5', async () => {
	const data = geoChecker(ip6);
	expect(data).toBe(false);
});
test('Checking for Valid IP address with missing number test6', async () => {
	const data = geoChecker(ip7);
	expect(data).toBe(false);
});
test('Checking for Valid IP address with added letters', async () => {
	const data = geoChecker(ip8);
	expect(data).toBe(false);
});
test('Checking for Valid IP address with over 255', async () => {
	const data = geoChecker(ip11);
	expect(data).toBe(false);
});




/* =========== VALID TEST FOR EMAIL =========== */
test('Checking for Valid email address the proper one', async () => {
	const data = emailValidation(email);
	expect(data).toBe(true);
});

/* =========== INVALID TEST FOR EMAIL =========== */
test('Checking for Valid email address without first part', async () => {
	const data = emailValidation(email2);
	expect(data).toBe(false);
});
test('Checking for Valid email address without @', async () => {
	const data = emailValidation(email3);
	expect(data).toBe(false);
});
test('Checking for Valid email address without email provider', async () => {
	const data = emailValidation(email4);
	expect(data).toBe(false);
});
test('Checking for Valid email address without "."', async () => {
	const data = emailValidation(email5);
	expect(data).toBe(false);
});
test('Checking for Valid email address without ending part', async () => {
	const data = emailValidation(email6);
	expect(data).toBe(false);
});
test('Checking for Valid email address with only ending part', async () => {
	const data = emailValidation(email7);
	expect(data).toBe(false);
});
test('Checking for Valid email address with special characters', async () => {
	const data = emailValidation(email8);
	expect(data).toBe(false);
});
test('Checking for Valid email address with intiger numbers', async () => {
	const data = emailValidation(email9);
	expect(data).toBe(false);
});
test('Checking for Valid email address with intiger numbers', async () => {
	const data = emailValidation(email10);
	expect(data).toBe(false);
});
test('Checking for Valid email address with intiger numbers', async () => {
	const data = emailValidation(email11);
	expect(data).toBe(false);
});




/* =========== VALID TEST FOR PASSWORD =========== */
test('Checking for Valid password the proper one', async () => {
	const data = passwordValidator(password);
	expect(data).toBe(true);
});

/* =========== INVALID TEST FOR PASSWORD =========== */
test('Checking for Valid password without special character', async () => {
	const data = passwordValidator(password2);
	expect(data).toBe(false);
});
test('Checking for Valid password without numbers', async () => {
	const data = passwordValidator(password3);
	expect(data).toBe(false);
});
test('Checking for Valid password without upper case letter', async () => {
	const data = passwordValidator(password4);
	expect(data).toBe(false);
});
test('Checking for Valid password without smaller case letter', async () => {
	const data = passwordValidator(password5);
	expect(data).toBe(false);
});
test('Checking for Valid password with intiger numbers', async () => {
	const data = passwordValidator(password6);
	expect(data).toBe(false);
});
test('Checking for Valid password with empty string', async () => {
	const data = passwordValidator(password7);
	expect(data).toBe(false);
});
test('Checking for Valid password with only special characters', async () => {
	const data = passwordValidator(password8);
	expect(data).toBe(false);
});
test('Checking for Valid password with only numbers', async () => {
	const data = passwordValidator(password9);
	expect(data).toBe(false);
});
test('Checking for Valid password with only smaller case letter', async () => {
	const data = passwordValidator(password10);
	expect(data).toBe(false);
});
test('Checking for Valid password with only upper case letter', async () => {
	const data = passwordValidator(password11);
	expect(data).toBe(false);
});
test('Checking for Valid password with too short string', async () => {
	const data = passwordValidator(password12);
	expect(data).toBe(false);
});
test('Checking for Valid password with too long string', async () => {
	const data = passwordValidator(password13);
	expect(data).toBe(false);
});




/* =========== VALID TEST FOR NAMES =========== */
test('Checking for Valid first name and last name test1', async () => {
	const data = firstname_lastnameValidator(firstname_lastname);
	expect(data).toBe(true);
});
test('Checking for Valid first name and last name test2', async () => {
	const data = firstname_lastnameValidator(firstname_lastname2);
	expect(data).toBe(true);
});
test('Checking for Valid first name and last name test3', async () => {
	const data = firstname_lastnameValidator(firstname_lastname3);
	expect(data).toBe(true);
});
test('Checking for Valid first name and last name test4', async () => {
	const data = firstname_lastnameValidator(firstname_lastname4);
	expect(data).toBe(true);
});
test('Checking for Valid first name and last name test5', async () => {
	const data = firstname_lastnameValidator(firstname_lastname5);
	expect(data).toBe(true);
});
test('Checking for Valid first name and last name test6', async () => {
	const data = firstname_lastnameValidator(firstname_lastname6);
	expect(data).toBe(true);
});
test('Checking for Valid first name and last name test7', async () => {
	const data = firstname_lastnameValidator(firstname_lastname9);
	expect(data).toBe(true);
});
test('Checking for Valid first name and last name test8', async () => {
	const data = firstname_lastnameValidator(firstname_lastname10);
	expect(data).toBe(true);
});
test('Checking for Valid first name and last name test9', async () => {
	const data = firstname_lastnameValidator(firstname_lastname11);
	expect(data).toBe(true);
});
test('Checking for Valid first name and last name test10', async () => {
	const data = firstname_lastnameValidator(firstname_lastname12);
	expect(data).toBe(true);
});
test('Checking for Valid first name and last name test11', async () => {
	const data = firstname_lastnameValidator(firstname_lastname13);
	expect(data).toBe(true);
});

/* =========== INVALID TEST FOR NAMES =========== */
test('Checking for Valid first name and last name with intiger values', async () => {
	const data = firstname_lastnameValidator(firstname_lastname7);
	expect(data).toBe(false);
});
test('Checking for Valid first name and last name with empty string', async () => {
	const data = firstname_lastnameValidator(firstname_lastname8);
	expect(data).toBe(false);
});
test('Checking for Valid first name and last name too long string', async () => {
	const data = firstname_lastnameValidator(firstname_lastname14);
	expect(data).toBe(false);
});