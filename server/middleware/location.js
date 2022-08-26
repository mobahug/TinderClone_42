/* eslint-disable camelcase */
const geoip = require('geoip-lite');




module.exports = function (req, res, next) {
    let now = new Date();
    let nowUnix = +new Date()/1000;
    let ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    const geo = geoip.lookup(ip);
    req.geo = geo;
    console.log(ip)
    console.log(geo)
    next();
}