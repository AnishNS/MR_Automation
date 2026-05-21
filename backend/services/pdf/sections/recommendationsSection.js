const drawPageHeader = require("../components/pageHeader");
const drawHighlightBox = require("../components/highlightBox");

const STRATEGY_TAGS = [
  "Content Strategy",
  "Engagement Optimisation",
  "Growth Focus",
  "Format Optimisation",
];

const getTag = (index) => STRATEGY_TAGS[index % STRATEGY_TAGS.length];

/**
 * Build a strategic direction statement from available data.
 */
const buildStrategicDirection = (data) => {
  const ig = data.instagram?.analytics;
  const seo = data.seo?.analytics;
  const parts = [];

  if (ig) {
    const bp = ig.bestPost;
    if (bp?.postType?.toLowerCase().includes("reel")) {
      parts.push(
        "Future content planning should prioritise high-performing Reel formats while maintaining consistency in audience engagement and posting frequency."
      );
    } else if (ig.summary?.engagementRate > 2) {
      parts.push(
        "Continue building on current content strategies that are driving measurable engagement, while exploring complementary formats to expand audience reach."
      );
    } else if (ig.summary) {
      parts.push(
        "Shift content strategy toward higher-engagement formats and interactive content to improve audience retention and interaction rates."
      );
    }
  }

  if (seo?.clientSummaries?.length) {
    const totalTraffic = seo.clientSummaries.reduce((a, c) => a + (Number(c.organicTraffic) || 0), 0);
    if (totalTraffic > 0) {
      parts.push(
        "SEO efforts should remain focused on content optimisation and keyword targeting to sustain and grow organic search visibility."
      );
    }
  }

  return parts.length
    ? parts.join(" ")
    : "Focus next month\u2019s efforts on strengthening content performance across all active channels, with an emphasis on data-driven optimisation and consistent publishing cadence.";
};

/**
 * Draw a single action card: number badge + tag pill + recommendation text + soft border.
 */
const drawActionCard = (doc, tag, text, index, startY, maxWidth) => {
  const w = maxWidth || 485;
  const tw = w - 70;
  const radius = 6;
  const textY = 48;
  const pad = 16;

  const th = doc.heightOfString(text, { width: tw, lineGap: 5 });
  const cardH = textY + th + pad;

  // Full card body with soft border
  doc.roundedRect(55, startY, w, cardH, radius).fillAndStroke("#ffffff", "#e5e7eb");
  // Top accent band
  doc.rect(55, startY, w, 3).fill("#2563eb");
  // Left accent bar (full height)
  doc.rect(55, startY, 3, cardH).fill("#2563eb");

  // Number badge
  doc.circle(80, startY + 22, 10).fill("#2563eb");
  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .fillColor("#ffffff")
    .text(String(index + 1), 77, startY + 18);

  // Strategy tag
  doc.roundedRect(105, startY + 17, 120, 16, 8).fill("#f0f5ff");
  doc
    .font("Helvetica-Bold")
    .fontSize(6.5)
    .fillColor("#2563eb")
    .text(tag.toUpperCase(), 118, startY + 21);

  // Recommendation text
  doc
    .font("Helvetica")
    .fontSize(10.5)
    .fillColor("#374151")
    .text(text, 80, startY + textY, { width: tw, lineGap: 5 });

  return startY + cardH;
};

const drawRecommendationsSection = (doc, reportData) => {
  doc.addPage();

  drawPageHeader(
    doc,
    "Recommendations",
    "Strategic action points for the upcoming month",
    reportData
  );

  const instagramRecommendations = reportData.instagram?.analytics?.recommendations || [];
  const seoRecommendations = reportData.seo?.analytics?.recommendations || [];

  if (!instagramRecommendations.length && !seoRecommendations.length) {
    doc
      .font("Helvetica")
      .fontSize(12)
      .fillColor("#666666")
      .text("No recommendations available for this report.", 55, 210);
    return;
  }

  let y = 205;

  // Strategic direction highlight box
  const dirText = buildStrategicDirection(reportData);
  const bh = drawHighlightBox(doc, "Strategic Direction", dirText, 55, y, 485, {
    bgColor: "#f8fafc",
    borderColor: "#dbeafe",
    titleColor: "#1d4ed8",
    textColor: "#374151",
  });
  y += bh + 30;

  // Instagram action cards
  if (instagramRecommendations.length) {
    doc.roundedRect(55, y, 485, 36, 8).fillAndStroke("#f8fafc", "#dbeafe");
    doc.rect(55, y, 3, 36).fill("#2563eb");
    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor("#1d4ed8")
      .text("Instagram Recommendations", 75, y + 11);
    y += 50;

    instagramRecommendations.forEach((text, idx) => {
      const tag = getTag(idx);
      y = drawActionCard(doc, tag, text, idx, y, 485);
      y += 14;
    });
  }

  // SEO action cards
  if (seoRecommendations.length) {
    seoRecommendations.forEach((client) => {
      const items = client.recommendations || [];
      if (!items.length) return;

      doc.roundedRect(55, y, 485, 36, 8).fillAndStroke("#f8fafc", "#dbeafe");
      doc.rect(55, y, 3, 36).fill("#2563eb");
      doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .fillColor("#1d4ed8")
        .text(`SEO Recommendations \u2014 ${client.clientName || "Client"}`, 75, y + 11);
      y += 50;

      items.forEach((text, idx) => {
        const tag = getTag(idx);
        y = drawActionCard(doc, tag, text, idx, y, 485);
        y += 14;
      });
    });
  }
};

module.exports = drawRecommendationsSection;