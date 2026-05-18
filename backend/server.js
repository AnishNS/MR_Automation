const express = require("express");
const cors = require("cors");
const path = require("path");
const reportHistoryRoutes = require("./routes/reportHistoryRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads",
    express.static(path.join(__dirname, "uploads"))
);
app.use(
  "/generated-reports",
  express.static(path.join(__dirname, "generated-reports"))
);
/* ROUTES */

const uploadRoutes = require("./routes/uploadRoutes");
const reportRoutes = require("./routes/reportRoutes");
const authRoutes = require("./routes/authRoutes");
const pdfRoutes = require("./routes/pdfRoutes");
const dashboardStatsRoutes = require("./routes/dashboardStatsRoutes");

/* API ROUTES */

app.use("/api/upload", uploadRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/report-history", reportHistoryRoutes);
app.use("/api/dashboard-stats", dashboardStatsRoutes);

/* TEST ROUTE */

app.get("/", (req, res) => {
  res.send("MarketLens AI Backend Running");
});

/* SERVER */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});