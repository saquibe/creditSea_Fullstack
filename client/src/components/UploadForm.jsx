import React, { useState } from "react";
import { uploadXML } from "../services/api";
import "./UploadForm.css";

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
      onUploadSuccess();
      setFile(null);
    } catch (err) {
      setError("Error uploading file. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".xml" onChange={handleFileChange} />
      <button type="submit">Upload XML</button>
      {error && <p className="error">{error}</p>}{" "}
    </form>
  );
};

export default UploadForm;
