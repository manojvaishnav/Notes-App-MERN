const { checkUser } = require("../middleware/jwtMiddleware");
const user = require("../models/userSchema");

// Get User Profile
module.exports.getUserProfile = async (req, res, next) => {
  try {
    const userId = res.locals.user._id;
    await user
      .findOne({ _id: userId })
      .then((data) => {
        res.status(200).json({
          success: true,
          message: data,
        });
      })
      .catch((err) => {
        res.status(404).json({
          success: false,
          message: "User Not Found",
        });
      });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Update User
module.exports.updateUser = async (req, res, next) => {
  try {
    const updatedValue = req.body;
    if (req.file) {
      const image = req.file.buffer.toString("base64");
      updatedValue.image = image;
    }
    if (updatedValue.name && updatedValue.email) {
      const id = res.locals.user.id;
      await user
        .findByIdAndUpdate({ _id: id }, { $set: updatedValue }, { new: true })
        .then((updatedData) => {
          res.status(200).json({ updatedData });
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      res.status(404).json({
        success: false,
        message: "Name and email is required",
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Check User Login Or not
module.exports.validUser = async (req, res, next) => {
  try {
    const userId = res.locals.user._id;
    if (userId) {
      const data = await user.findById({ _id: userId });
      res.status(200).json({
        success: true,
        message: data.name,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Invalid User",
      });
    }
  } catch (error) {
    res.status(200).json({
      success: false,
    });
  }
};
