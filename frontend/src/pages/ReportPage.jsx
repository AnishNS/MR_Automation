import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { uploadReportFiles } from "../services/api";

import UploadFileIcon from "@mui/icons-material/UploadFile";

const ReportPage = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [selectedClientName, setSelectedClientName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerateReport = async () => {
  try {
    if (!files.length) {
      alert("Please upload at least one file");
      return;
    }
    if (!month.trim()) {
      alert("Please enter report month");
      return;
    }

    if (!year.trim()) {
      alert("Please enter report year");
      return;
    }

    if (!selectedClientName.trim()) {
      alert("Please enter selected client name");
      return;
    }

    const formData = new FormData();

    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    formData.append("month", month);
    formData.append("year", year);

    formData.append(
      "selectedClientName",
      selectedClientName.trim()
    );

    setLoading(true);

    const response = await uploadReportFiles(formData);

    setResult(response);

    alert("Report generated successfully");
  } catch (error) {
    console.error(error);

    alert(
      error?.response?.data?.message ||
      "Failed to generate report"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="report-page">

      {/* HEADER */}
      <button
        className="back-btn"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </button>

      <div className="report-header">

        <Typography
          variant="h3"
          className="report-title"
        >
          Generate Report
        </Typography>

        <Typography
          variant="body1"
          className="report-subtitle"
        >
          Configure and generate your monthly marketing report
        </Typography>

      </div>

      {/* REPORT CONFIG */}

      <Paper className="report-section">

        <Typography
          variant="h5"
          className="section-title"
        >
          Report Configuration
        </Typography>

        <div className="report-form-grid">

        <TextField
          label="Month"
          required
          placeholder="April"
          variant="outlined"
          fullWidth
          className="custom-input"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />

        <TextField
          label="Year"
          required
          placeholder="2026"
          variant="outlined"
          fullWidth
          className="custom-input"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <TextField
          label="Selected Client Name"
          required
          placeholder="StyleWell Interior"
          variant="outlined"
          fullWidth
          className="custom-input"
          value={selectedClientName}
          onChange={(e) => setSelectedClientName(e.target.value)}
        />

        </div>

      </Paper>

      {/* FILE UPLOAD */}

      <Paper className="report-section">

        <Typography
          variant="h5"
          className="section-title"
        >
          Upload Analytics Files
        </Typography>

        <div className="upload-box">

          <UploadFileIcon className="upload-icon" />

          <Typography className="upload-title">
            Upload Report Files
          </Typography>

          <Typography className="upload-subtitle">
            Supported formats:
            CSV, XLSX, DOCX, TXT, PDF
          </Typography>

          <Button
            variant="contained"
            component="label"
            className="upload-btn"
          >
            Upload File

          <input
            type="file"
            hidden
            multiple
            accept=".csv,.xlsx,.xls"
            onChange={(e) => {
              const newFiles = Array.from(e.target.files);

              setFiles((prevFiles) => {
                const existingFiles = Array.from(prevFiles);

                const uniqueNewFiles = newFiles.filter(
                  (newFile) =>
                    !existingFiles.some(
                      (existingFile) =>
                        existingFile.name === newFile.name &&
                        existingFile.size === newFile.size
                    )
                );

                return [...existingFiles, ...uniqueNewFiles];
              });

              e.target.value = "";
            }}
          />
          </Button>

          {files.length > 0 && (
            <div className="selected-files">
              <p>Selected Files:</p>

              {Array.from(files).map((file, index) => (
                <div className="selected-file-item" key={`${file.name}-${index}`}>
                  <span>{file.name}</span>

                  <button
                    type="button"
                    onClick={() => {
                      setFiles((prevFiles) =>
                        Array.from(prevFiles).filter((_, fileIndex) => fileIndex !== index)
                      );
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </Paper>

      {/* ACTION BUTTONS */}

      <div className="report-actions">

        <Button
          variant="outlined"
          className="secondary-btn"
        >
          Cancel
        </Button>

      <Button
      variant="contained"
      className="primary-btn"
      onClick={handleGenerateReport}
      disabled={loading}
    >
      {loading ? "Generating..." : "Generate Report"}
    </Button>

    </div>
      {result?.success && (
        <Paper className="report-section">

          <Typography
            variant="h5"
            className="section-title"
          >
            Generation Summary
          </Typography>

          <div className="generation-summary-grid">

            <div>
              <span>Client</span>
              <strong>{selectedClientName}</strong>
            </div>

            <div>
              <span>Month</span>
              <strong>{month}</strong>
            </div>

            <div>
              <span>Year</span>
              <strong>{year}</strong>
            </div>

            <div>
              <span>Files Uploaded</span>
              <strong>{files.length}</strong>
            </div>

          </div>

        </Paper>
      )}

      {result?.generatedPdfReports?.length > 0 && (
        <Paper className="report-section">

          <Typography
            variant="h5"
            className="section-title"
          >
            Generated Reports
          </Typography>

          <div className="generated-report-list">

          {result.generatedPdfReports.map((report, index) => {
            const fileName = report.fileName || report.pdf?.fileName;
            const pdfUrl = `http://localhost:5000/generated-reports/${fileName}`;

          return (
              <div className="generated-report-card" key={index}>
                <div>
                  <h3>Report {index + 1}</h3>
                  <p>{fileName}</p>
                </div>

                <div className="report-card-actions">
                  <a href={pdfUrl} target="_blank" rel="noreferrer">
                    Preview
                  </a>

                  <a href={pdfUrl} download>
                    Download PDF
                  </a>
                </div>
              </div>
            );
          })}

          </div>

        </Paper>
      )}

    </div>
  );
};

export default ReportPage;