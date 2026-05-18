const express = require("express");

const {
  fetchDashboardStats,
} = require("../controllers/dashboardStatsController");

const router = express.Router();

router.get("/", fetchDashboardStats);

module.exports = router;