const pool = require("../../config/database");

const findExistingReport = async ({
  clientId,
  month,
  year,
  platform,
}) => {
  const [rows] = await pool.query(
    `
    SELECT r.id AS report_id, s.id AS service_id
    FROM reports r
    JOIN services s ON s.report_id = r.id
    WHERE r.client_id = ?
      AND r.report_month = ?
      AND r.report_year = ?
      AND s.platform = ?
    LIMIT 1
    `,
    [clientId, month, year, platform]
  );

  return rows[0] || null;
};

module.exports = {
  findExistingReport,
};