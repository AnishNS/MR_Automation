import React, { useState } from "react";
import axios from "axios";

const UploadReportForm = () => {
  const [files, setFiles] = useState([]);
  const [month, setMonth] = useState("April");
  const [year, setYear] = useState("2026");
  const [selectedClientName, setSelectedClientName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    formData.append("month", month);
    formData.append("year", year);

    if (selectedClientName.trim()) {
      formData.append("selectedClientName", selectedClientName.trim());
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );

      setResult(response.data);
    } catch (error) {
      setResult({
        success: false,
        message: error.response?.data?.message || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-report-card">
      <h2>Generate Monthly Report</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          multiple
          accept=".csv,.xlsx,.xls"
          onChange={(e) => setFiles(e.target.files)}
        />

        <input
          type="text"
          placeholder="Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />

        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <input
          type="text"
          placeholder="Selected Client Name (optional)"
          value={selectedClientName}
          onChange={(e) => setSelectedClientName(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Report"}
        </button>
      </form>

      {result && (
        <div className="upload-result">
          <p>{result.message}</p>
        </div>
      )}
    </div>
  );
};

export default UploadReportForm;