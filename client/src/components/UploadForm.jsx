import React, { useState } from "react";
import { uploadXML } from "../services/api";
import "./UploadForm.css"; // Import the CSS file for styling

const UploadForm = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    try {
      await uploadXML(file);
      onUploadSuccess(); // Notify parent component of success
      setFile(null); // Reset file input
    } catch (err) {
      setError("Error uploading file. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".xml" onChange={handleFileChange} />
      <button type="submit">Upload XML</button>
      {error && <p className="error">{error}</p>}{" "}
      {/* Use error class for styling */}
    </form>
  );
};

export default UploadForm;
