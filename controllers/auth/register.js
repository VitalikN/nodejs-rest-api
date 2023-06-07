const bcrypt = require("bcryptjs");

const { nanoid } = require("nanoid");

const gravatar = require("gravatar");

const { User } = require("../../models/user");

const { HttpError, sendEmail } = require("../../helpers");

const { PROJECT_URL } = process.env;

const { ctrlWrapper } = require("../../decorators");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email);

  /**
   const salt = await bcrypt.genSalt(10);
   * const hashedPassword = await bcrypt.hash(password, salt);
   */
  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationToken = nanoid();

  const compareHashedPassword = await bcrypt.compare(password, hashedPassword);

  console.log(compareHashedPassword);

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<h1>Verify your email</h1>
     <p>Please click the link below to verify your email</p>
     <p><a target="_blank" href="${PROJECT_URL}/api/auth/verify/${verificationToken}">${verificationToken}</a></p>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};
module.exports = {
  register: ctrlWrapper(register),
};
