const express = require("express");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const notesRoutes = require("./routes/notesRoutes");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Database Connection
require("./db/dbConnection");

// Models
const user = require("./models/userSchema");
const notes = require("./models/notesSchema");

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", notesRoutes);

// Start the server
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
