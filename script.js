const BASE_URL = "https://notesapp-backend.onrender.com"; // your Render URL
let currentUserId = null;

// Signup
async function signup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  alert(data.message);
}

// Login
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();

  if (data.userId) {
    currentUserId = data.userId;
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("notes-section").style.display = "block";
    loadNotes();
  } else {
    alert(data.message);
  }
}

// Add Note
async function addNote() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  await fetch(`${BASE_URL}/api/notes`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ userId: currentUserId, title, content })
  });

  loadNotes();
}

// Load Notes
async function loadNotes() {
  const res = await fetch(`${BASE_URL}/api/notes/${currentUserId}`);
  const notes = await res.json();

  const notesDiv = document.getElementById("notes");
  notesDiv.innerHTML = "";
  notes.forEach(note => {
    const div = document.createElement("div");
    div.className = "note";
    div.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p>`;
    notesDiv.appendChild(div);
  });
}
