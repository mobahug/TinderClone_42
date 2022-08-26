/* eslint-disable no-await-in-loop */
/* eslint-disable no-unreachable-loop */
/* eslint-disable consistent-return */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-bitwise */
/* eslint-disable no-undef */
/* eslint-disable camelcase */

const { promises: fsPromises } = require('fs');
const tags = require('../models/Tag');

async function asyncReadFile(filename) {
  try {
    const contents = await fsPromises.readFile(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);

    for (const block in arr) {
      tags.createTag({
        name: arr[block],
      });
    }
  } catch (err) {
    console.log(err);
  }
}

asyncReadFile('../tags.txt');
