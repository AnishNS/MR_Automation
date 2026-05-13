import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const Dashboard = () => {
  const navigate = useNavigate();
  const cards = [
    {
      title: "Reports Generated",
      icon: <AssessmentIcon />,
    },
    {
      title: "Files Uploaded",
      icon: <UploadFileIcon />,
    },
    {
      title: "PDF Exports",
      icon: <PictureAsPdfIcon />,
    },
    {
      title: "Active Dashboards",
      icon: <DashboardIcon />,
    },
  ];

  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}

      <div className="sidebar">
        <h2>MarketLens AI</h2>

        <ul>
          <li className="active">Dashboard</li>
          <li>Upload Data</li>
          <li>Reports</li>
          <li>Analytics</li>
          <li>Settings</li>
        </ul>
      </div>

      {/* MAIN CONTENT */}

      <div className="dashboard-main">

        {/* TOPBAR */}

        <div className="topbar">
          <h1>Dashboard</h1>

          <button onClick={()=> navigate("/report")}>
            Generate Report
          </button>
        </div>

        {/* CARDS */}

        <div className="card-grid">
          {cards.map((card, index) => (
            <Card className="dashboard-card" key={index}>
              <CardContent>

                <div className="card-top">
                  <div className="card-icon">
                    {card.icon}
                  </div>

                  <Typography
                    variant="h5"
                    className="card-value"
                  >
                    {card.value}
                  </Typography>
                </div>

                <Typography className="card-title">
                  {card.title}
                </Typography>

              </CardContent>
            </Card>
          ))}
        </div>

        {/* RECENT SECTION */}

        <div className="recent-section">

          <div className="recent-card">
            <h2>Recent Activity</h2>
          </div>

          <div className="recent-card">
            <h2>Quick Insights</h2>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;

