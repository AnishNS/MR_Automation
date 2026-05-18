const pool = require("../../config/database");

const getReportHistory = async () => {
  const [rows] = await pool.query(
    `
    SELECT
      r.id AS reportId,
      c.client_name AS clientName,
      r.report_month AS month,
      r.report_year AS year,
      r.pdf_path AS pdfPath,
      r.created_at AS generatedAt
    FROM reports r
    JOIN clients c ON r.client_id = c.id
    ORDER BY r.created_at DESC
    `
  );

  return rows;
};

module.exports = {
  getReportHistory,
};