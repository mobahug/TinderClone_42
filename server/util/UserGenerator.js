/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-const */
/* eslint-disable no-const-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-sequences */
/* eslint-disable no-cond-assign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable object-shorthand */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* const casual = require('casual');
 */
const { promises: fsPromises } = require('fs');
const crypto = require('crypto');
const { RandomUser } = require('random-user-api');
const fs = require('fs');
const beautify = require('json-beautify');

const randomUser = new RandomUser().format('json');
const bcrypt = require('bcrypt');
const { randomInt } = require('crypto');
const user = require('../models/User');
const likes = require('../models/Like');

const profile_picture = require('../models/Photo');

/* npm i json-beautify */
/* npm install fs */
/* npm i random-user-api */
/* npm i bcrypt */

/* ============= RANDOMBORNTIME GENERATOR ============= */

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    .toISOString()
    .slice(0, 10);
}

/* ============= RANDOMINDEX GENERATOR ============= */

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/* ============= RANDOMPREFERENCES GENERATOR ============= */

function preference() {

  let chance = Math.floor((Math.random() * 100) + 1);
  if (chance > 80)
	return 'both';
  if (chance > 40)
	return 'male';
  return 'female';
}

/* ============= RANDOMCITY GENERATOR ============= */

const rawdata2 = fs.readFileSync('../locations.json');
const userInfos2 = JSON.parse(rawdata2);

/* ============= RANDOMGENDER GENERATOR ============= */

function gender(gender_data) {
  const gender_array = ['male', 'female'];

  if (gender_data === 'Mr') return gender_array[0];

  if (gender_data === 'Ms') return gender_array[1];
  if (gender_data === 'Miss') return gender_array[1];
  if (gender_data === 'Mrs') return gender_array[1];
  return false;
}

/* ============= RANDOMCITY INDEX GENERATOR ============= */

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/* ============= RANDOMUSER GENERATOR SAVED INTO DATABASE ============= */

function biogenerator(firstname, birthdate, city, adjective) {
  const difference = new Date().getFullYear() - new Date(birthdate).getFullYear();
  const hello = ["Hi",
    "Hello",
    "Hey",
    "Hi-ya",
    "What''s up",
    "What''s happening"];
  const bye=[
    "Talk to you soon",
"I eagerly await our future meeting",
"I am happy for the opportunity to meet with you",
"Bye",
"bye-bye",
"So long"
  ]

  const relationship=[
    "friends",
    "sex",
    "dating",
    "casual relationship",
    "romance"
  ]

  return (
    hello[randomIntFromInterval(0, hello.length-1)]+'! im ' +
    firstname +
    ' from ' +
    city +
    '. Im ' +
    difference +
    ' years old. ' +
    'My personality is ' +
    adjective +
    '. Im looking for '+relationship[randomIntFromInterval(0, relationship.length-1)]+'. '+bye[randomIntFromInterval(0, bye.length-1)]+'!'
  );
}
async function asyncReadFileadj(filename) {
  try {
    const contents = await fsPromises.readFile(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);
    return arr;
  } catch (err) {
    console.log(err);
  }
  return null;
}
function generateEmail(username){
  randomAdress =  crypto.randomBytes(2).toString('hex');
  return username+"@"+randomAdress+".fi"

}

async function insertUsersToDB(userInfos) {
  const adjectives = await asyncReadFileadj('../english-adjectives.txt');
  let locationCounter = 0;
  for (const block in userInfos) {
    locationCounter += 1;
    const randomCityIndex = getRandomInt(6);
    const randomFame = randomIntFromInterval(1, 100);
    // const randomTags = randomIntFromInterval(1, 168);
    // const randomTagsNumber = randomIntFromInterval(0, 5);
    const randomPreference = getRandomInt(3);
    const randomYear = randomDate(new Date(1970, 0, 1), new Date(2006, 0, 1));
    const randomAdjective = adjectives[randomIntFromInterval(0, adjectives.length)];
    console.log(adjectives);

    const longitude_Gen = userInfos2[locationCounter].longitude;
    const latitude_Gen = userInfos2[locationCounter].latitude;
    const city = userInfos2[locationCounter].city;

    const username_Gen = userInfos[block].login.username;
    const firstname_Gen = userInfos[block].name.first;
    const lastname_Gen = userInfos[block].name.last;

    const password_Gen = 'asd';
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const encrypted_password = bcrypt.hashSync(password_Gen, salt);

    const email_Gen = generateEmail(username_Gen)
    const activationCode_Gen = userInfos[block].login.sha1;
    const gender_Gen = userInfos[block].name.title;

    const photo = userInfos[block].picture.large;

    const bio = biogenerator(firstname_Gen, randomYear, city, randomAdjective);
    const newuser = await user.createUser({
      username: username_Gen,
      firstname: firstname_Gen,
      lastname: lastname_Gen,
      password: encrypted_password,
      email: email_Gen,
      active: true,
      activation_code: activationCode_Gen,
      lost_password_code: 'blah',
      preference: preference(),
      gender: gender(gender_Gen),
      latitude: latitude_Gen,
      longitude: longitude_Gen,
      birthdate: randomYear,
      fame: randomFame,
      bio,
      wants_to_be_positioned: true,
    });

    /* ============= USERS GETTING PHOTOS TO PHOTO TABLE ============= */

    profile_picture.createPhoto({
      uri: photo,
      is_profile: true,
      user_id: newuser.rows[0].id,
    });

    /* ============= USERS GETTING RANDOMLY TAGS IN USERTAG TABLE ============= */

    for (let i = 0; i < randomIntFromInterval(1, 5); i += 1) {
      console.log(i);
      user.insertTag(newuser.rows[0].id, randomIntFromInterval(1, 168));
    }

    /* ============= USERS GETTING RANDOMLY OTHER USERS LIKES ============= */


    // likes.createLike({
    //   user_id: randomIntFromInterval(1, 9),
    //   liker_id: randomIntFromInterval(1, 9),
    // });

  }
}

/* ============= RANDOMUSER GENERATOR SAVED INTO JSON FILE ============= */

function userGenerator() {
  // only output name, email and nationality for 3
  randomUser
    .excludeAllFieldsBut('name')
    .and()
    .excludeAllFieldsBut('login')
    .and()
    .excludeAllFieldsBut('email')
    .and()
    .excludeAllFieldsBut('picture')
    .and()
    .excludeAllFieldsBut('location')
    .and()
    .nationality('fi')
    .and()
    .nationality('fi')
    .nationality('fi')
    .and()
    .nationality('fi')
    .nationality('fi')
    .and()
    .nationality('fi')
    .page(3)
    .nationality('fi')
    .count(100)
    .retrieve()
    .then((res) => {
      if (randomUser._format === 'json') {
        /* console.log(res); */
        /* console.log(`RES:${JSON.stringify(res)}`); */
        /* const dictstring = JSON.stringify(res); */
        const res2 = beautify(res, null, 2, 100);
        insertUsersToDB(res);
        fs.writeFileSync('../userGenerated_DB.json', res2, (err) => err && console.error(err));
      } else {
        console.log('something else');
      }
    })
    .catch((err) => console.log(`problem, err=${err}`));
}

userGenerator();

module.exports = { userGenerator };
