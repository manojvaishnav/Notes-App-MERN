const notes = require("../models/notesSchema");

// Create Notes
module.exports.createNotes = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    if (title && content) {
      const notesData = new notes({
        title,
        content,
        tags,
        userId: res.locals.user._id,
      });
      await notesData
        .save()
        .then(() => {
          res.status(200).json({
            success: true,
            message: "Notes created successfully",
          });
        })
        .catch((err) => {
          res.status(404).json({
            success: false,
            message: err.message,
          });
        });
    } else {
      res.status(404).json({
        success: false,
        message: "Title and content are mandatory",
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Read Notes
module.exports.readNotes = async (req, res, next) => {
  try {
    const userId = res.locals.user._id;
    await notes
      .find({ userId: userId }, { userId: 0 })
      .then((data) => {
        res.status(200).json({
          success: true,
          message: data,
        });
      })
      .catch((err) => {
        res.status(404).json({
          success: false,
          message: "Something went wrong",
        });
      });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Update Notes
module.exports.updateNotes = async (req, res, next) => {
  try {
    const notesId = req.params._id;
    const updatedValue = req.body;
    if (updatedValue.title && updatedValue.content) {
      await notes
        .findByIdAndUpdate({ _id: notesId }, updatedValue, { new: true })
        .then(() => {
          res.status(200).json({
            success: true,
            message: "Notes updated successfully",
          });
        })
        .catch((err) => {
          res.status(404).json({
            success: false,
            message: "Something went wrong",
          });
        });
    } else {
      res.status(404).json({
        success: false,
        message: "Title and content are mandatory",
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// Delete Notes
module.exports.deleteNotes = async (req, res, next) => {
  try {
    const notesId = req.params._id;
    await notes.findByIdAndDelete({ _id: notesId }).then(() => {
      res.status(200).json({
        success: true,
        message: "Notes Delete Successfully",
      });
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//Get a single notes
module.exports.readSingleNotes = async (req, res, next) => {
  try {
    const userId = res.locals.user._id;
    const notesId = req.params._id;
    await notes
      .find({ _id: notesId, userId: userId }, { userId: 0 })
      .then((data) => {
        res.status(200).json({
          success: true,
          message: data,
        });
      })
      .catch((err) => {
        res.status(404).json({
          success: false,
          message: "Something went wrong",
        });
      });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
