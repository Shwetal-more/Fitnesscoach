const express = require("express");
const axios = require("axios");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());

// GET /
app.get("/", (req, res) => {
  res.render("index");
});

// POST /chat - API style support for fetch()
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post("http://127.0.0.1:5000/predict", {
      message: userMessage,
    });

    const reply = response.data.reply || "No response";
    res.json({ reply });
  } catch (err) {
    console.error("Error in /chat:", err.message);
    res.status(500).json({ reply: "Error talking to chatbot." });
  }
});

// WebSocket
io.on("connection", (socket) => {
  console.log("Socket connected");

  socket.on("userMessage", async (msg) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        message: msg,
      });

      const reply = response.data.reply;
      socket.emit("botMessage", reply);
    } catch (error) {
      socket.emit("botMessage", "Sorry, something went wrong.");
    }
  });
});

http.listen(8080, () => {
  console.log("Server running at http://localhost:8080");
});
