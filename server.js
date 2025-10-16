import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("Mongo connect error:", err.message));

// (Add your API routes below, e.g. auth & notes)
// app.use('/api/auth', authRoutes); app.use('/api/notes', notesRoutes);

// Serve frontend build (for production)
const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const buildPath = path.join(__dirname, "../frontend/dist"); // Vite default output is /dist
app.use(express.static(buildPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(Server));