const generateInstagramAnalytics = (posts = []) => {
  const totalPosts = posts.length;

  const totals = posts.reduce(
    (acc, post) => {
      acc.views += Number(post.views) || 0;
      acc.reach += Number(post.reach) || 0;
      acc.likes += Number(post.likes) || 0;
      acc.shares += Number(post.shares) || 0;
      acc.comments += Number(post.comments) || 0;
      acc.saves += Number(post.saves) || 0;
      acc.follows += Number(post.follows) || 0;

      return acc;
    },
    {
      views: 0,
      reach: 0,
      likes: 0,
      shares: 0,
      comments: 0,
      saves: 0,
      follows: 0,
    }
  );

  const totalEngagement =
    totals.likes +
    totals.shares +
    totals.comments +
    totals.saves;

  const engagementRate =
    totals.reach > 0
      ? Number(((totalEngagement / totals.reach) * 100).toFixed(2))
      : 0;

  const averageViews =
    totalPosts > 0 ? Math.round(totals.views / totalPosts) : 0;

  const averageReach =
    totalPosts > 0 ? Math.round(totals.reach / totalPosts) : 0;

  const postsWithEngagement = posts.map((post) => ({
    ...post,
    engagement:
      (Number(post.likes) || 0) +
      (Number(post.shares) || 0) +
      (Number(post.comments) || 0) +
      (Number(post.saves) || 0),
  }));

  const bestPost =
    postsWithEngagement.length > 0
      ? postsWithEngagement.reduce((best, current) =>
          current.engagement > best.engagement ? current : best
        )
      : null;

  const postTypeCounts = posts.reduce((acc, post) => {
    const type = post.postType || "Unknown";

    acc[type] = (acc[type] || 0) + 1;

    return acc;
  }, {});

  return {
    platform: "instagram",

    summary: {
      totalPosts,
      totalViews: totals.views,
      totalReach: totals.reach,
      totalLikes: totals.likes,
      totalShares: totals.shares,
      totalComments: totals.comments,
      totalSaves: totals.saves,
      totalFollows: totals.follows,
      totalEngagement,
      engagementRate,
      averageViews,
      averageReach,
    },

    bestPost,

    postTypeCounts,
  };
};

module.exports = {
  generateInstagramAnalytics,
};