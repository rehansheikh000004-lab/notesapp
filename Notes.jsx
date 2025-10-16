import { useEffect, useState } from "react";
import axios from "axios";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

function Notes({ token, setToken }) {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div>
      <h2>Your Notes</h2>
      <NoteForm token={token} refreshNotes={fetchNotes} />
      <NoteList notes={notes} token={token} refreshNotes={fetchNotes} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Notes;