import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDashboardStats } from "../services/api";


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
  const [stats, setStats] = useState(null);
  useEffect(() => {
    const loadStats = async () => {
      const data = await fetchDashboardStats();
      setStats(data.stats);
    };

    loadStats();
  }, []);
  const cards = [
  {
    title: "Reports Generated",
    value: stats?.totalReports || 0,
    icon: <AssessmentIcon />,
  },
  {
    title: "Total Clients",
    value: stats?.totalClients || 0,
    icon: <UploadFileIcon />,
  },
  {
    title: "PDF Exports",
    value: stats?.totalPdfs || 0,
    icon: <PictureAsPdfIcon />,
  },
  {
    title: "Active Services",
    value: stats?.totalServices || 0,
    icon: <DashboardIcon />,
  },
];

  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}

      <div className="sidebar">
        <h2>MarketLens AI</h2>

        <ul>
        <li
          className="active"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </li>

        <li
          onClick={() => navigate("/reports-history")}
        >
          Reports
        </li>

        <li>
          Analytics
        </li>

        <li>
          Settings
        </li>
      </ul>
      </div>

      {/* MAIN CONTENT */}

      <div className="dashboard-main">

        {/* TOPBAR */}

        <div className="topbar">
          <h1>Dashboard</h1>
        <button onClick={() => navigate("/report")}>
          New Report
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

                {stats?.recentReports?.length ? (
                  stats.recentReports.map((report, index) => (
                    <div className="recent-item" key={index}>
                      <p>
                        <strong>{report.clientName}</strong> report generated
                      </p>
                      <span>
                        {report.month} {report.year} •{" "}
                        {new Date(report.generatedAt).toLocaleString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <p>No recent reports available</p>
                )}
          </div>

         <div className="recent-card">
        <h2>Quick Insights</h2>

        <div className="quick-insight-item">
          Total clients managed: <strong>{stats?.totalClients || 0}</strong>
        </div>

        <div className="quick-insight-item">
          Reports generated: <strong>{stats?.totalReports || 0}</strong>
        </div>

        <div className="quick-insight-item">
          Active services tracked: <strong>{stats?.totalServices || 0}</strong>
        </div>

        <div className="quick-insight-item">
          Latest report:{" "}
          <strong>
            {stats?.latestReport
              ? `${stats.latestReport.clientName} - ${stats.latestReport.month} ${stats.latestReport.year}`
              : "No reports yet"}
          </strong>
        </div>
      </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;

