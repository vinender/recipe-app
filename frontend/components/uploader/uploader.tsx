import React, { useState,useEffect } from 'react';
import axios from 'axios';
import http from '../../utils/api/http';
   
const Uploader = ({ onImageUrlChange, recipe_image }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  console.log('profile pic',recipe_image)
  // Set the preview URL if recipe_image exists
  useEffect(() => {
    if (recipe_image) {
      setPreviewUrl(recipe_image);
    }
  }, [recipe_image]);

  const handleFileChange = async (file) => {
    setSelectedFile(file);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await http.post(`http://localhost:5000/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });  

      // Call the onImageUrlChange function with the uploaded image URL
      onImageUrlChange(response.data.imageUrl);

      // Set the preview URL for the uploaded image
      setPreviewUrl(URL.createObjectURL(file));
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  return (
    <div
      style={{
        margin: '20px',
        padding: '20px',
        border: '2px dashed #ccc',
        borderRadius: '5px',
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <p>Drag & drop your image here, or</p>
      {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100px', marginBottom: '10px' }} />}
      <input
        type="file"
        onChange={(e) => handleFileChange(e.target.files[0])}
        style={{ display: 'none' }}
        id="fileInput"
      />
      <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
        Click to select
      </label>
    </div>
  );
};

export default Uploader;

