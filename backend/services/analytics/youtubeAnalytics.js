const generateYouTubeAnalytics = (videos = []) => {
  const totalVideos = videos.length;

  const totals = videos.reduce(
    (acc, video) => {
      acc.views += Number(video.views) || 0;
      acc.watchTime += Number(video.watchTime) || 0;
      acc.subscribers += Number(video.subscribers) || 0;
      acc.likes += Number(video.likes) || 0;
      acc.comments += Number(video.comments) || 0;
      acc.shares += Number(video.shares) || 0;
      acc.impressions += Number(video.impressions) || 0;
      return acc;
    },
    {
      views: 0,
      watchTime: 0,
      subscribers: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      impressions: 0,
    }
  );

  const totalEngagement =
    totals.likes + totals.comments + totals.shares;

  const engagementRate =
    totals.views > 0
      ? Number(((totalEngagement / totals.views) * 100).toFixed(2))
      : 0;

  const bestVideo =
    videos.length > 0
      ? videos.reduce((best, current) =>
          Number(current.views || 0) > Number(best.views || 0)
            ? current
            : best
        )
      : null;

  return {
    platform: "youtube",

    summary: {
      totalVideos,
      totalViews: totals.views,
      totalWatchTime: totals.watchTime,
      totalSubscribers: totals.subscribers,
      totalLikes: totals.likes,
      totalComments: totals.comments,
      totalShares: totals.shares,
      totalImpressions: totals.impressions,
      totalEngagement,
      engagementRate,
    },

    bestVideo,

    insights: [
      {
        title: "YouTube Viewership",
        text: `YouTube generated ${totals.views.toLocaleString()} total views during this reporting period.`,
      },
      {
        title: "Audience Engagement",
        text: `YouTube content achieved ${totalEngagement.toLocaleString()} engagements with an engagement rate of ${engagementRate}%.`,
      },
    ],

    recommendations: [
      {
        title: "Video Optimisation",
        text: "Continue improving thumbnails, titles, and hooks to increase click-through and retention.",
      },
      {
        title: "Content Consistency",
        text: "Maintain a consistent publishing schedule to improve channel growth and returning viewership.",
      },
      {
        title: "Audience Retention",
        text: "Analyse top-performing videos and replicate topics, structure, and pacing that drive higher views.",
      },
    ],
  };
};

module.exports = {
  generateYouTubeAnalytics,
};