const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {

    const transporter = nodemailer.createTransport({

      host: process.env.MAIL_HOST,

      port: process.env.MAIL_PORT,

      secure: false,

      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },

    });

    const info = await transporter.sendMail({

      from: process.env.MAIL_USER,

      to: email,

      subject: title,

      html: body,

    });

    console.log("Mail Sent");

    return info;

  } catch (error) {

    console.log(error);

    throw error;

  }
};

module.exports = mailSender;