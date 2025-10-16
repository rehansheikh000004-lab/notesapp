import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// ✅ REGISTER USER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check for existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.json({ message: "✅ Registration successful!" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "❌ Server error during registration" });
  }
});

// ✅ LOGIN USER
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "❌ Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "❌ Invalid credentials" });

    // Create JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );

    res.json({
      message: "✅ Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "❌ Server error during login" });
  }
});

export default router;