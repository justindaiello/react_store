//mail server via nodemailer 

const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: host: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
});

//template the email

const makeEmail = text => `
  <div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: arial;
    font-size 15px;
  ">
    <h2>Hi!<h2>
    <p>{text}</p>
  </div>
`;

exports.transport = transport;
exports makeEmail = makeEmail;