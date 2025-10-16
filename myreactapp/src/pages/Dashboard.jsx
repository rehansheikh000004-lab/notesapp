// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const token = localStorage.getItem("token");

  // Fetch notes
  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add or Update Note
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingNoteId) {
        await axios.put(
          `http://localhost:5000/api/notes/${editingNoteId}`,
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEditingNoteId(null);
      } else {
        await axios.post(
          "http://localhost:5000/api/notes",
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setTitle("");
      setContent("");
      fetchNotes();
    } catch (err) {
      console.error("Error saving note:", err);
    }
  };

  // Delete Note
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  // Edit Note
  const handleEdit = (note) => {
    setEditingNoteId(note._id);
    setTitle(note.title);
    setContent(note.content);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📝 My Notes</h2>

      <form className="note-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">
          {editingNoteId ? "Update Note" : "Add Note"}
        </button>
      </form>

      <div className="notes-list">
        {notes.map((note) => (
          <div key={note._id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className="note-actions">
              <button onClick={() => handleEdit(note)}>✏️ Edit</button>
              <button onClick={() => handleDelete(note._id)}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;