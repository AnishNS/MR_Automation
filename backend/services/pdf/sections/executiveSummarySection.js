const drawExecutiveSummary = (doc, reportData) => {
  doc.addPage();

  doc
    .fontSize(24)
    .fillColor("#111111")
    .text("Executive Summary");

  doc.moveDown(1);

  doc
    .fontSize(13)
    .fillColor("#444444")
    .text(
      "This report provides a comprehensive overview of the client's monthly digital marketing performance, including available service data, KPI summaries, campaign activity, SEO progress, social media performance, and upcoming strategic focus areas.",
      {
        lineGap: 6,
      }
    );

  doc.moveDown(2);

  doc
    .fontSize(18)
    .fillColor("#111111")
    .text("Services Included");

  doc.moveDown(1);

  const services = reportData.services || [];

  services.forEach((service, index) => {
    doc
      .fontSize(13)
      .fillColor("#333333")
      .text(`${index + 1}. ${service}`);
  });
};

module.exports = drawExecutiveSummary;