const pool = require("../../config/database");

const saveInstagramAnalytics = async ({
  serviceId,
  analytics,
}) => {
  if (!analytics || !analytics.summary) {
    return null;
  }

  const summary = analytics.summary;

  const [result] = await pool.query(
    `
    INSERT INTO instagram_analytics
    (
      service_id,
      total_posts,
      total_views,
      total_reach,
      total_likes,
      total_engagement,
      engagement_rate
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      serviceId,
      summary.totalPosts || 0,
      summary.totalViews || 0,
      summary.totalReach || 0,
      summary.totalLikes || 0,
      summary.totalEngagement || 0,
      summary.engagementRate || 0,
    ]
  );

  return {
    id: result.insertId,
  };
};

module.exports = {
  saveInstagramAnalytics,
};