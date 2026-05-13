const generateSEOAnalytics = (clients = []) => {
  const totalClients = clients.length;

  const summaries = clients.map((client) => {
    const rows = client.rows || [];

    const getMetricValue = (metricName) => {
      const metric = rows.find((row) =>
        row.label?.toLowerCase().includes(metricName.toLowerCase())
      );

      return metric?.currentMonth || null;
    };

    return {
      clientName: client.clientName,

      organicTraffic: getMetricValue("Organic Traffic"),

      impressions: getMetricValue("Impressions"),

      clicks: getMetricValue("Organic Clicks"),

      ctr: getMetricValue("CTR"),

      avgPosition: getMetricValue("Avg. Position"),

      profileViews: getMetricValue("GBP Profile Views"),

      calls: getMetricValue("Calls from GBP"),

      directionRequests: getMetricValue("Direction Requests"),

      reviews: getMetricValue("New Reviews"),
    };
  });

  return {
    platform: "seo",
    totalClients,
    clientSummaries: summaries,
  };
};

module.exports = {
  generateSEOAnalytics,
};