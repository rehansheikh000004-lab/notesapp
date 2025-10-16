import axios from "axios";

function NoteList({ notes, token, refreshNotes }) {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      refreshNotes();
    } catch (err) {
      alert("Error deleting note: " + err.message);
    }
  };

  return (
    <ul>
      {notes.map((note) => (
        <li key={note._id}>
          {note.content}
          <button onClick={() => handleDelete(note._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;