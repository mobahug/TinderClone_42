/* eslint-disable no-bitwise */
/* eslint-disable no-undef */
/* eslint-disable camelcase */

const fs = require('fs');

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomtags() {
  const data = fs.readFileSync('./tags.txt', 'utf8');
  const randomLines = (str, count) =>
    str
      .split(/\r?\n/)
      .reduce(
        (p, _, __, arr) =>
          p[0] < count
            ? [p[0] + 1, p[1].concat(arr.splice((Math.random() * arr.length) | 0, 1))]
            : p,
        [0, []]
      )[1];
  const res = randomLines(data, randomIntFromInterval(1, 5));
  return res;
}

// console.log(randomtags());
