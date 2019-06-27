//mail server via nodemailer 

const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "justinaiello@gmail.com",
    pass: "RDhwLqjXbyKGUHZ1"
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
    <p>${text}</p>
  </div>
`;

exports.transport = transport;
exports.makeEmail = makeEmail;