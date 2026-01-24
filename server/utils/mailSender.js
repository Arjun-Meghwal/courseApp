const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  return await transporter.sendMail({
    from: `"OTP Service" <${process.env.MAIL_USER}>`,
    to: email,
    subject: title,
    html: body,
  });
};

module.exports = mailSender;
