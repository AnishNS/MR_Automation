const drawChartBlock = require("../components/chartBlock");
const drawPageHeader = require("../components/pageHeader");

const {
  generateBarChartImage,
} = require("../charts/chartImageGenerator");

const {
  generatePieChartImage,
} = require("../charts/pieChartGenerator");

/**
 * Build a strategic performance summary from available Instagram data.
 */
const buildPerformanceSummary = (data) => {
  const summary = data.analytics?.summary;
  const bestPost = data.analytics?.bestPost;
  const postTypeCounts = data.analytics?.postTypeCounts;

  if (!summary) {
    return "Instagram performance data is available for review this period, with key metrics outlined below.";
  }

  const { totalViews, totalReach, engagementRate, totalEngagement } = summary;
  const parts = [];

  if (totalViews || totalReach) {
    parts.push(
      `Instagram achieved ${(totalViews || 0).toLocaleString()} views and ${(totalReach || 0).toLocaleString()} reach`
    );
  }

  if (engagementRate != null) {
    const rateDesc = engagementRate > 3 ? "strong" : engagementRate > 1.5 ? "moderate" : "modest";
    parts.push(
      `with ${rateDesc} ${engagementRate}% engagement (${(totalEngagement || 0).toLocaleString()} interactions)`
    );
  }

  if (bestPost?.postType?.toLowerCase().includes("reel")) {
    parts.push(
      `. Reels led with ${(bestPost.views || 0).toLocaleString()} views`
    );
  } else if (bestPost) {
    parts.push(
      `. ${bestPost.postType || "Content"} led with ${(bestPost.views || 0).toLocaleString()} views`
    );
  }

  const formatCount = postTypeCounts ? Object.keys(postTypeCounts).length : 0;
  if (formatCount > 1) {
    parts.push(` across ${formatCount} formats.`);
  } else {
    parts.push(".");
  }

  return parts.join(" ");
};

/**
 * Build a very short analytics insight line.
 */
const buildChartInsight = (summary) => {
  if (!summary) return "";

  const { totalViews, totalReach, totalEngagement } = summary;

  if (totalViews > totalReach && totalReach > 0) {
    const ratio = ((totalViews - totalReach) / totalReach * 100).toFixed(0);
    return `Views exceeded reach by ${ratio}%, showing strong repeat exposure.`;
  }

  if (totalReach > totalViews && totalViews > 0) {
    return "Reach outpaced views, indicating broad content distribution.";
  }

  if (totalEngagement > 0 && totalViews > 0) {
    const ratio = (totalEngagement / totalViews * 100).toFixed(1);
    return `Engagement represented ${ratio}% of views, reflecting content resonance.`;
  }

  return "";
};

/**
 * Format a raw format name into a clean IG label.
 */
const formatFormatName = (name) => {
  const withoutPrefix = name.replace(/^ig[-_\s]?/i, "").trim();
  const words = withoutPrefix.split(/[-_\s]+/);
  const formatted = words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
  return `IG ${formatted}`;
};

/**
 * Draw a compact highlight box with reduced padding.
 */
/**
 * Build a content mix summary sentence.
 */
const buildContentMixSummary = (postTypeCounts) => {
  const entries = Object.entries(postTypeCounts);
  if (!entries.length) return "No content format data available for this period.";

  const sorted = entries.sort((a, b) => b[1] - a[1]);
  const topFormat = formatFormatName(sorted[0][0]);
  const topCount = sorted[0][1];
  const total = sorted.reduce((s, [, c]) => s + c, 0);
  const others = sorted.slice(1).map(([f]) => f.replace(/^ig[-_\s]?/i, "").trim().toLowerCase()).join(" and ");

  if (sorted.length === 1) {
    return `${topFormat} was the sole content format this period, with ${topCount} posts published.`;
  }

  return `${topFormat} formed the strongest content format this month with ${topCount} posts, supported by ${others} for content variety (${total} total posts).`;
};

/**
 * Build a short strategic insight for the content mix.
 */
const buildMixInsight = (postTypeCounts) => {
  const entries = Object.entries(postTypeCounts);
  if (!entries.length) return "";

  const sorted = entries.sort((a, b) => b[1] - a[1]);
  const topFormat = formatFormatName(sorted[0][0]);
  const others = sorted.slice(1).map(([f]) => f.replace(/^ig[-_\s]?/i, "").trim().toLowerCase());

  if (sorted.length === 1) {
    return `${topFormat} should remain the primary content format for consistency and audience retention.`;
  }

  if (others.length === 1) {
    return `${topFormat} should remain the primary content format while ${others[0]} posts support brand consistency.`;
  }

  return `${topFormat} should remain the primary content format while ${others.slice(0, -1).join(", ")} and ${others[others.length - 1]} posts support brand consistency.`;
};

/**
 * Draw a format breakdown pill.
 */
const drawFormatPill = (doc, x, y, width, label, count) => {
  doc.roundedRect(x, y, width, 34, 8).fillAndStroke("#ffffff", "#e2e8f0");
  doc.rect(x, y, width, 2).fill("#2563eb");

  doc
    .font("Helvetica")
    .fontSize(7)
    .fillColor("#6b7280")
    .text(label.toUpperCase(), x + 10, y + 7, { width: width - 20 });

  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor("#111827")
    .text(`${count} posts`, x + 10, y + 20, { width: width - 20 });
};

const drawCompactHighlightBox = (doc, title, text, x, y, width) => {
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
    .fillColor("#1d4ed8")
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
const drawInlineKpiCard = (doc, x, y, width, height, label, value) => {
  // Card body
  doc.roundedRect(x, y, width, height, 10).fillAndStroke("#ffffff", "#e5e7eb");

  // Top accent line
  doc.rect(x, y, width, 3).fill("#2563eb");

  // Label
  doc
    .font("Helvetica")
    .fontSize(8.5)
    .fillColor("#6b7280")
    .text(label.toUpperCase(), x + 14, y + 14, { width: width - 28 });

  // Value
  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .fillColor("#111827")
    .text(String(value), x + 14, y + 35, { width: width - 28 });
};

const drawInstagramSection = async (doc, instagramData, reportData = {}) => {
  if (!instagramData) return;

  doc.addPage();

  drawPageHeader(
    doc,
    "Instagram Performance",
    "Premium monthly Instagram analytics overview",
    {
      clientName: instagramData.clientName || reportData.clientName,
      month: instagramData.month || reportData.month,
      year: instagramData.year || reportData.year,
    }
  );

  const summary = instagramData.analytics?.summary || {};
  const postTypeCounts = instagramData.analytics?.postTypeCounts || {};

  let y = 205;

  // 1. COMPACT PERFORMANCE SUMMARY
  // =========================================================
  const perfSummary = buildPerformanceSummary(instagramData);
  const bh = drawCompactHighlightBox(
    doc,
    "Instagram Performance Summary",
    perfSummary,
    55,
    y,
    485
  );
  y += bh + 4;

  // =========================================================
  // 2. ENHANCED KPI CARDS (3x2 grid)
  // =========================================================
  const cardW = 144;
  const cardGap = 12;
  const cardH = 54;
  const cardX = [55, 55 + cardW + cardGap, 55 + (cardW + cardGap) * 2];

  // Section header bar
  doc.roundedRect(55, y, 485, 30, 8).fillAndStroke("#f8fafc", "#dbeafe");
  doc.rect(55, y, 3, 30).fill("#2563eb");
  doc
    .font("Helvetica-Bold")
    .fontSize(9.5)
    .fillColor("#1d4ed8")
    .text("KPI PERFORMANCE METRICS", 75, y + 9);
  y += 32;

  // Row 1
  drawInlineKpiCard(doc, cardX[0], y, cardW, cardH, "Total Posts", summary.totalPosts || 0);
  drawInlineKpiCard(doc, cardX[1], y, cardW, cardH, "Total Views", (summary.totalViews || 0).toLocaleString());
  drawInlineKpiCard(doc, cardX[2], y, cardW, cardH, "Total Reach", (summary.totalReach || 0).toLocaleString());

  y += cardH + 8;

  // Row 2
  drawInlineKpiCard(doc, cardX[0], y, cardW, cardH, "Total Likes", (summary.totalLikes || 0).toLocaleString());
  drawInlineKpiCard(doc, cardX[1], y, cardW, cardH, "Engagement", (summary.totalEngagement || 0).toLocaleString());
  drawInlineKpiCard(doc, cardX[2], y, cardW, cardH, "Engagement Rate", `${summary.engagementRate || 0}%`);

  y += cardH + 10;

  // =========================================================
  // 3. CHART SECTION
  // =========================================================
  // Section heading
  doc
    .font("Helvetica-Bold")
    .fontSize(10.5)
    .fillColor("#111827")
    .text("KPI Trend Overview", 55, y);

  y += 3;

  // Accent line under heading
  doc
    .moveTo(55, y)
    .lineTo(155, y)
    .lineWidth(1.5)
    .strokeColor("#2563eb")
    .stroke();

  // Gap before chart
  y += 5;

  const chartData = [
    summary.totalViews || 0,
    summary.totalReach || 0,
    summary.totalLikes || 0,
    summary.totalEngagement || 0,
  ];

  const chartLabels = ["Views", "Reach", "Likes", "Engagement"];

  const chartBuffer = await generateBarChartImage(
    chartLabels,
    chartData,
    "Instagram KPI Overview"
  );

  drawChartBlock(doc, chartBuffer, 55, y, 400);

  // Compact insight line inside chart card
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

  // =========================================================
  // 4. PIE CHART (on separate page if post types exist)
  // =========================================================
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
        clientName: instagramData.clientName || reportData.clientName,
        month: instagramData.month || reportData.month,
        year: instagramData.year || reportData.year,
      }
    );

    let py = 200;

    // Content Mix Summary
    const mixSummary = buildContentMixSummary(postTypeCounts);
    const bh2 = drawCompactHighlightBox(
      doc,
      "Content Mix Summary",
      mixSummary,
      55,
      py,
      485
    );
    py += bh2 + 10;

    // --- Custom chart card with proper spacing ---
    const pieWidth = 330;
    const pieX = 75;
    const pieImageH = Math.round(pieWidth * (400 / 700));
    const insightText = buildMixInsight(postTypeCounts);

    // Estimate insight text height for card sizing
    const insightH = insightText
      ? doc.heightOfString(insightText, { width: pieWidth - 6, lineGap: 3 }) + 4
      : 0;

    const pillH = 34;
    const gapAfterImage = 22;
    const gapAfterPills = 14;
    const cardPad = 14;
    const cardTopPad = 8;
    const cardBottomPad = 14;

    const totalCardH =
      cardTopPad + pieImageH + gapAfterImage + pillH + gapAfterPills + insightH + cardBottomPad;

    // Card background (custom height to fit chart + pills + insight)
    doc
      .roundedRect(pieX - cardPad, py - cardTopPad, pieWidth + cardPad * 2, totalCardH, 14)
      .fillAndStroke("#ffffff", "#e5e7eb");

    // Pie chart image (positioned higher inside card with reduced top padding)
    doc.image(pieChartBuffer, pieX, py, { width: pieWidth });

    // Breakdown pills — well below the chart with generous spacing
    const pillY = py + pieImageH + gapAfterImage;
    const pillW = Math.min(130, Math.floor((pieWidth - 24) / pieLabels.length) - 6);
    const pillGap = 6;
    const totalPillWidth = pieLabels.length * pillW + (pieLabels.length - 1) * pillGap;
    const pillStartX = pieX + (pieWidth - totalPillWidth) / 2;

    pieLabels.forEach((label, i) => {
      const px = pillStartX + i * (pillW + pillGap);
      drawFormatPill(doc, px, pillY, pillW, formatFormatName(label), pieValues[i]);
    });

    // Strategic insight below pills
    if (insightText) {
      doc
        .font("Helvetica")
        .fontSize(7.5)
        .fillColor("#6b7280")
        .text(insightText, pieX + 3, pillY + pillH + gapAfterPills, {
          width: pieWidth - 6,
          lineGap: 3,
        });
    }
  }
};

module.exports = drawInstagramSection;