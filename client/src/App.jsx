import React, { useEffect, useState } from "react";
import UploadForm from "./components/UploadForm";
import XmlReport from "./components/XmlReports";
import { fetchReports } from "./services/api";
import "./App.css"; // Import your CSS file for styling

const App = () => {
  const [reports, setReports] = useState([]);
  const [latestReport, setLatestReport] = useState(null);

  const loadReports = async () => {
    try {
      const response = await fetchReports();
      setReports(response.data);
      if (response.data.length > 0) {
        setLatestReport(response.data[response.data.length - 1]); // Get the latest report
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleUploadSuccess = () => {
    loadReports(); // Reload reports after successful upload
  };

  return (
    <div className="container">
      {" "}
      {/* Add a container class for styling */}
      <h1>CreditSea Report Upload</h1>
      <UploadForm onUploadSuccess={handleUploadSuccess} />
      {latestReport && <XmlReport report={latestReport} />}
    </div>
  );
};

export default App;
