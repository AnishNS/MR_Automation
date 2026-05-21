const drawPageHeader = require("../components/pageHeader");

const drawRecommendationBlock = (doc, title, recommendations, startY) => {
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

  recommendations.forEach((recommendation, index) => {
    const textHeight = doc.heightOfString(recommendation, {
      width: 375,
      lineGap: 4,
    });

    const cardHeight = Math.max(60, textHeight + 30);

    doc
      .roundedRect(70, y, 455, cardHeight, 10)
      .fillAndStroke("#ffffff", "#e5e7eb");

    doc
      .circle(92, y + 27, 11)
      .fill("#2563eb");

    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor("#ffffff")
      .text(String(index + 1), 89, y + 23);

    doc
      .font("Helvetica")
      .fontSize(11.5)
      .fillColor("#374151")
      .text(recommendation, 115, y + 15, {
        width: 375,
        lineGap: 4,
      });

    y += cardHeight + 14;
  });

  return y + 10;
};

const drawRecommendationsSection = (doc, reportData) => {
  doc.addPage();

  drawPageHeader(
    doc,
    "Recommendations",
    "Strategic action points for the upcoming month",
    reportData
  );

  const instagramRecommendations =
    reportData.instagram?.analytics?.recommendations || [];

  const seoRecommendations =
    reportData.seo?.analytics?.recommendations || [];

  if (!instagramRecommendations.length && !seoRecommendations.length) {
    doc
      .font("Helvetica")
      .fontSize(12)
      .fillColor("#555555")
      .text("No recommendations available for this report.", 55, 210);
    return;
  }

  let y = 205;

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