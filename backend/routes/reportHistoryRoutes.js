const express = require("express");

const {
  fetchReportHistory,
} = require("../controllers/reportHistoryController");

const router = express.Router();

router.get("/", fetchReportHistory);

module.exports = router;