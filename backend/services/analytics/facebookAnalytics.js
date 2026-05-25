const generateFacebookAnalytics = (posts = []) => {
  const totalPosts = posts.length;

  const totals = posts.reduce(
    (acc, post) => {
      acc.reach += Number(post.reach) || 0;
      acc.views += Number(post.views) || 0;
      acc.likes += Number(post.likes) || 0;
      acc.comments += Number(post.comments) || 0;
      acc.shares += Number(post.shares) || 0;
      acc.clicks += Number(post.clicks) || 0;
      acc.engagement += Number(post.engagement) || 0;

      return acc;
    },
    {
      reach: 0,
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      clicks: 0,
      engagement: 0,
    }
  );

  const calculatedEngagement =
    totals.engagement ||
    totals.likes + totals.comments + totals.shares + totals.clicks;

  const engagementRate =
    totals.reach > 0
      ? Number(((calculatedEngagement / totals.reach) * 100).toFixed(2))
      : 0;

  const bestPost =
    posts.length > 0
      ? posts.reduce((best, current) => {
          const bestEngagement =
            Number(best.engagement) ||
            Number(best.likes) + Number(best.comments) + Number(best.shares);

          const currentEngagement =
            Number(current.engagement) ||
            Number(current.likes) +
              Number(current.comments) +
              Number(current.shares);

          return currentEngagement > bestEngagement ? current : best;
        })
      : null;

  const postTypeCounts = posts.reduce((acc, post) => {
    const type = post.postType || "Unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const insights = [];

  if (totalPosts > 0) {
    insights.push({
      title: "Facebook Publishing Activity",
      text: `Facebook published ${totalPosts} posts during this reporting period.`,
    });
  }

  if (totals.reach > 0) {
    insights.push({
      title: "Audience Reach",
      text: `Facebook content reached ${totals.reach.toLocaleString()} users.`,
    });
  }

  if (engagementRate > 0) {
    insights.push({
      title: "Engagement Performance",
      text: `Facebook achieved an engagement rate of ${engagementRate}%.`,
    });
  }

  const recommendations = [
    {
      title: "Content Consistency",
      text: "Maintain consistent posting frequency to improve audience recall and engagement.",
    },
    {
      title: "Creative Optimisation",
      text: "Prioritise content formats that generate higher reach and interaction.",
    },
    {
      title: "Audience Engagement",
      text: "Use interactive posts, local relevance, and strong calls-to-action to improve engagement.",
    },
  ];

  return {
    platform: "facebook",

    summary: {
      totalPosts,
      totalReach: totals.reach,
      totalViews: totals.views,
      totalLikes: totals.likes,
      totalComments: totals.comments,
      totalShares: totals.shares,
      totalClicks: totals.clicks,
      totalEngagement: calculatedEngagement,
      engagementRate,
    },

    bestPost,
    postTypeCounts,
    insights,
    recommendations,
  };
};

module.exports = {
  generateFacebookAnalytics,
};