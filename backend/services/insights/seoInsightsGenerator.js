const generateSEOInsights = (seoAnalytics) => {
  if (!seoAnalytics || !seoAnalytics.clientSummaries) {
    return [];
  }

  return seoAnalytics.clientSummaries.map((client) => {
    const insights = [];

    insights.push(
      `${client.clientName} recorded ${client.organicTraffic || 0} organic traffic, ${client.impressions || 0} impressions, and ${client.clicks || 0} organic clicks.`
    );

    if (client.avgPosition && client.avgPosition !== "-") {
      insights.push(
        `The average search position is ${client.avgPosition}, showing current ranking visibility.`
      );
    }

    if (client.profileViews && client.profileViews !== "-") {
      insights.push(
        `Google Business Profile generated ${client.profileViews} profile views, ${client.calls || 0} calls, and ${client.directionRequests || 0} direction requests.`
      );
    }

    return {
      clientName: client.clientName,
      insights,
    };
  });
};

module.exports = {
  generateSEOInsights,
};