const { compareMetric } = require("./monthComparisonEngine");
const {
  generateSEOInsights,
} = require("../insights/seoInsightsGenerator");
const {
  generateSEORecommendations,
} = require("../recommendations/seoRecommendationEngine");
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

      comparisons: {
        organicTraffic: compareMetric(
          "Organic Traffic",
          getMetricValue("Organic Traffic"),
          0
        ),

        impressions: compareMetric(
          "Impressions",
          getMetricValue("Impressions"),
          0
        ),

        clicks: compareMetric(
          "Organic Clicks",
          getMetricValue("Organic Clicks"),
          0
        ),
      },
    };
  });

  const insights = generateSEOInsights({
    clientSummaries: summaries,
  });
  const recommendations = generateSEORecommendations({
    clientSummaries: summaries,
  });

  return {
    platform: "seo",
    totalClients,
    clientSummaries: summaries,
    insights,
    recommendations,
  };
};

module.exports = {
  generateSEOAnalytics,
};