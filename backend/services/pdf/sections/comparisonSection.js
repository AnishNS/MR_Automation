const drawPageHeader = require("../components/pageHeader");
const drawHighlightBox = require("../components/highlightBox");

/**
 * Trend display helpers
 */
const trendColor = (trend) => {
  if (trend === "increase") return "#16a34a";
  if (trend === "decrease") return "#dc2626";
  return "#6b7280";
};



const trendBg = (trend) => {
  if (trend === "increase") return "#f0fdf4";
  if (trend === "decrease") return "#fef2f2";
  return "#f9fafb";
};

/**
 * Build a strategic growth overview paragraph from available comparison data.
 */
const buildGrowthOverview = (data) => {
  const igComps = data.instagram?.analytics?.comparisons || {};
  const seoSummaries = data.seo?.analytics?.clientSummaries || [];
  const parts = [];

  const igValues = Object.values(igComps);
  if (igValues.length) {
    const withGrowth = igValues.filter((c) => c.growthPercent != null);
    if (withGrowth.length) {
      const avgGrowth =
        withGrowth.reduce((s, c) => s + c.growthPercent, 0) / withGrowth.length;
      const increases = withGrowth.filter((c) => c.trend === "increase").length;
      const decreases = withGrowth.filter((c) => c.trend === "decrease").length;
      parts.push(
        `Instagram metrics ${
          avgGrowth > 0 ? "grew" : "declined"
        } an average of ${Math.abs(avgGrowth).toFixed(
          1
        )}% this period, with ${increases} of ${
          withGrowth.length
        } metrics trending positively and ${decreases} showing declines.`
      );
    }
  }

  if (seoSummaries.length) {
    seoSummaries.forEach((client) => {
      const comps = Object.values(client.comparisons || {}).filter(
        (c) => c.growthPercent != null
      );
      if (comps.length) {
        const avgGrowth =
          comps.reduce((s, c) => s + c.growthPercent, 0) / comps.length;
        const direction = avgGrowth > 0 ? "growth" : "contraction";
        parts.push(
          `SEO for ${client.clientName || "client"} showed ${direction} of ${Math.abs(
            avgGrowth
          ).toFixed(1)}% on average across ${comps.length} metrics, ${
            avgGrowth > 0
              ? "reinforcing search visibility improvements"
              : "highlighting areas for optimisation focus"
          }.`
        );
      }
    });
  }

  return parts.length
    ? parts.join(" ")
    : "Month-over-month comparison data provides essential insight into performance trajectory and growth trends across active marketing services.";
};

/**
 * Build a strategic insight statement based on available comparison data.
 * Used for the bottom insight strip on the Growth Analysis page.
 */
const buildStrategicInsight = (data) => {
  const igComps = data.instagram?.analytics?.comparisons || {};
  const seoSummaries = data.seo?.analytics?.clientSummaries || [];

  const allComps = [];
  Object.values(igComps).forEach((c) => allComps.push(c));
  seoSummaries.forEach((client) => {
    Object.values(client.comparisons || {}).forEach((c) => allComps.push(c));
  });

  const withGrowth = allComps.filter((c) => c.growthPercent != null);
  if (!withGrowth.length) {
    return "Monthly comparison data provides a baseline for understanding performance trajectory and identifying long-term growth opportunities.";
  }

  const reachEntry = withGrowth.find(
    (c) =>
      (c.label || "").toLowerCase().includes("reach") ||
      (c.label || "").toLowerCase().includes("views")
  );
  const engagementEntry = withGrowth.find(
    (c) =>
      (c.label || "").toLowerCase().includes("engagement") ||
      (c.label || "").toLowerCase().includes("like") ||
      (c.label || "").toLowerCase().includes("comment")
  );

  if (
    reachEntry &&
    engagementEntry &&
    reachEntry.growthPercent > engagementEntry.growthPercent
  ) {
    return "Reach growth continues to outperform engagement growth, indicating strong visibility expansion opportunities. Focus on content that converts visibility into active audience participation.";
  }
  if (
    engagementEntry &&
    reachEntry &&
    engagementEntry.growthPercent > reachEntry.growthPercent
  ) {
    return "Engagement growth is outpacing reach expansion, suggesting strong content resonance with the existing audience. Expanding reach should be the next strategic priority.";
  }

  const increasing = withGrowth.filter((c) => c.trend === "increase").length;
  const total = withGrowth.length;
  if (increasing === total) {
    return "All tracked metrics show positive month-over-month growth, reinforcing a strong upward trajectory. Maintaining content quality and consistency will sustain this momentum.";
  }
  if (increasing > total / 2) {
    return "The majority of performance metrics show positive month-over-month growth. Continued focus on optimising the few declining areas will strengthen the overall trajectory.";
  }
  return "While some metrics show positive movement, others require attention. A balanced approach that builds on strengths while addressing underperforming areas will drive sustained growth.";
};

/**
 * Draw an enhanced growth metric card with previous, current, growth%, and trend indicator.
 *
 * Card layout (222px wide x ~128px tall):
 *   +--------------------------+
 *   | = (accent bar)           |
 *   | Label         \u2191 Growth  |
 *   | -----------------        |
 *   | PREVIOUS  CURRENT        |
 *   | 12,345    15,678         |
 *   | -----------------        |
 *   | [ +14.5% ]  Monthly Chg  |
 *   |              +3,333      |
 *   +--------------------------+
 */
const drawGrowthCard = (doc, item, x, y, cardWidth) => {
  const color = trendColor(item.trend);
  const bg = trendBg(item.trend);
  const hasGrowth = item.growthPercent != null;
  const growthText = hasGrowth
    ? `${item.growthPercent > 0 ? "+" : ""}${item.growthPercent}%`
    : "\u2014";
  const halfW = Math.floor(cardWidth / 2);
  const trendLabel =
    item.trend === "increase"
      ? "Growth"
      : item.trend === "decrease"
      ? "Decline"
      : "Stable";

  // Card body with soft border
  doc.roundedRect(x, y, cardWidth, 128, 10).fillAndStroke("#ffffff", "#e5e7eb");

  // Top accent bar in trend color
  doc.rect(x, y, cardWidth, 3).fill(color);

  // Metric label (left) + trend indicator (right, on same line)
  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor("#111827")
    .text(item.label || "Metric", x + 16, y + 16, { width: cardWidth - 110 });

  // Trend indicator badge (top-right corner)
  doc
    .font("Helvetica-Bold")
    .fontSize(7)
    .fillColor(color)
    .text(trendLabel, x + cardWidth - 80, y + 18, {
      width: 65,
      align: "right",
    });

  // Separator between label row and values
  doc
    .moveTo(x + 16, y + 38)
    .lineTo(x + cardWidth - 16, y + 38)
    .lineWidth(0.5)
    .strokeColor("#f3f4f6")
    .stroke();

  // Previous column
  doc
    .font("Helvetica")
    .fontSize(7.5)
    .fillColor("#9ca3af")
    .text("PREVIOUS MONTH", x + 16, y + 48);
  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor("#6b7280")
    .text(String(item.previous ?? "\u2014"), x + 16, y + 62);

  // Current column
  doc
    .font("Helvetica")
    .fontSize(7.5)
    .fillColor("#9ca3af")
    .text("CURRENT MONTH", x + halfW + 6, y + 48);
  doc
    .font("Helvetica-Bold")
    .fontSize(13)
    .fillColor("#111827")
    .text(String(item.current ?? "\u2014"), x + halfW + 6, y + 62);

  // Separator
  doc
    .moveTo(x + 16, y + 86)
    .lineTo(x + cardWidth - 16, y + 86)
    .lineWidth(0.5)
    .strokeColor("#f3f4f6")
    .stroke();

  // MONTHLY CHANGE label + value (left column)
  doc
    .font("Helvetica")
    .fontSize(7.5)
    .fillColor("#9ca3af")
    .text("MONTHLY CHANGE", x + 16, y + 96);
  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor("#374151")
    .text(String(item.difference ?? "\u2014"), x + 16, y + 108);

  // TREND label + value (right column)
  doc
    .font("Helvetica")
    .fontSize(7.5)
    .fillColor("#9ca3af")
    .text("TREND", x + halfW + 6, y + 96);
  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor(color)
    .text(trendLabel, x + halfW + 6, y + 108);
};

/**
 * Draw a section header bar (matching the pattern used in insightsSection.js
 * and recommendationsSection.js).
 */
const drawSectionHeaderBar = (doc, title, y) => {
  doc.roundedRect(55, y, 485, 36, 8).fillAndStroke("#f8fafc", "#dbeafe");
  doc.rect(55, y, 3, 36).fill("#2563eb");
  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor("#1d4ed8")
    .text(title, 75, y + 11);
  return y + 50;
};

/**
 * Draw a group of growth metric cards in a two-column grid.
 */
const drawGrowthGroup = (doc, comparisons, startY) => {
  let y = startY;
  const items = Object.values(comparisons || {});
  if (!items.length) return y;

  items.forEach((item, index) => {
    const x = index % 2 === 0 ? 60 : 318;
    drawGrowthCard(doc, item, x, y, 222);

    if (index % 2 === 1) {
      y += 148;
    }
  });

  // Extra row if odd count
  if (items.length % 2 === 1) {
    y += 148;
  }

  return y + 10;
};

const drawComparisonSection = (doc, reportData) => {
  doc.addPage();

  drawPageHeader(
    doc,
    "Growth Analysis",
    "Month-over-month performance growth and trend analysis",
    reportData
  );

  const instagramComparisons =
    reportData.instagram?.analytics?.comparisons || {};
  const seoSummaries = reportData.seo?.analytics?.clientSummaries || [];

  if (!Object.keys(instagramComparisons).length && !seoSummaries.length) {
    doc
      .font("Helvetica")
      .fontSize(12)
      .fillColor("#666666")
      .text("No comparison data available for this report.", 55, 205);
    return;
  }

  let y = 205;

  // 1. Strategic growth overview
  const overviewText = buildGrowthOverview(reportData);
  const bh = drawHighlightBox(doc, "Growth Performance Overview", overviewText, 55, y, 485, {
    bgColor: "#f8fafc",
    borderColor: "#dbeafe",
    titleColor: "#1d4ed8",
    textColor: "#374151",
  });
  y += bh + 30;

  // 2. Instagram growth metrics
  if (Object.keys(instagramComparisons).length) {
    y = drawSectionHeaderBar(doc, "Instagram Growth Metrics", y);
    y = drawGrowthGroup(doc, instagramComparisons, y);
  }

  // 3. SEO growth metrics (per client)
  if (seoSummaries.length) {
    seoSummaries.forEach((client) => {
      const clientComps = client.comparisons || {};
      if (!Object.keys(clientComps).length) return;

      y = drawSectionHeaderBar(
        doc,
        `SEO Growth Metrics \u2014 ${client.clientName || "Client"}`,
        y
      );
      y = drawGrowthGroup(doc, clientComps, y);
    });
  }

  // 4. Bottom strategic insight strip
  y += 4;
  doc
    .moveTo(55, y)
    .lineTo(540, y)
    .lineWidth(0.75)
    .strokeColor("#dbeafe")
    .stroke();

  y += 14;

  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .fillColor("#2563eb")
    .text("STRATEGIC INSIGHT", 55, y);

  y += 14;

  const insightText = buildStrategicInsight(reportData);
  doc
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor("#374151")
    .text(insightText, 55, y, {
      width: 485,
      lineGap: 4,
    });
};

module.exports = drawComparisonSection;