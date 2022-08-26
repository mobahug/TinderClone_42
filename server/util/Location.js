/* eslint-disable camelcase */
const geoip = require('geoip-lite');
const distance = require('gps-distance');

const ip = '2001:14bb:639:17c8:c144:cb0f:4775:fab7';
const ip2 = '168.56.18.74';
const geo = geoip.lookup(ip);
const geo2 = geoip.lookup(ip2);
// Distances are returned in kilometers and computed using the Haversine formula.
const result = distance(geo.ll[0], geo.ll[1], geo2.ll[0], geo2.ll[1]);
console.log(result);



