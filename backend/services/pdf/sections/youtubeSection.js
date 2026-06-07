const drawChartBlock = require("../components/chartBlock");
const drawPageHeader = require("../components/pageHeader");

const {
  generateBarChartImage,
} = require("../charts/chartImageGenerator");

const {
  generatePieChartImage,
} = require("../charts/pieChartGenerator");

const buildSummaryText = (summary = {}) => {
  return `YouTube generated ${(summary.totalViews || 0).toLocaleString()} views, ${(summary.totalWatchTime || 0).toLocaleString()} watch hours and ${(summary.totalSubscribers || 0).toLocaleString()} subscribers during this reporting period, achieving ${summary.engagementRate || 0}% engagement rate.`;
};

const buildChartInsight = (summary = {}) => {
  if (
    (summary.totalWatchTime || 0) >
    (summary.totalViews || 0)
  ) {
    return "Watch time remained strong relative to total views, indicating healthy audience retention.";
  }

  return "YouTube content maintained consistent viewership and engagement throughout the reporting period.";
};

const drawCompactHighlightBox = (
  doc,
  title,
  text,
  x,
  y,
  width
) => {
  const textHeight = doc.heightOfString(text, {
    width: width - 36,
    lineGap: 4,
  });

  const boxHeight = textHeight + 48;

  doc
    .roundedRect(x, y, width, boxHeight, 10)
    .fillAndStroke("#f8fafc", "#fee2e2");

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor("#ff0000")
    .text(title, x + 16, y + 14);

  doc
    .font("Helvetica")
    .fontSize(10.5)
    .fillColor("#374151")
    .text(text, x + 16, y + 35, {
      width: width - 36,
      lineGap: 4,
    });

  return boxHeight;
};

const drawInlineKpiCard = (
  doc,
  x,
  y,
  width,
  height,
  label,
  value
) => {
  doc
    .roundedRect(x, y, width, height, 10)
    .fillAndStroke("#ffffff", "#e5e7eb");

  doc.rect(x, y, width, 3).fill("#ff0000");

  doc
    .font("Helvetica")
    .fontSize(8.5)
    .fillColor("#6b7280")
    .text(label.toUpperCase(), x + 14, y + 14);

  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .fillColor("#111827")
    .text(String(value), x + 14, y + 35);
};

const drawYouTubeSection = async (
  doc,
  youtubeData,
  reportData = {}
) => {
  if (!youtubeData) return;

  doc.addPage();

  drawPageHeader(
    doc,
    "YouTube Performance",
    "Premium monthly YouTube analytics overview",
    {
      clientName:
        youtubeData.clientName || reportData.clientName,
      month: youtubeData.month || reportData.month,
      year: youtubeData.year || reportData.year,
    }
  );

  const summary = youtubeData.analytics?.summary || {};

  let y = 205;

  // =====================================================
  // PERFORMANCE SUMMARY
  // =====================================================

  const perfSummary = buildSummaryText(summary);

  const bh = drawCompactHighlightBox(
    doc,
    "YouTube Performance Summary",
    perfSummary,
    55,
    y,
    485
  );

  y += bh + 4;

  // =====================================================
  // KPI HEADER
  // =====================================================

  doc
    .roundedRect(55, y, 485, 30, 8)
    .fillAndStroke("#f8fafc", "#fee2e2");

  doc.rect(55, y, 3, 30).fill("#ff0000");

  doc
    .font("Helvetica-Bold")
    .fontSize(9.5)
    .fillColor("#ff0000")
    .text("YOUTUBE KPI PERFORMANCE", 75, y + 9);

  y += 32;

  const cardW = 144;
  const cardGap = 12;
  const cardH = 54;

  const cardX = [
    55,
    55 + cardW + cardGap,
    55 + (cardW + cardGap) * 2,
  ];

  // ROW 1

  drawInlineKpiCard(
    doc,
    cardX[0],
    y,
    cardW,
    cardH,
    "Total Videos",
    summary.totalVideos || 0
  );

  drawInlineKpiCard(
    doc,
    cardX[1],
    y,
    cardW,
    cardH,
    "Total Views",
    (summary.totalViews || 0).toLocaleString()
  );

  drawInlineKpiCard(
    doc,
    cardX[2],
    y,
    cardW,
    cardH,
    "Watch Time",
    (summary.totalWatchTime || 0).toLocaleString()
  );

  y += cardH + 8;

  // ROW 2

  drawInlineKpiCard(
    doc,
    cardX[0],
    y,
    cardW,
    cardH,
    "Subscribers",
    (summary.totalSubscribers || 0).toLocaleString()
  );

  drawInlineKpiCard(
    doc,
    cardX[1],
    y,
    cardW,
    cardH,
    "Engagement",
    (summary.totalEngagement || 0).toLocaleString()
  );

  drawInlineKpiCard(
    doc,
    cardX[2],
    y,
    cardW,
    cardH,
    "Engagement Rate",
    `${summary.engagementRate || 0}%`
  );

  y += cardH + 12;

  // =====================================================
  // CHART SECTION
  // =====================================================

  doc
    .font("Helvetica-Bold")
    .fontSize(10.5)
    .fillColor("#111827")
    .text("YouTube KPI Trend Overview", 55, y);

  y += 3;

  doc
    .moveTo(55, y)
    .lineTo(210, y)
    .lineWidth(1.5)
    .strokeColor("#ff0000")
    .stroke();

  y += 8;

  const chartLabels = [
    "Views",
    "Watch Time",
    "Subscribers",
    "Engagement",
  ];

  const chartData = [
    summary.totalViews || 0,
    summary.totalWatchTime || 0,
    summary.totalSubscribers || 0,
    summary.totalEngagement || 0,
  ];

  const chartBuffer = await generateBarChartImage(
    chartLabels,
    chartData,
    "YouTube KPI Overview"
  );

  drawChartBlock(doc, chartBuffer, 55, y, 400);

  const insightLine = buildChartInsight(summary);

  if (insightLine) {
    const chartImageH = Math.round(
      400 * (400 / 800)
    );

    const insightY = y + chartImageH + 5;

    doc
      .font("Helvetica")
      .fontSize(7.5)
      .fillColor("#6b7280")
      .text(insightLine, 62, insightY, {
        width: 390,
        lineGap: 3,
      });
  }

  // =====================================================
  // TOP VIDEO PAGE
  // =====================================================

  if (youtubeData.analytics?.bestVideo) {
    doc.addPage();

    drawPageHeader(
      doc,
      "Top Performing Video",
      "Best performing content from this reporting period",
      {
        clientName:
          youtubeData.clientName || reportData.clientName,
        month: youtubeData.month || reportData.month,
        year: youtubeData.year || reportData.year,
      }
    );

    const video =
      youtubeData.analytics.bestVideo;

    drawCompactHighlightBox(
      doc,
      "Top Video Performance",
      `"${
        video.title || "Untitled Video"
      }" generated ${
        video.views || 0
      } views and delivered the strongest performance during this reporting period.`,
      55,
      220,
      485
    );
  }
};

module.exports = drawYouTubeSection;