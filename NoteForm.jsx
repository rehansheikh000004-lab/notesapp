import { useState } from "react";
import axios from "axios";

function NoteForm({ token, refreshNotes }) {
  const [content, setContent] = useState("");

  const handleAddNote = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/notes",
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContent("");
      refreshNotes();
    } catch (err) {
      alert("Error adding note: " + err.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Write a note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleAddNote}>Add Note</button>
    </div>
  );
}

export default NoteForm;