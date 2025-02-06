import React, { useEffect, useState } from "react";
import UploadForm from "./components/UploadForm";
import XmlReport from "./components/XmlReports";
import { fetchReports } from "./services/api";
import "./App.css";

const App = () => {
  const [reports, setReports] = useState([]);
  const [latestReport, setLatestReport] = useState(null);

  const loadReports = async () => {
    try {
      const response = await fetchReports();
      setReports(response.data.reports);
      if (response.data.reports.length > 0) {
        setLatestReport(
          response.data.reports[response.data.reports.length - 1]
        );
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleUploadSuccess = () => {
    loadReports();
  };

  return (
    <div className="container">
      <h1>CreditSea Report Upload</h1>
      <UploadForm onUploadSuccess={handleUploadSuccess} />
      {latestReport && <XmlReport report={latestReport} />}
    </div>
  );
};

export default App;
