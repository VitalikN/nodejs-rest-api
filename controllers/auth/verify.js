const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const { ctrlWrapper } = require("../../decorators");

const verify = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  res.json({
    message: "Verification email sent",
  });
};

module.exports = {
  verify: ctrlWrapper(verify),
};
