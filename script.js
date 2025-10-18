// --- Configuration ---
const backendURL = "https://notesapp-nmpz.onrender.com"; // Your Render backend URL

// --- Elements ---
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const notesSection = document.getElementById("notesSection");
const notesList = document.getElementById("notesList");
const noteForm = document.getElementById("noteForm");
const logoutBtn = document.getElementById("logoutBtn");

// --- Local Storage for Logged-in User ---
function saveUser(userId) {
  localStorage.setItem("userId", userId);
}

function getUser() {
  return localStorage.getItem("userId");
}

function logout() {
  localStorage.removeItem("userId");
  location.reload();
}

// --- Signup ---
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const res = await fetch(`${backendURL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert("Signup failed. Try again.");
      console.error(err);
    }
  });
}

// --- Login ---
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const res = await fetch(`${backendURL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.userId) {
        saveUser(data.userId);
        alert("Login successful!");
        window.location.href = "notes.html";
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      alert("Login failed. Try again.");
      console.error(err);
    }
  });
}

// --- Fetch Notes ---
async function fetchNotes() {
  const userId = getUser();
  if (!userId) return alert("Please login first.");

  try {
    const res = await fetch(`${backendURL}/api/notes/${userId}`);
    const notes = await res.json();

    notesList.innerHTML = "";
    notes.forEach((note) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${note.title}</strong><br>${note.content}
        <button onclick="deleteNote('${note._id}')">Delete</button>
      `;
      notesList.appendChild(li);
    });
  } catch (err) {
    console.error("Error fetching notes:", err);
  }
}

// --- Add Note ---
if (noteForm) {
  noteForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userId = getUser();
    if (!userId) return alert("Please login first.");

    const title = e.target.title.value;
    const content = e.target.content.value;

    try {
      const res = await fetch(`${backendURL}/api/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, title, content }),
      });

      const data = await res.json();
      alert(data.message);
      e.target.reset();
      fetchNotes();
    } catch (err) {
      alert("Failed to add note.");
      console.error(err);
    }
  });
}

// --- Delete Note ---
async function deleteNote(noteId) {
  try {
    const res = await fetch(`${backendURL}/api/notes/${noteId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    alert(data.message);
    fetchNotes();
  } catch (err) {
    console.error("Delete failed:", err);
  }
}

// --- Logout ---
if (logoutBtn) logoutBtn.addEventListener("click", logout);

// --- Auto Load Notes ---
if (notesSection) {
  fetchNotes();
}