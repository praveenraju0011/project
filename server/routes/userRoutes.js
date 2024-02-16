const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

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

router.post("/login", async (req, res) => {
  try {
 
    const user = await User.findOne({ email: req.body.email });
   
    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist",
      });
    }
   
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.send({
        success: false,
        message: "Invalid Password",
      });
    }
   
    res.send({
      success: true,
      message: "User Logged in",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
