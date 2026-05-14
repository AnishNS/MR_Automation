const generateSEORecommendations = (seoAnalytics) => {
  if (!seoAnalytics || !seoAnalytics.clientSummaries) {
    return [];
  }

  return seoAnalytics.clientSummaries.map((client) => {
    const recommendations = [];

    const traffic = Number(client.organicTraffic) || 0;

    if (traffic < 100) {
      recommendations.push(
        "Increase SEO content publishing frequency to improve organic traffic growth."
      );
    } else {
      recommendations.push(
        "Continue optimizing high-performing pages to maintain organic traffic momentum."
      );
    }

    if ((Number(client.avgPosition) || 100) > 10) {
      recommendations.push(
        "Focus on keyword optimization and internal linking to improve average ranking position."
      );
    }

    if ((Number(client.profileViews) || 0) > 0) {
      recommendations.push(
        "Google Business Profile is generating visibility and should continue receiving regular updates and optimization."
      );
    }

    recommendations.push(
      "Track keyword rankings and search performance monthly for long-term SEO growth analysis."
    );

    return {
      clientName: client.clientName,
      recommendations,
    };
  });
};

module.exports = {
  generateSEORecommendations,
};