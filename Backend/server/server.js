const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3001;

// Ensure 'recordings' directory exists
const recordingsPath = path.join(__dirname, "recordings");
if (!fs.existsSync(recordingsPath)) {
  fs.mkdirSync(recordingsPath);
}

// Use Multer with a temp name; we'll rename after upload
const upload = multer({ dest: recordingsPath });

app.use(cors());
app.use("/recordings", express.static(recordingsPath));

// Handle upload and rename the file after we get the username
app.post("/upload", upload.single("file"), (req, res) => {
  const username = req.body.username || "anonymous";
  const timestamp = Date.now();
  const ext = path.extname(req.file.originalname) || ".webm";
  const newFileName = `${username}-${timestamp}${ext}`;
  const newPath = path.join(recordingsPath, newFileName);

  fs.rename(req.file.path, newPath, (err) => {
    if (err) {
      console.error("Rename error:", err);
      return res.status(500).send("Server error");
    }
    res.json({
      message: "Uploaded successfully",
      url: `/recordings/${newFileName}`,
    });
  });
});

app.get("/feed", (req, res) => {
  fs.readdir(recordingsPath, (err, files) => {
    if (err) return res.status(500).send("Failed to read recordings folder");
    const feed = files.map((name) => ({
      id: name,
      user: {
        name: name.split("-")[0],
        avatar: "/image-5.png",
        role: "UI/UX Designer",
      },
      audioUrl: `http://localhost:3001/recordings/${name}`,
      timestamp: parseInt(name.split("-")[1]?.split(".")[0]) || Date.now(),
      likes: 0,
      comments: 0,
    }));
    res.json(feed);
  });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
