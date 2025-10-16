import React, { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Registration successful! You can now log in.");
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage("❌ Something went wrong. Try again later.");
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #101010, #1c1c1c)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#181818",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 0 15px rgba(255,255,255,0.1)",
          width: "320px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "600",
            fontSize: "1.5rem",
            letterSpacing: "1px",
          }}
        >
          Create Account
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#007bff",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            fontWeight: "600",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          Register
        </button>

        {message && (
          <p
            style={{
              textAlign: "center",
              marginTop: "15px",
              color: "#ccc",
              fontSize: "0.9rem",
            }}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  background: "#222",
  border: "1px solid #333",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "0.9rem",
  outline: "none",
};

export default Register;