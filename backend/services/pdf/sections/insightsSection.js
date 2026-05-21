const drawPageHeader = require("../components/pageHeader");
const drawHighlightBox = require("../components/highlightBox");

const CATEGORY_LABELS = [
  "Audience Growth",
  "Engagement Trend",
  "Content Performance",
  "Reach Analysis",
];

const getCategory = (index) => CATEGORY_LABELS[index % CATEGORY_LABELS.length];

/**
 * Build a strategic observation summary from available data.
 */
const buildStrategicObservation = (data) => {
  const ig = data.instagram?.analytics;
  const seo = data.seo?.analytics;
  const parts = [];

  if (ig?.summary) {
    const s = ig.summary;
    const bp = ig.bestPost;
    if (bp?.postType?.toLowerCase().includes("reel")) {
      parts.push(
        `Short-form Reel content drove the strongest engagement this period, achieving ${bp.views?.toLocaleString() || "significant"} views — outperforming all other formats.`
      );
    } else if (s.engagementRate > 3) {
      parts.push(
        `Content engagement remained strong at ${s.engagementRate}%, with ${s.totalReach?.toLocaleString() || "notable"} reach and consistent audience interaction.`
      );
    } else if (s.totalViews > 5000) {
      parts.push(
        `Viewership reached ${s.totalViews?.toLocaleString()} this period, reflecting solid content visibility across the platform.`
      );
    }
    if (ig.postTypeCounts && Object.keys(ig.postTypeCounts).length > 1) {
      parts.push(
        `A diversified content mix across ${Object.keys(ig.postTypeCounts).length} formats reinforced multi-channel audience engagement.`
      );
    }
  }

  if (seo?.clientSummaries?.length) {
    const traffic = seo.clientSummaries.reduce((a, c) => a + (Number(c.organicTraffic) || 0), 0);
    const impr = seo.clientSummaries.reduce((a, c) => a + (Number(c.impressions) || 0), 0);
    if (traffic > 0 || impr > 0) {
      parts.push(
        `SEO delivered ${traffic?.toLocaleString() || "measurable"} organic visits with ${impr?.toLocaleString() || "notable"} impressions, underscoring integrated content and search performance.`
      );
    }
  }

  return parts.length
    ? parts.join(" ")
    : "This period\u2019s data reveals meaningful patterns in audience behaviour and content performance that inform strategic direction.";
};

/**
 * Draw a single insight card: blue category badge + insight text + soft border.
 */
const drawInsightCard = (doc, category, text, startY, maxWidth) => {
  const w = maxWidth || 485;
  const tw = w - 40;
  const radius = 6;
  const badgeH = 18;
  const textY = 48;
  const pad = 16;

  const th = doc.heightOfString(text, { width: tw, lineGap: 5 });
  const cardH = textY + th + pad;

  // Full card body with soft border
  doc.roundedRect(55, startY, w, cardH, radius).fillAndStroke("#ffffff", "#e5e7eb");
  // Top accent band
  doc.rect(55, startY, w, 4).fill("#2563eb");
  doc.rect(55, startY + 2, w, 2).fill("#2563eb");

  // Category badge
  doc.roundedRect(75, startY + 18, 110, badgeH, 9).fill("#eff6ff");
  doc
    .font("Helvetica-Bold")
    .fontSize(7)
    .fillColor("#1d4ed8")
    .text(category.toUpperCase(), 89, startY + 23);

  // Insight text
  doc
    .font("Helvetica")
    .fontSize(10.5)
    .fillColor("#374151")
    .text(text, 75, startY + textY, { width: tw, lineGap: 5 });

  return startY + cardH;
};

const drawInsightsSection = (doc, reportData) => {
  doc.addPage();

  drawPageHeader(
    doc,
    "Key Insights",
    "Marketing intelligence summary based on uploaded performance data",
    reportData
  );

  const instagramInsights = reportData.instagram?.analytics?.insights || [];
  const seoInsights = reportData.seo?.analytics?.insights || [];

  if (!instagramInsights.length && !seoInsights.length) {
    doc
      .font("Helvetica")
      .fontSize(12)
      .fillColor("#666666")
      .text("No insights available for this report.", 55, 210);
    return;
  }

  let y = 205;

  // Strategic highlight box
  const obs = buildStrategicObservation(reportData);
  const bh = drawHighlightBox(doc, "Key Strategic Observation", obs, 55, y, 485, {
    bgColor: "#f8fafc",
    borderColor: "#dbeafe",
    titleColor: "#1d4ed8",
    textColor: "#374151",
  });
  y += bh + 30;

  // Instagram insight cards
  if (instagramInsights.length) {
    doc.roundedRect(55, y, 485, 36, 8).fillAndStroke("#f8fafc", "#dbeafe");
    doc.rect(55, y, 3, 36).fill("#2563eb");
    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor("#1d4ed8")
      .text("Instagram Insights", 75, y + 11);
    y += 50;

    instagramInsights.forEach((text, idx) => {
      const cat = getCategory(idx);
      y = drawInsightCard(doc, cat, text, y, 485);
      y += 14;
    });
  }

  // SEO insight cards
  if (seoInsights.length) {
    seoInsights.forEach((client) => {
      const items = client.insights || [];
      if (!items.length) return;

      doc.roundedRect(55, y, 485, 36, 8).fillAndStroke("#f8fafc", "#dbeafe");
      doc.rect(55, y, 3, 36).fill("#2563eb");
      doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .fillColor("#1d4ed8")
        .text(`SEO Insights \u2014 ${client.clientName || "Client"}`, 75, y + 11);
      y += 50;

      items.forEach((text, idx) => {
        const cat = getCategory(idx);
        y = drawInsightCard(doc, cat, text, y, 485);
        y += 14;
      });
    });
  }
};

module.exports = drawInsightsSection;