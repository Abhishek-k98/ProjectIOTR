// server.js
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require("fs")
const app = express();
const cors = require('cors');
const port = 5000;

app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'uploadedSongs')));
app.use(cors());

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const uploadedFile = req.files.files; // Use the field name "files"
  
  // Generate a simple hash using Math.random() and current timestamp
  const uniqueHash = Math.random().toString(36).substr(2, 5); // Adjust the length as needed

  // Append the hash to the original file name
  const uniqueFileName = `${uniqueHash}_${uploadedFile.name}`;

  // Construct the upload path
  const uploadPath = path.join(__dirname.replace("backend", "audio-player-app"), 'public', "songs", uniqueFileName);
  console.log("PathName", uploadPath);

  uploadedFile.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);
    res.send({ success: true, message: 'File uploaded!', fileName: uniqueFileName });
  });
});


app.get('/songs', (req, res) => {
  const uploadPath = path.join(__dirname.replace("backend", "audio-player-app"), 'public', 'songs');

  fs.readdir(uploadPath, (err, files) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ success: false, error: 'Failed to fetch media list' });
    }

    const audioFileExtensions = ['.mp3', '.m4a', '.wav', '.ogg'];
    const mediaList = files.filter(file => audioFileExtensions.some(ext => file.endsWith(ext)));
    res.json({ success: true, mediaList });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

