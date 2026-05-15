const { compareMetric } = require("./monthComparisonEngine");

const buildInstagramHistoricalComparisons = (currentAnalytics, previousAnalytics) => {
  if (!currentAnalytics?.summary) {
    return {};
  }

  const current = currentAnalytics.summary;
  const previous = previousAnalytics || {};

  return {
    views: compareMetric("Views", current.totalViews, previous.total_views || 0),
    reach: compareMetric("Reach", current.totalReach, previous.total_reach || 0),
    likes: compareMetric("Likes", current.totalLikes, previous.total_likes || 0),
    engagement: compareMetric(
      "Engagement",
      current.totalEngagement,
      previous.total_engagement || 0
    ),
  };
};

const buildSEOHistoricalComparisons = (currentClientSummary, previousAnalytics) => {
  const previous = previousAnalytics || {};

  return {
    organicTraffic: compareMetric(
      "Organic Traffic",
      currentClientSummary.organicTraffic,
      previous.organic_traffic || 0
    ),

    impressions: compareMetric(
      "Impressions",
      currentClientSummary.impressions,
      previous.impressions || 0
    ),

    clicks: compareMetric(
      "Organic Clicks",
      currentClientSummary.clicks,
      previous.clicks || 0
    ),
  };
};

module.exports = {
  buildInstagramHistoricalComparisons,
  buildSEOHistoricalComparisons,
};