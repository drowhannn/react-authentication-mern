const User = require("../models/User");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    res.status(201).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      user,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "Email and Password are required",
    });
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      res.status(404).json({
        success: false,
        error: "Incorrect Password",
      });
    }

    res.status(200).json({
      success: true,
      token: "tadgagag",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.forgotPassword = (req, res, next) => {
  res.send("Forgot Password Route");
};

exports.resetPassword = (req, res, next) => {
  res.send("Reset Password Route");
};
