import React, { useEffect, useState } from "react";
import { fetchReportHistory } from "../services/api";
import { useNavigate } from "react-router-dom";

const ReportsHistory = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const loadReports = async () => {
      const data = await fetchReportHistory();
      setReports(data.reports || []);
    };

    loadReports();
  }, []);


  return (
    
    <div className="report-page">
      <button
  className="back-btn"
  onClick={() => navigate("/dashboard")}
>
  ← Back to Dashboard
</button>
      <h1>Reports History</h1>

      <div className="generated-report-list">
        {reports.map((report) => {
          const fileName = report.pdfPath?.split("\\").pop();
          const pdfUrl = `http://localhost:5000/generated-reports/${fileName}`;

          return (
            <div className="generated-report-card" key={report.reportId}>
              <div>
                <h3>{report.clientName}</h3>
                <p>{report.month || "No Month"} {report.year || ""}</p>
                <p>{new Date(report.generatedAt).toLocaleString()}</p>
              </div>

              <div className="report-card-actions">
                <a href={pdfUrl} target="_blank" rel="noreferrer">
                  Preview
                </a>

                <a href={pdfUrl} download>
                  Download
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReportsHistory;