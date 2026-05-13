const assembleReport = ({
  platform,
  file,
  totalRecords,
  analytics,
  charts,
  data,
}) => {
  return {
    reportTitle:
      platform === "instagram"
        ? "Instagram Monthly Performance Report"
        : platform === "seo"
        ? "SEO Monthly Performance Report"
        : "Monthly Performance Report",

    generatedAt: new Date().toISOString(),

    platform,

    sourceFile: {
      originalName: file?.originalname || "",
      storedName: file?.filename || "",
      path: file?.path || "",
    },

    overview: {
      totalRecords,
      hasAnalytics: !!analytics,
      hasCharts: !!charts,
    },

    analytics,

    charts,

    rawData: data,
  };
};

module.exports = {
  assembleReport,
};