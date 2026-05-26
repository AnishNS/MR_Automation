import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Paper,
  Typography,
  Button,
} from "@mui/material";

import { uploadReportFiles } from "../services/api";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const API_BASE_URL = "http://localhost:5000/api";

const ReportPage = () => {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const selectedClient = clients.find(
    (client) => String(client.id) === String(selectedClientId)
  );

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/clients`);
        const data = await response.json();

        if (data.success) {
          setClients(data.clients);
        }
      } catch (error) {
        console.error("Fetch clients error:", error);
      }
    };

    fetchClients();
  }, []);

  const getSelectedMonthName = () => {
    if (!selectedMonth) return "-";

    return new Date(`${selectedMonth}-01`).toLocaleString("default", {
      month: "long",
    });
  };

  const getSelectedYear = () => {
    if (!selectedMonth) return "-";
    return selectedMonth.split("-")[0];
  };

  const handleGenerateReport = async () => {
    try {
      if (!files.length) {
        alert("Please upload at least one file");
        return;
      }

      if (!selectedClientId) {
        alert("Please select client");
        return;
      }

      if (!selectedMonth) {
        alert("Please select report month");
        return;
      }

      const [year, month] = selectedMonth.split("-");

      const formData = new FormData();

      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });

      formData.append("month", month);
      formData.append("year", year);
      formData.append("selectedClientId", selectedClientId);

      if (selectedClient) {
        formData.append("selectedClientName", selectedClient.client_name);
        formData.append(
          "reportDisplayName",
          selectedClient.report_display_name || selectedClient.client_name
        );
        formData.append(
          "clientAliases",
          selectedClient.client_aliases || selectedClient.client_name
        );
      }

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

      <Paper className="report-section">
        <Typography
          variant="h5"
          className="section-title"
        >
          Report Configuration
        </Typography>

        <div className="report-form-grid">
          <div className="report-control">
            <label>Select Client *</label>

            <select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
            >
              <option value="">Choose Client</option>

              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.report_display_name || client.client_name}
                </option>
              ))}
            </select>
          </div>

          <div className="report-control">
            <label>Select Month *</label>

            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            />
          </div>
        </div>
      </Paper>

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
            Supported formats: CSV, XLSX, DOCX, TXT, PDF
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
              accept=".csv,.xlsx,.xls,.doc,.docx,.txt,.pdf"
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
                <div
                  className="selected-file-item"
                  key={`${file.name}-${index}`}
                >
                  <span>{file.name}</span>

                  <button
                    type="button"
                    onClick={() => {
                      setFiles((prevFiles) =>
                        Array.from(prevFiles).filter(
                          (_, fileIndex) => fileIndex !== index
                        )
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

      <div className="report-actions">
        <Button
          variant="outlined"
          className="secondary-btn"
          onClick={() => navigate("/dashboard")}
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
              <strong>
                {selectedClient?.report_display_name ||
                  selectedClient?.client_name ||
                  "-"}
              </strong>
            </div>

            <div>
              <span>Month</span>
              <strong>{getSelectedMonthName()}</strong>
            </div>

            <div>
              <span>Year</span>
              <strong>{getSelectedYear()}</strong>
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
                <div
                  className="generated-report-card"
                  key={index}
                >
                  <div>
                    <h3>Report {index + 1}</h3>
                    <p>{fileName}</p>
                  </div>

                  <div className="report-card-actions">
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
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