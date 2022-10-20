const nodemailer = require('nodemailer');

function sendMail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/bin/msmtp',
  });

  transporter.sendMail(
    {
      from: 'freecss2022@outlook.com',
      to,
      subject,
      text,
    },
    (err, info) => {
      // console.log(err);
      // console.log(info?.envelope);
      // console.log(info?.messageId);
    }
  );
}
module.exports = sendMail;
