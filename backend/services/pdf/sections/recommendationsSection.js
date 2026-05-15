const drawPageHeader = require("../components/pageHeader");

const drawRecommendationBlock = (doc, title, recommendations, startY) => {
  let y = startY;

  doc
    .roundedRect(55, y, 485, 40, 10)
    .fillAndStroke("#eef2ff", "#dbeafe");

  doc
    .fontSize(15)
    .fillColor("#2563eb")
    .text(title, 75, y + 13);

  y += 60;

  recommendations.forEach((recommendation, index) => {
    doc
      .roundedRect(70, y, 455, 58, 8)
      .fillAndStroke("#ffffff", "#e5e7eb");

    doc
      .circle(90, y + 28, 10)
      .fill("#2563eb");

    doc
      .fontSize(9)
      .fillColor("#ffffff")
      .text(String(index + 1), 87, y + 24);

    doc
      .fontSize(11.5)
      .fillColor("#374151")
      .text(recommendation, 115, y + 14, {
        width: 380,
        lineGap: 4,
      });

    y += 72;
  });

  return y + 10;
};

const drawRecommendationsSection = (doc, reportData) => {
  doc.addPage();

  drawPageHeader(
    doc,
    "Recommendations",
    "Strategic action points for the upcoming month"
  );

  const instagramRecommendations =
    reportData.instagram?.analytics?.recommendations || [];

  const seoRecommendations =
    reportData.seo?.analytics?.recommendations || [];

  if (!instagramRecommendations.length && !seoRecommendations.length) {
    doc
      .fontSize(12)
      .fillColor("#555555")
      .text("No recommendations available for this report.", 50, 150);
    return;
  }

  let y = 150;

  if (instagramRecommendations.length) {
    y = drawRecommendationBlock(
      doc,
      "Instagram Recommendations",
      instagramRecommendations,
      y
    );
  }

  if (seoRecommendations.length) {
    seoRecommendations.forEach((client) => {
      y = drawRecommendationBlock(
        doc,
        `SEO Recommendations - ${client.clientName}`,
        client.recommendations || [],
        y
      );
    });
  }
};

module.exports = drawRecommendationsSection;