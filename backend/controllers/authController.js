const user = require("../models/userSchema");
const { createToken } = require("../middleware/jwtMiddleware");
const bcrypt = require("bcryptjs");
const maxAge = 15 * 24 * 60 * 60;

// Register User
module.exports.registerUser = async (req, res, next) => {
  try {
    let image = "";
    const { name, email, password } = req.body;
    if (req.file) {
      image = req.file.buffer.toString("base64");
    }
    if (name && email && password && image) {
      const check = await user.findOne({ email });
      if (check) {
        res.status(404).json({
          success: false,
          message: "Email Already Registred",
        });
      } else {
        const data = new user({
          name,
          email,
          password,
          image,
        });
        await data
          .save()
          .then((result) => {
            const token = createToken(result._id);
            res.cookie("authToken", token, {
              httpOnly: true,
              maxAge: maxAge * 1000,
            });
            res
              .status(200)
              .json({ success: true, message: "Register Successfully" });
          })
          .catch((err) => {
            res.status(404).json({
              success: false,
              message: "Registration Error",
            });
          });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "All field are required",
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Login User
module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const emailExist = await user.findOne({ email });
      if (emailExist) {
        const check = await bcrypt.compare(password, emailExist.password);
        if (check) {
          const token = createToken(emailExist._id);
          res.cookie("authToken", token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
          });
          res.status(200).json({
            success: true,
            message: "Login Successfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Invalid email and password",
          });
        }
      } else {
        res
          .status(400)
          .json({ success: false, message: "User is not registered" });
      }
    } else {
      res
        .status(400)
        .json({ success: false, message: "Email and password required" });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Logout User
module.exports.logoutUser = (req, res) => {
  try {
    res.clearCookie("authToken");
    const data = res.locals.user;
    res.status(200).json({
      success: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
