
import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import FileUpload from './FileUpload';
import Footer from './Footer';
import axios from 'axios';

const App = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [showUploading, setUploading] = useState(false)
  

  useEffect(() => {
    // Fetch audio files from the server
    setUploading(true)
    axios.get('http://localhost:5000/songs')
      .then(response => {
        setAudioFiles(response.data.mediaList)
        setUploading(false)

      })
      .catch(error => {
        console.error('Error fetching audio files:', error)
        setUploading(false)
      });
  }, []);

const handleFileUpload = (file) => {
  setUploading(true)
  const formData = new FormData();
  formData.append("files", file.target.files[0]);

  // Simulate a POST request to the server
  const config = { 
    headers: { 
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Method": "*", 
      "Content-Type": "multipart/form-data"
    }
  };

  axios.post('http://localhost:5000/upload', formData, config)
    .then(response => {
      const fileName = response.data.fileName;
      console.log('File uploaded:', response.data);
      setAudioFiles((prevFiles) => [...prevFiles, fileName]);
      setUploading(false)
    })
    .catch(error => {
      console.error('Error uploading file:', error)
      setUploading(false)
    });
};


    const [mode, setMode] =useState('light'); // whether dark mode is enabled or not
  
    const toggleMode=()=>{
      if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = 'grey';
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  }
  

  return (
     <>
      <Navbar mode={mode} toggleMode={toggleMode}/>
      <div className="container my-3">
        <div className="container my-2">
          <h1>{"Audio Player App"}</h1>
        </div>
          <FileUpload onFileUpload={handleFileUpload} showUploading={showUploading} />
        <div>
          <h2>{"Audio Files"}</h2>
          <ul>
            {audioFiles.map((audioFile) => (
              <li key={audioFile}>
                {audioFile?.split("_")?.slice(1)?.join(" ")}
                <audio controls>
                  <source src={`/songs/${audioFile}`} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>

  );
};

export default App;
