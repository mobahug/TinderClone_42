/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

const geoip = require('geoip-lite');

function isValidLatitude(latitude) {

    if (Number.latitude) {
        if (latitude >= -90 && latitude <= 90) {
            return 1;
        }
        return 0;
    }
    return 0;
}

function isValidLongitude(longitude) {

    if (Number.longitude) {
        if (longitude >= -180 && longitude <= 180) {
            return 1;
        }
        return 0;
    }
    return 0;
}

function geoChecker(ipaddress) {
    try {
        const geoloc = geoip.lookup(ipaddress);
        /* console.log(geoloc.ll[0]); */
        const checkLatitude = isValidLatitude(geoloc.ll[0]);
        const checkLongitude = isValidLongitude(geoloc.ll[1]);
/*         console.log('');
        console.log(geoloc.ll[0]);
        console.log(geoloc.ll[1]); */
        if ((checkLatitude && checkLongitude) != null) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(`You had an error in geoChecker function!${error}`);
        }
	/* giving longitude, latitude */
    /* !!!!NEED TO FIX STILL IF ITS AN ERROR!!!! */
    return false;
}

const isUserExsist = require('../models/User');



async function usernameValidator(newUsername) {

	const exsistingUsernames = await isUserExsist.getAllUsers();
	for (const block in exsistingUsernames) {
		if (newUsername === exsistingUsernames[block].username) {
			console.log('Username already exsist!');
			return false;
		}
	}
	console.log('Success!');
	return true;
}

const name = 'gabor';

usernameValidator(name)





/* npm install validator */
function emailValidation(email) {
    const emailRegex = /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!email) {
        return false;
    }

    if(email.length > 254) {
        return false;
    }

    const valid = emailRegex.test(email);
    if(!valid) {
        return false;
    }

    // Further checking of some things regex can't handle
    const parts = email.split("@");
    if(parts[0].length > 64) {
        return false;
    }

    const domainParts = parts[1].split(".");
    if(domainParts.some((part) => part.length > 63)) {
        return false;
    }
    return true;

}


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







function passwordValidator(password) {
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const number = /[0-9]/;
    const specialChars = /[^a-zA-Z\d]/;


    const match_uppercase = uppercase.test(password);
    const match_lowercase = lowercase.test(password);
    const match_number = number.test(password);
    const match_specialChars = specialChars.test(password);


    if (match_uppercase && match_lowercase &&
        match_number && match_specialChars &&
        password.length > 8 && password.length < 20) {
            return true;
        }
    return false;

}



/* function isString (input) {
    return typeof input === 'string' &&
    Object.prototype.toString.call(input) === '[object String]'
} */
function firstname_lastnameValidator(firstname_lastname) {
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const number = /[0-9]/;
    const specialChars = /[^a-zA-Z\d]/;


    const match_uppercase = uppercase.test(firstname_lastname);
    const match_lowercase = lowercase.test(firstname_lastname);
    const match_number = number.test(firstname_lastname);
    const match_specialChars = specialChars.test(firstname_lastname);


    if ((match_uppercase || match_lowercase ||
        match_number || match_specialChars) &&
        firstname_lastname.length < 20) {
            return true;
        }
    return false;
}

module.exports = {
    geoChecker,
    emailValidation,
    passwordValidator,
    firstname_lastnameValidator,
    usernameValidator,
    isEmailExsistValidator
}
/* still not working */
/* userValidator('Gabor'); */

