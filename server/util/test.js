const isEmailExsist = require('../models/User');



async function isEmailExsistValidator(newEmail) {
	const exsistingEmails = await isEmailExsist.getAllUsers();
	for (const block in exsistingEmails) {
		if (newEmail === exsistingEmails[block].email) {
			console.log('Email already exsist!');
			return false;
		}
	}
	console.log('Success!');
	return true;
}

const email = 'asd@d9a3.fi';

isEmailExsistValidator(email)
