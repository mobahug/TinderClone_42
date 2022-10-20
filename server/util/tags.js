const { promises: fsPromises } = require('fs');
const tags = require('../models/Tag');

async function asyncReadFile(filename) {
  try {
    const contents = await fsPromises.readFile(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);

    for (const block in arr) {
      tags.insert({
        name: arr[block],
      });
    }
  } catch (err) {
    // console.log(err);
  }
}

asyncReadFile('./tags.txt');
