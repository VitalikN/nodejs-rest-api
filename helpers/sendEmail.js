const nodemailer = require("nodemailer");

require("dotenv").config();

const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: UKR_NET_EMAIL };
  try {
    await transporter.sendMail(email);
    console.log("Succsess");
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = sendEmail;