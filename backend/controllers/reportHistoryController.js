const {
  getReportHistory,
} = require("../services/database/reportHistoryService");

const fetchReportHistory = async (req, res) => {
  try {
    const reports = await getReportHistory();

    res.json({
      success: true,
      totalReports: reports.length,
      reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  fetchReportHistory,
};