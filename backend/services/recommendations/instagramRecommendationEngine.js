const generateInstagramRecommendations = (analytics) => {
  if (!analytics || !analytics.summary) {
    return [];
  }

  const recommendations = [];

  const engagementRate = analytics.summary.engagementRate || 0;

  if (engagementRate < 5) {
    recommendations.push(
      "Increase engagement-focused content such as reels, interactive posts, and stronger call-to-actions."
    );
  } else {
    recommendations.push(
      "Continue producing high-engagement content formats that are already performing well."
    );
  }

  if (analytics.bestPost?.postType === "IG reel") {
    recommendations.push(
      "Reels are currently the best-performing content format and should remain a primary content focus."
    );
  }

  const totalPosts = analytics.summary.totalPosts || 0;

  if (totalPosts < 12) {
    recommendations.push(
      "Increase monthly posting frequency to improve consistency and audience reach."
    );
  }

  recommendations.push(
    "Track content performance monthly to identify trends and improve future campaign planning."
  );

  return recommendations;
};

module.exports = {
  generateInstagramRecommendations,
};