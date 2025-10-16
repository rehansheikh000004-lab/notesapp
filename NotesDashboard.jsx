import { useEffect, useState } from "react";

function NotesDashboard({ token }) {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");

  // Fetch Notes
  useEffect(() => {
    fetch("http://localhost:5000/api/notes", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, [token]);

  // Add Note
  const addNote = async () => {
    const res = await fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: note, content: "" }),
    });
    const data = await res.json();
    setNotes([...notes, data]);
    setNote("");
  };

  return (
    <div>
      <h2>Notes Dashboard</h2>
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write a note..."
      />
      <button onClick={addNote}>Add</button>
      <ul>
        {notes.map((n) => (
          <li key={n._id}>{n.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default NotesDashboard;