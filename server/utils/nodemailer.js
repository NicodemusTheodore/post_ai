const nodemailer = require("nodemailer");
const USER = process.env.USER;
const PASS = process.env.PASS;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: USER,
    pass: PASS,
  },
});

const sendConfirmationEmail = (name, email, verificationCode) => {
  transport
    .sendMail({
      from: USER,
      to: email,
      subject: "Please verify your account",
      html: `
    <div>
        <h1>Email Verification</h1>
        <h2>Hi ${name},</h2>
        <p>Please verify your email address by clicking on the following link</p>
        <a href="http://localhost:3000/auth/verify/${verificationCode}"> Click here</a>
        <p>If you did not do any of this, please ignore this email.</p>
    </div>
    `,
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = sendConfirmationEmail;
