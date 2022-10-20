module.exports = errorLogger = (req, res, next) => {
  // next();
  // if (process.env.LOGGING == 'FALSE') {
  //   next();
  // }
  // //if (env) devmode == false: next()
  // console.log('=============================');
  // console.log(
  //   new Date().toLocaleTimeString('en-US', {
  //     hour12: false,
  //     hour: 'numeric',
  //     minute: 'numeric',
  //     second: 'numeric',
  //   }) +
  //     ' ' +
  //     req.method +
  //     ' ' +
  //     req.originalUrl
  // );
  // console.log('user: ' + req?.user?.id);
  // // console.log('req.body:');
  // console.log(req.body);
  // // console.log(req.rawHeaders);

  // for (const [key, value] of Object.entries(req.validationResult)) {
  //   if (key == 'passed') {
  //   } else if (value.valid == true) {
  //     console.log('\x1b[32m✓\x1b[0m', key, '\t"' + req.body[key] + '"\t\t', value.reason);
  //   } else {
  //     console.log('\x1b[31m✕', key, '\t"' + req.body[key] + '"\t\t', value.reason, '\x1b[0m');
  //   }
  // }
  // console.log('=============================');
  next();
};
