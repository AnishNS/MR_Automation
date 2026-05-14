const drawPageHeader = require("../components/pageHeader");
const drawInsightsSection = (doc, reportData) => {
  doc.addPage();

    drawPageHeader(
    doc,
    "Key Insights",
    "AI-generated marketing intelligence summary"
    );

  doc.moveDown(1);

  const instagramInsights = reportData.instagram?.analytics?.insights || [];
  const seoInsights = reportData.seo?.analytics?.insights || [];

  if (!instagramInsights.length && !seoInsights.length) {
    doc
      .fontSize(12)
      .fillColor("#555555")
      .text("No insights available for this report.");
    return;
  }

  if (instagramInsights.length) {
    doc.fontSize(16).fillColor("#2563eb").text("Instagram Insights");
    doc.moveDown(0.6);

    instagramInsights.forEach((insight) => {
      doc.fontSize(12).fillColor("#333333").text(`• ${insight}`);
    });

    doc.moveDown(1.2);
  }

  if (seoInsights.length) {
    doc.fontSize(16).fillColor("#2563eb").text("SEO Insights");
    doc.moveDown(0.6);

    seoInsights.forEach((client) => {
      doc.fontSize(13).fillColor("#111111").text(client.clientName);
      doc.moveDown(0.3);

      client.insights.forEach((insight) => {
        doc.fontSize(12).fillColor("#333333").text(`• ${insight}`);
      });

      doc.moveDown(1);
    });
  }
};

module.exports = drawInsightsSection;