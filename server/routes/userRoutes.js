const router = require("express").Router();
const bcrypt = require('bcryptjs')
const User = require("../model/userModel");

router.post("/register", async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
      return res.send({
        success: false,
        message: "User Already Exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const newUser = new User(req.body);
    await newUser.save();
    return res.send({
      success: true,
      message: "Registration Successful, Please login",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
