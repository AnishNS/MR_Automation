const drawPageHeader = require("../components/pageHeader");
const drawRecommendationsSection = (doc, reportData) => {
  doc.addPage();

    drawPageHeader(
    doc,
    "Recommendations",
    "Strategic next-step recommendations"
    );

  doc.moveDown(1);

  const instagramRecommendations =
    reportData.instagram?.analytics?.recommendations || [];

  const seoRecommendations =
    reportData.seo?.analytics?.recommendations || [];

  if (!instagramRecommendations.length && !seoRecommendations.length) {
    doc
      .fontSize(12)
      .fillColor("#555555")
      .text("No recommendations available for this report.");
    return;
  }

  if (instagramRecommendations.length) {
    doc.fontSize(16).fillColor("#2563eb").text("Instagram Recommendations");
    doc.moveDown(0.6);

    instagramRecommendations.forEach((recommendation) => {
      doc.fontSize(12).fillColor("#333333").text(`• ${recommendation}`);
    });

    doc.moveDown(1.2);
  }

  if (seoRecommendations.length) {
    doc.fontSize(16).fillColor("#2563eb").text("SEO Recommendations");
    doc.moveDown(0.6);

    seoRecommendations.forEach((client) => {
      doc.fontSize(13).fillColor("#111111").text(client.clientName);
      doc.moveDown(0.3);

      client.recommendations.forEach((recommendation) => {
        doc.fontSize(12).fillColor("#333333").text(`• ${recommendation}`);
      });

      doc.moveDown(1);
    });
  }
};

module.exports = drawRecommendationsSection;