const express = require("express");
const { updateUser, getUserProfile, validUser } = require("../controllers/userController");
const app = express();
const { checkUser } = require("../middleware/jwtMiddleware");
const router = app.use(express.Router());
const multer = require("multer");

// Setup configuration for multer memoryStorage (buffer)
const bufferStorage = multer.memoryStorage();
const upload = multer({ storage: bufferStorage });

router.put("/user", checkUser, upload.single("image"), updateUser);

router.get("/profile", checkUser, getUserProfile);

router.get("/valid", checkUser, validUser);

module.exports = router;