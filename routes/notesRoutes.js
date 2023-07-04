const express = require("express");
const {
  readNotes,
  updateNotes,
  deleteNotes,
  createNotes,
  readSingleNotes,
} = require("../controllers/notesController");
const { checkUser } = require("../middleware/jwtMiddleware");

const app = express();
const router = app.use(express.Router());

// Routing

//Create Notes
router.post("/notes", checkUser, createNotes);

//Read All Notes
router.get("/notes", checkUser, readNotes);

// Update A Notes
router.put("/notes/:_id", checkUser, updateNotes);

// Delete A notes
router.delete("/notes/:_id", checkUser, deleteNotes);

// Get single notes
router.get("/notes/:_id", checkUser, readSingleNotes);

module.exports = router;
