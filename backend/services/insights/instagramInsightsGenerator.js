const generateInstagramInsights = (analytics) => {
  if (!analytics || !analytics.summary) {
    return [];
  }

  const { summary, bestPost, postTypeCounts } = analytics;

  const insights = [];

  insights.push(
    `Instagram published ${summary.totalPosts || 0} posts this month, generating ${summary.totalViews || 0} total views and ${summary.totalReach || 0} total reach.`
  );

  insights.push(
    `The overall engagement rate is ${summary.engagementRate || 0}%, with ${summary.totalEngagement || 0} total engagements.`
  );

  if (bestPost) {
    insights.push(
      `The best performing post was a ${bestPost.postType || "content piece"} with ${bestPost.views || 0} views, ${bestPost.reach || 0} reach, and ${bestPost.engagement || 0} engagements.`
    );
  }

  if (postTypeCounts) {
    const topFormat = Object.entries(postTypeCounts).sort(
      (a, b) => b[1] - a[1]
    )[0];

    if (topFormat) {
      insights.push(
        `${topFormat[0]} was the most used content format this month, with ${topFormat[1]} posts.`
      );
    }
  }

  return insights;
};

module.exports = {
  generateInstagramInsights,
};