const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).send({
        success: false,
        message: "Email not entered",
      });
    }
    if (!req.body.name) {
      return res.status(400).send({
        success: false,
        message: "Name not entered",
      });
    }
    if (!req.body.password) {
      return res.status(400).send({
        success: false,
        message: "Password not entered",
      });
    }
    const userExist = await User.findOne({ email: req.body.email });

    if (userExist) {
      return res.status(400).send({
        success: false,
        message: "User Already Exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const newUser = new User(req.body);
    await newUser.save();
    return res.status(200).send({
      success: true,
      message: "Registration Successful, Please login",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).send({
        success: false,
        message: "Email not entered",
      });
    }
    if (!req.body.password) {
      return res.status(400).send({
        success: false,
        message: "Password not entered",
      });
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User does not exist",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).send({
        success: false,
        message: "Invalid Password",
      });
    }
    console.log("success");

    res.status(200).send({
      success: true,
      message: "User Logged in",
      data: token,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/currentUser", authMiddleware, async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
});

router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findOne({ _id: userId });

    const admin = user.isAdmin;
    if (admin) {
      const users = await User.find();
      return res.status(200).send({
        success: true,
        message: "User fetched successfully",
        data: users,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "User is not a admin",
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

//   try {

//     console.log(req.body);
//     const userId = req.body._id;
//     const newData = {...req.body.isBlocked};
//     const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true })
//     console.log(updatedUser);
//     if (!updatedUser) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.status(200).json(req.body);
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
router.patch("/block/:id", authMiddleware, async (req, res) => {
  try {
    console.log();
    const userId = req.params.id;
    console.log(userId);
    const newData = req.body.isBlocked;
    console.log(newData);
    const updatedUser = await User.findByIdAndUpdate(userId, {
      isBlocked: newData,
    });
    console.log(updatedUser);
    if (!updatedUser) {
      res.status(400).send({
        success: false,
        message: "User not Found",
        error: error.message,
      });
    }
    res.status(200).send({
      success: true,
      message: "User is Blocked / unblocked successfully",
    });
  } catch (error) {
    console.log("in error Block");
    console.error("Error updating user:", error);
    res.status(500).send({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
