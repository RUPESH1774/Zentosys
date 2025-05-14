const express = require("express");
const {
  getNotes, getNote, createNote, updateNote, deleteNote
} = require("../controllers/notesController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.use(auth);

router.get("/", getNotes);
router.get("/:id", getNote);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
