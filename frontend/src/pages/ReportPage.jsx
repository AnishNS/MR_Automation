import React, { useState } from "react";

import {
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";

const ReportPage = () => {
  const [reportingDate, setReportingDate] = useState("");

  return (
    <div className="report-page">

      {/* HEADER */}

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

          {/* REPORTING PERIOD */}

          <TextField
            label="Reporting Period"
            placeholder="Enter the month"
            variant="outlined"
            fullWidth
            className="custom-input"
          />

          {/* PREPARED BY */}

          <TextField
            label="Prepared By"
            placeholder="Enter your name"
            variant="outlined"
            fullWidth
            className="custom-input"
          />

          {/* PREPARED FOR */}

          <TextField
            label="Prepared For"
            placeholder="Client or company name"
            variant="outlined"
            fullWidth
            className="custom-input"
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
            />
          </Button>

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
        >
          Generate Report
        </Button>

      </div>

    </div>
  );
};

export default ReportPage;