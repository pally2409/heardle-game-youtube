// backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();

// ✅ MUST be before routes
app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());

// ✅ Test route
app.post("/api/playlist", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.json({ message: "✅ CORS is working!" });
});

app.listen(5000, () => {
  console.log("✅ Backend running at http://localhost:5000");
});

