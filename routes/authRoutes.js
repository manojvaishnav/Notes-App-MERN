const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");
const multer = require("multer");
const app = express();
const router = app.use(express.Router());

// Setup configuration for multer memoryStorage (buffer)
const bufferStorage = multer.memoryStorage();
const upload = multer({ storage: bufferStorage });

// Routing
router.post("/register", upload.single("image"), registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
