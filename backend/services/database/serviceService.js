const pool = require("../../config/database");

const createService = async ({
  reportId,
  platform,
  rawFileName,
}) => {
  const [result] = await pool.query(
    `
    INSERT INTO services
    (report_id, platform, raw_file_name)
    VALUES (?, ?, ?)
    `,
    [reportId, platform, rawFileName]
  );

  return {
    id: result.insertId,
    report_id: reportId,
    platform,
    raw_file_name: rawFileName,
  };
};

module.exports = {
  createService,
};