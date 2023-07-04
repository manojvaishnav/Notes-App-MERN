const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  content: {
    type: String,
    default: "",
  },
  tags: {
    type: Array,
    default: [],
  },
  userId: {
    type: Object,
  },
});

const notes = new mongoose.model("notes", notesSchema);

module.exports = notes;
