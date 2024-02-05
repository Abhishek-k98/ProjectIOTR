
import React, { useState, useEffect } from 'react';

const FileUpload = ({ onFileUpload, showUploading }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event);
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
      setSelectedFile(null);
    }
  };


  return (
    <>
      <div className="btn btn-danger">
        <input type="file" onChange={handleFileChange}  />
        {!!selectedFile && <button onClick={handleUpload} type="button" className="btn btn-warning">Upload</button>}
      </div>
      {showUploading && <h6>Uploading Song........</h6>}
    </>
  );
};

export default FileUpload;
