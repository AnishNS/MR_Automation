const drawKpiCard = require("../components/kpiCard");
const drawSectionDivider = require("../components/sectionDivider");
const drawChartBlock = require("../components/chartBlock");
const {
  generateBarChartImage,
} = require("../charts/chartImageGenerator");
const {
  generatePieChartImage,
} = require("../charts/pieChartGenerator");
const drawPageHeader = require("../components/pageHeader");
const drawInstagramSection = async (doc, instagramData) => {
  if (!instagramData) return;

  doc.addPage();

  drawPageHeader(
    doc,
    "Instagram Performance",
    "Monthly Instagram analytics overview"
  );

  doc.moveDown(1);

  const summary = instagramData.analytics?.summary || {};

  doc
    .fontSize(14)
    .fillColor("#2563eb")
    .text("KPI Summary");

  doc.moveDown(1);

drawKpiCard(
  doc,
  50,
  150,
  150,
  70,
  "Total Posts",
  summary.totalPosts || 0
);

drawKpiCard(
  doc,
  220,
  150,
  150,
  70,
  "Total Views",
  summary.totalViews || 0
);

drawKpiCard(
  doc,
  390,
  150,
  150,
  70,
  "Total Reach",
  summary.totalReach || 0
);

drawKpiCard(
  doc,
  50,
  240,
  150,
  70,
  "Total Likes",
  summary.totalLikes || 0
);

drawKpiCard(
  doc,
  220,
  240,
  150,
  70,
  "Engagement",
  summary.totalEngagement || 0
);

drawKpiCard(
  doc,
  390,
  240,
  150,
  70,
  "Engagement Rate",
  `${summary.engagementRate || 0}%`
);

  doc.moveDown(2);
  drawSectionDivider(doc, 340);
  const chartData = [
  summary.totalViews || 0,
  summary.totalReach || 0,
  summary.totalLikes || 0,
  summary.totalEngagement || 0,
];

const chartLabels = [
  "Views",
  "Reach",
  "Likes",
  "Engagement",
];

const chartBuffer = await generateBarChartImage(
  chartLabels,
  chartData,
  "Instagram KPI Overview"
);

drawChartBlock(doc, chartBuffer, 50, 360, 500);

doc.moveDown(12);
  const bestPost = instagramData.analytics?.bestPost;

  if (bestPost) {
    doc
      .fontSize(14)
      .fillColor("#2563eb")
      .text("Best Performing Post");

    doc.moveDown(0.7);

    doc
      .fontSize(12)
      .fillColor("#333333")
      .text(`Post Type: ${bestPost.postType || "-"}`);

    doc.text(`Views: ${bestPost.views || 0}`);
    doc.text(`Reach: ${bestPost.reach || 0}`);
    doc.text(`Engagement: ${bestPost.engagement || 0}`);
  }
  const postTypeCounts =
  instagramData.analytics?.postTypeCounts || {};

const pieLabels = Object.keys(postTypeCounts);
const pieValues = Object.values(postTypeCounts);

if (pieLabels.length > 0) {
  const pieChartBuffer = await generatePieChartImage(
    pieLabels,
    pieValues,
    "Post Type Distribution"
  );

  doc.addPage();

  doc
    .fontSize(22)
    .fillColor("#111111")
    .text("Instagram Content Mix");

  doc.moveDown(1);

  drawChartBlock(doc, pieChartBuffer, 70, 140, 450);
}
};

module.exports = drawInstagramSection;