const drawPageHeader = require("../components/pageHeader");

const drawInsightCard = (doc, title, insights, startY) => {
  let y = startY;

  doc
    .roundedRect(55, y, 485, 44, 12)
    .fillAndStroke("#eff6ff", "#bfdbfe");

  doc
    .font("Helvetica-Bold")
    .fontSize(15)
    .fillColor("#1d4ed8")
    .text(title, 75, y + 14);

  y += 62;

  insights.forEach((insight) => {
    const insightHeight = doc.heightOfString(insight, {
      width: 385,
      lineGap: 4,
    });

    const cardHeight = Math.max(58, insightHeight + 28);

    doc
      .roundedRect(70, y, 455, cardHeight, 10)
      .fillAndStroke("#ffffff", "#e5e7eb");

    doc
      .circle(92, y + 25, 5)
      .fill("#2563eb");

    doc
      .font("Helvetica")
      .fontSize(11.5)
      .fillColor("#374151")
      .text(insight, 110, y + 15, {
        width: 385,
        lineGap: 4,
      });

    y += cardHeight + 14;
  });

  return y + 10;
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
      .fillColor("#555555")
      .text("No insights available for this report.", 55, 210);
    return;
  }

  let y = 205;

  if (instagramInsights.length) {
    y = drawInsightCard(doc, "Instagram Insights", instagramInsights, y);
  }

  if (seoInsights.length) {
    seoInsights.forEach((client) => {
      y = drawInsightCard(
        doc,
        `SEO Insights - ${client.clientName}`,
        client.insights || [],
        y
      );
    });
  }
};

module.exports = drawInsightsSection;