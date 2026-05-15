const pool = require("../../config/database");

const saveSEOAnalytics = async ({
  serviceId,
  analytics,
}) => {
  if (!analytics || !analytics.clientSummaries?.length) {
    return null;
  }

  const savedRows = [];

  for (const client of analytics.clientSummaries) {
    const [result] = await pool.query(
      `
      INSERT INTO seo_analytics
      (
        service_id,
        organic_traffic,
        impressions,
        clicks,
        ctr,
        avg_position
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        serviceId,
        Number(client.organicTraffic) || 0,
        Number(client.impressions) || 0,
        Number(client.clicks) || 0,
        Number(client.ctr) || 0,
        Number(client.avgPosition) || 0,
      ]
    );

    savedRows.push({
      id: result.insertId,
      clientName: client.clientName,
    });
  }

  return savedRows;
};

module.exports = {
  saveSEOAnalytics,
};