const drawChartBlock = require("../components/chartBlock");
const drawPageHeader = require("../components/pageHeader");

const {
  generateBarChartImage,
} = require("../charts/chartImageGenerator");

const {
  generatePieChartImage,
} = require("../charts/pieChartGenerator");

const buildSummaryText = (summary = {}) => {
  return `Facebook generated ${(summary.totalReach || 0).toLocaleString()} reach, ${(summary.totalViews || 0).toLocaleString()} views with ${(summary.totalEngagement || 0).toLocaleString()} total engagements during this reporting period, achieving ${summary.engagementRate || 0}% engagement rate.`;
};

const buildChartInsight = (summary = {}) => {
  if (
    (summary.totalViews || 0) >
    (summary.totalReach || 0)
  ) {
    return "Views exceeded reach, indicating repeat audience exposure and stronger content retention.";
  }

  return "Facebook content maintained consistent audience visibility during this reporting period.";
};

const buildContentMixSummary = (postTypeCounts = {}) => {
  const entries = Object.entries(postTypeCounts);

  if (!entries.length) {
    return "No Facebook content mix data available.";
  }

  const sorted = entries.sort((a, b) => b[1] - a[1]);

  const topType = sorted[0][0];
  const topCount = sorted[0][1];

  const total = sorted.reduce((sum, [, val]) => sum + val, 0);

  return `${topType} formed the strongest Facebook content format this month with ${topCount} posts, contributing to a diversified publishing mix across ${total} total posts.`;
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
    .fillAndStroke("#f8fafc", "#dbeafe");

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor("#1877f2")
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

  doc.rect(x, y, width, 3).fill("#1877f2");

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

const drawFormatPill = (
  doc,
  x,
  y,
  width,
  label,
  count
) => {
  doc
    .roundedRect(x, y, width, 34, 8)
    .fillAndStroke("#ffffff", "#e2e8f0");

  doc.rect(x, y, width, 2).fill("#1877f2");

  doc
    .font("Helvetica")
    .fontSize(7)
    .fillColor("#6b7280")
    .text(label.toUpperCase(), x + 10, y + 7);

  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor("#111827")
    .text(`${count} posts`, x + 10, y + 20);
};

const drawFacebookSection = async (
  doc,
  facebookData,
  reportData = {}
) => {
  if (!facebookData) return;

  doc.addPage();

  drawPageHeader(
    doc,
    "Facebook Performance",
    "Premium monthly Facebook analytics overview",
    {
      clientName:
        facebookData.clientName || reportData.clientName,
      month: facebookData.month || reportData.month,
      year: facebookData.year || reportData.year,
    }
  );

  const summary = facebookData.analytics?.summary || {};

  const postTypeCounts =
    facebookData.analytics?.postTypeCounts || {};

  let y = 205;

  // =====================================================
  // PERFORMANCE SUMMARY
  // =====================================================

  const perfSummary = buildSummaryText(summary);

  const bh = drawCompactHighlightBox(
    doc,
    "Facebook Performance Summary",
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
    .fillAndStroke("#f8fafc", "#dbeafe");

  doc.rect(55, y, 3, 30).fill("#1877f2");

  doc
    .font("Helvetica-Bold")
    .fontSize(9.5)
    .fillColor("#1877f2")
    .text("FACEBOOK KPI PERFORMANCE", 75, y + 9);

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
    "Total Posts",
    summary.totalPosts || 0
  );

  drawInlineKpiCard(
    doc,
    cardX[1],
    y,
    cardW,
    cardH,
    "Total Reach",
    (summary.totalReach || 0).toLocaleString()
  );

  drawInlineKpiCard(
    doc,
    cardX[2],
    y,
    cardW,
    cardH,
    "Total Views",
    (summary.totalViews || 0).toLocaleString()
  );

  y += cardH + 8;

  // ROW 2

  drawInlineKpiCard(
    doc,
    cardX[0],
    y,
    cardW,
    cardH,
    "Likes",
    (summary.totalLikes || 0).toLocaleString()
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
    .text("Facebook KPI Trend Overview", 55, y);

  y += 3;

  doc
    .moveTo(55, y)
    .lineTo(200, y)
    .lineWidth(1.5)
    .strokeColor("#1877f2")
    .stroke();

  y += 8;

  const chartLabels = [
    "Reach",
    "Views",
    "Likes",
    "Engagement",
  ];

  const chartData = [
    summary.totalReach || 0,
    summary.totalViews || 0,
    summary.totalLikes || 0,
    summary.totalEngagement || 0,
  ];

  const chartBuffer = await generateBarChartImage(
    chartLabels,
    chartData,
    "Facebook KPI Overview"
  );

  drawChartBlock(doc, chartBuffer, 55, y, 400);

  const insightLine = buildChartInsight(summary);

  if (insightLine) {
    const chartImageH = Math.round(400 * (400 / 800));

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
  // CONTENT MIX PAGE
  // =====================================================

  const pieLabels = Object.keys(postTypeCounts);

  const pieValues = Object.values(postTypeCounts);

  if (pieLabels.length > 0) {
    const pieChartBuffer = await generatePieChartImage(
      pieLabels,
      pieValues,
      "Facebook Content Mix"
    );

    doc.addPage();

    drawPageHeader(
      doc,
      "Facebook Content Mix",
      "Facebook content format distribution",
      {
        clientName:
          facebookData.clientName || reportData.clientName,
        month: facebookData.month || reportData.month,
        year: facebookData.year || reportData.year,
      }
    );

    let py = 200;

    const mixSummary = buildContentMixSummary(
      postTypeCounts
    );

    const bh2 = drawCompactHighlightBox(
      doc,
      "Content Mix Summary",
      mixSummary,
      55,
      py,
      485
    );

    py += bh2 + 10;

    const pieWidth = 330;
    const pieX = 75;

    const pieImageH = Math.round(
      pieWidth * (400 / 700)
    );

    const pillH = 34;

    const gapAfterImage = 22;
    const gapAfterPills = 14;

    const cardPad = 14;
    const cardTopPad = 8;
    const cardBottomPad = 14;

    const totalCardH =
      cardTopPad +
      pieImageH +
      gapAfterImage +
      pillH +
      gapAfterPills +
      cardBottomPad;

    doc
      .roundedRect(
        pieX - cardPad,
        py - cardTopPad,
        pieWidth + cardPad * 2,
        totalCardH,
        14
      )
      .fillAndStroke("#ffffff", "#e5e7eb");

    doc.image(pieChartBuffer, pieX, py, {
      width: pieWidth,
    });

    const pillY = py + pieImageH + gapAfterImage;

    const pillW = Math.min(
      130,
      Math.floor((pieWidth - 24) / pieLabels.length) - 6
    );

    const pillGap = 6;

    const totalPillWidth =
      pieLabels.length * pillW +
      (pieLabels.length - 1) * pillGap;

    const pillStartX =
      pieX + (pieWidth - totalPillWidth) / 2;

    pieLabels.forEach((label, i) => {
      const px = pillStartX + i * (pillW + pillGap);

      drawFormatPill(
        doc,
        px,
        pillY,
        pillW,
        label,
        pieValues[i]
      );
    });
  }
};

module.exports = drawFacebookSection;