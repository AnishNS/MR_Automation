const pool = require("../../config/database");

const getDashboardStats = async () => {
  const [[clients]] = await pool.query(
    "SELECT COUNT(*) AS totalClients FROM clients"
  );

  const [[reports]] = await pool.query(
    "SELECT COUNT(*) AS totalReports FROM reports"
  );

  const [[services]] = await pool.query(
    "SELECT COUNT(*) AS totalServices FROM services"
  );

  const [[latestReport]] = await pool.query(
    `
    SELECT 
      c.client_name AS clientName,
      r.report_month AS month,
      r.report_year AS year,
      r.created_at AS generatedAt
    FROM reports r
    JOIN clients c ON r.client_id = c.id
    ORDER BY r.created_at DESC
    LIMIT 1
    `
    
  );
  const [recentReports] = await pool.query(
  `
    SELECT
        c.client_name AS clientName,
        r.report_month AS month,
        r.report_year AS year,
        r.created_at AS generatedAt
    FROM reports r
    JOIN clients c ON r.client_id = c.id
    ORDER BY r.created_at DESC
    LIMIT 5
    `
    );

  return {
    totalClients: clients.totalClients,
    totalReports: reports.totalReports,
    totalServices: services.totalServices,
    totalPdfs: reports.totalReports,
    latestReport: latestReport || null,
    recentReports,
  };
};

module.exports = {
  getDashboardStats,
};