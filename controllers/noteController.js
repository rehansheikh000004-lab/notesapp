import Note from "../models/Note.js";

// 🟢 Create a new note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    const note = new Note({ userId, title, content });
    await note.save();

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Failed to create note", error: error.message });
  }
};

// 🟢 Get all notes (with search, filter, sort)
export const getNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const { search, startDate, endDate, sort } = req.query;

    let query = { userId };

    // 🔍 Search by keyword
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    // 📅 Filter by date range
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // 🕒 Sort (default: newest first)
    const sortOrder = sort === "oldest" ? 1 : -1;

    const notes = await Note.find(query).sort({ createdAt: sortOrder });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notes", error: error.message });
  }
};

// 🟢 Update a note
export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, content },
      { new: true }
    );

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Failed to update note", error: error.message });
  }
};

// 🟢 Delete a note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete note", error: error.message });
  }
};