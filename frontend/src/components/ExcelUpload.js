import React, { useState } from 'react';

import axios from 'axios';
import './Excelupload.css';


const ExcelUpload = () => {
  const [file, setFile] = useState(null);

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post('http://localhost:5000/api/upload', formData);
      alert("File uploaded!");
    } catch (error) {
      alert("Upload failed!");
    }
  };

  return (
    <div className="excel-upload-container">
  <h3>Upload Candidate Excel File</h3>
  <input type="file" onChange={(e) => setFile(e.target.files[0])} />
  <button onClick={uploadFile}>Upload</button>
</div>

  );
};

export default ExcelUpload;
