const pool = require("../../config/database");

const createReport = async ({
  clientId,
  month,
  year,
  pdfPath,
}) => {
  const [result] = await pool.query(
    `
    INSERT INTO reports
    (client_id, report_month, report_year, pdf_path)
    VALUES (?, ?, ?, ?)
    `,
    [clientId, month, year, pdfPath]
  );

  return {
    id: result.insertId,
    client_id: clientId,
    report_month: month,
    report_year: year,
    pdf_path: pdfPath,
  };
};

module.exports = {
  createReport,
};