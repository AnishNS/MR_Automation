const buildInstagramCharts = (data = []) => {
  const postTypeChart = Object.values(
    data.reduce((acc, post) => {
      const type = post.postType || "Unknown";

      if (!acc[type]) {
        acc[type] = {
          name: type,
          value: 0,
        };
      }

      acc[type].value += 1;

      return acc;
    }, {})
  );

  const engagementChart = data.map((post, index) => ({
    name: `Post ${index + 1}`,
    views: Number(post.views) || 0,
    reach: Number(post.reach) || 0,
    likes: Number(post.likes) || 0,
    comments: Number(post.comments) || 0,
    shares: Number(post.shares) || 0,
    saves: Number(post.saves) || 0,
  }));

  return {
    postTypeChart,
    engagementChart,
  };
};

const buildSEOCharts = (data = []) => {
  const clientPerformanceChart = data.map((client) => {
    const summaryRows = client.rows || [];

    const getValue = (label) => {
      const row = summaryRows.find((item) =>
        item.label?.toLowerCase().includes(label.toLowerCase())
      );

      const value = row?.currentMonth;

      return typeof value === "number" ? value : 0;
    };

    return {
      name: client.clientName,
      organicTraffic: getValue("Organic Traffic"),
      impressions: getValue("Impressions"),
      clicks: getValue("Organic Clicks"),
      profileViews: getValue("GBP Profile Views"),
    };
  });

  return {
    clientPerformanceChart,
  };
};

const buildCharts = (platform, data) => {
  if (platform === "instagram") {
    return buildInstagramCharts(data);
  }

  if (platform === "seo") {
    return buildSEOCharts(data);
  }

  return {};
};

module.exports = {
  buildCharts,
};