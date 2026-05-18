const {
  getDashboardStats,
} = require("../services/database/dashboardStatsService");

const fetchDashboardStats = async (req, res) => {
  try {
    const stats = await getDashboardStats();

    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  fetchDashboardStats,
};