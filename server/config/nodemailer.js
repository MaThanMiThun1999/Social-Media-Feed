const nodemailer = require("nodemailer");
const { MAILER_EMAILID, MAILER_PASSWORD, APP_NAME } = require("./envConfig");

// Create the transporter object
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAILER_EMAILID,
    pass: MAILER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Function to send email
const sendEmail = async (options) => {
  const mailOptions = {
    from: `"${APP_NAME}" <${MAILER_EMAILID}>`,
    to: options.to,
    subject: options.subject, 
    text: options.text,
    html: options.html, 
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;