const pool = require("../../config/database");

const MONTH_ORDER = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const fetchPreviousInstagramAnalytics = async (
  clientId,
  currentMonth,
  currentYear
) => {
  const currentMonthNumber = MONTH_ORDER[currentMonth];

  let previousMonthNumber = currentMonthNumber - 1;
  let previousYear = Number(currentYear);

  if (previousMonthNumber === 0) {
    previousMonthNumber = 12;
    previousYear -= 1;
  }

  const previousMonth = Object.keys(MONTH_ORDER).find(
    (month) => MONTH_ORDER[month] === previousMonthNumber
  );

  const [rows] = await pool.query(
    `
    SELECT ia.*
    FROM instagram_analytics ia
    JOIN services s ON ia.service_id = s.id
    JOIN reports r ON s.report_id = r.id
    WHERE r.client_id = ?
      AND r.report_month = ?
      AND r.report_year = ?
    ORDER BY r.created_at DESC
    LIMIT 1
    `,
    [clientId, previousMonth, previousYear]
  );

  if (!rows.length) {
    return null;
  }

  return rows[0];
};

module.exports = {
  fetchPreviousInstagramAnalytics,
};