const analyzePosts = (posts) => {
  let totalViews = 0;
  let totalReach = 0;
  let totalLikes = 0;
  let totalComments = 0;
  let totalShares = 0;
  let totalSaves = 0;

  let bestPost = null;
  let worstPost = null;

  posts.forEach((post) => {
    totalViews += post.views;
    totalReach += post.reach;
    totalLikes += post.likes;
    totalComments += post.comments;
    totalShares += post.shares;
    totalSaves += post.saves;

    const engagement =
      post.likes +
      post.comments +
      post.shares +
      post.saves;

    post.engagement = engagement;

    if (!bestPost || engagement > bestPost.engagement) {
      bestPost = post;
    }

    if (!worstPost || engagement < worstPost.engagement) {
      worstPost = post;
    }
  });

  const totalPosts = posts.length;

  const avgViews = Math.round(totalViews / totalPosts);
  const avgReach = Math.round(totalReach / totalPosts);
  const avgLikes = Math.round(totalLikes / totalPosts);

  const engagementRate = (
    ((totalLikes + totalComments + totalShares + totalSaves) /
      totalReach) *
    100
  ).toFixed(2);

  return {
    totalPosts,
    totalViews,
    totalReach,
    totalLikes,
    totalComments,
    totalShares,
    totalSaves,
    avgViews,
    avgReach,
    avgLikes,
    engagementRate,
    bestPost,
    worstPost,
  };
};

module.exports = {
  analyzePosts,
};