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
    "Monthly Instagram analytics overview",
    {
      clientName: instagramData.clientName,
      month: instagramData.month,
      year: instagramData.year,
    }
  );

  const summary = instagramData.analytics?.summary || {};

  doc
    .fontSize(14)
    .fillColor("#2563eb")
    .text("KPI Summary", 50, 178);

  drawKpiCard(
    doc,
    50,
    210,
    150,
    70,
    "Total Posts",
    summary.totalPosts || 0
  );

  drawKpiCard(
    doc,
    220,
    210,
    150,
    70,
    "Total Views",
    summary.totalViews || 0
  );

  drawKpiCard(
    doc,
    390,
    210,
    150,
    70,
    "Total Reach",
    summary.totalReach || 0
  );

  drawKpiCard(
    doc,
    50,
    300,
    150,
    70,
    "Total Likes",
    summary.totalLikes || 0
  );

  drawKpiCard(
    doc,
    220,
    300,
    150,
    70,
    "Engagement",
    summary.totalEngagement || 0
  );

  drawKpiCard(
    doc,
    390,
    300,
    150,
    70,
    "Engagement Rate",
    `${summary.engagementRate || 0}%`
  );

  drawSectionDivider(doc, 400);

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

  drawChartBlock(doc, chartBuffer, 50, 420, 500);

  const bestPost = instagramData.analytics?.bestPost;
if (bestPost) {
  doc
    .fontSize(14)
    .fillColor("#2563eb")
    .text("Best Performing Post", 390, 675);

  doc
    .fontSize(12)
    .fillColor("#333333")
    .text(`Post Type: ${bestPost.postType || "-"}`, 390, 700);

  doc.text(`Views: ${bestPost.views || 0}`, 390, 716);
  doc.text(`Reach: ${bestPost.reach || 0}`, 390, 732);
  doc.text(`Engagement: ${bestPost.engagement || 0}`, 390, 748);
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

    drawPageHeader(
      doc,
      "Instagram Content Mix",
      "Content format distribution by post type",
      {
        clientName: instagramData.clientName,
        month: instagramData.month,
        year: instagramData.year,
      }
    );

    drawChartBlock(doc, pieChartBuffer, 70, 190, 450);
  }
};

module.exports = drawInstagramSection;