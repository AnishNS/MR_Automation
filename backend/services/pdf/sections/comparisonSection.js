const drawPageHeader = require("../components/pageHeader");
const drawComparisonSection = (doc, reportData) => {
  doc.addPage();

    drawPageHeader(
    doc,
    "Month-to-Month Comparison",
    "Performance growth tracking overview"
    );
  doc.moveDown(1);

  const instagramComparisons =
    reportData.instagram?.analytics?.comparisons || {};

  const seoSummaries =
    reportData.seo?.analytics?.clientSummaries || [];

  if (
    !Object.keys(instagramComparisons).length &&
    !seoSummaries.length
  ) {
    doc
      .fontSize(12)
      .fillColor("#555555")
      .text("No comparison data available for this report.");
    return;
  }

  if (Object.keys(instagramComparisons).length) {
    doc.fontSize(16).fillColor("#2563eb").text("Instagram Comparison");
    doc.moveDown(0.6);

    Object.values(instagramComparisons).forEach((item) => {
      doc
        .fontSize(12)
        .fillColor("#333333")
        .text(
          `${item.label}: Previous ${item.previous}, Current ${item.current}, Difference ${item.difference}, Trend ${item.trend}`
        );
    });

    doc.moveDown(1.2);
  }

  if (seoSummaries.length) {
    doc.fontSize(16).fillColor("#2563eb").text("SEO Comparison");
    doc.moveDown(0.6);

    seoSummaries.forEach((client) => {
      doc.fontSize(13).fillColor("#111111").text(client.clientName);
      doc.moveDown(0.3);

      const comparisons = client.comparisons || {};

      Object.values(comparisons).forEach((item) => {
        doc
          .fontSize(12)
          .fillColor("#333333")
          .text(
            `${item.label}: Previous ${item.previous}, Current ${item.current}, Difference ${item.difference}, Trend ${item.trend}`
          );
      });

      doc.moveDown(1);
    });
  }
};

module.exports = drawComparisonSection;