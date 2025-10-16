import React from "react";

const NoteCard = ({ note, onDelete }) => {
  return (
    <div style={styles.card}>
      <p style={styles.content}>{note.content}</p>
      <div style={styles.actions}>
        <small>{new Date(note.createdAt).toLocaleString()}</small>
        <button style={styles.deleteBtn} onClick={onDelete}>
          🗑️
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "0.2s",
  },
  content: {
    marginBottom: "10px",
    color: "#333",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteBtn: {
    background: "transparent",
    border: "none",
    color: "#e63946",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default NoteCard;