/* eslint-disable consistent-return */
/* eslint-disable no-unreachable-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */

const fs = require('fs');
const beautify = require('json-beautify');



const rawdata_locations = fs.readFileSync("../locations.json");
const userInfos_locations = JSON.parse(rawdata_locations);
const res2 = beautify(userInfos_locations, null, 2, 10);
fs.writeFileSync('../locations.json', res2);

console.log(res2);
