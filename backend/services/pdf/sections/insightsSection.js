const drawPageHeader = require("../components/pageHeader");

const drawInsightCard = (doc, title, insights, startY) => {
  let y = startY;

  doc
    .roundedRect(55, y, 485, 40, 10)
    .fillAndStroke("#f3f4f6", "#e5e7eb");

  doc
    .fontSize(15)
    .fillColor("#2563eb")
    .text(title, 75, y + 13);

  y += 60;

  insights.forEach((insight) => {
    doc
      .roundedRect(70, y, 455, 55, 8)
      .fillAndStroke("#ffffff", "#e5e7eb");

    doc
      .fontSize(11.5)
      .fillColor("#374151")
      .text(`• ${insight}`, 90, y + 14, {
        width: 410,
        lineGap: 4,
      });

    y += 70;
  });

  return y + 10;
};

const drawInsightsSection = (doc, reportData) => {
  doc.addPage();

  drawPageHeader(
    doc,
    "Key Insights",
    "Marketing intelligence summary based on uploaded performance data"
  );

  const instagramInsights = reportData.instagram?.analytics?.insights || [];
  const seoInsights = reportData.seo?.analytics?.insights || [];

  if (!instagramInsights.length && !seoInsights.length) {
    doc
      .fontSize(12)
      .fillColor("#555555")
      .text("No insights available for this report.", 50, 150);
    return;
  }

  let y = 150;

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