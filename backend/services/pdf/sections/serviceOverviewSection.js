const drawServiceOverview = (doc, reportData) => {
  doc.addPage();

  doc
    .fontSize(24)
    .fillColor("#111111")
    .text("Service Overview");

  doc.moveDown(1);

  const services = reportData.services || [];

  if (!services.length) {
    doc
      .fontSize(13)
      .fillColor("#555555")
      .text("No service data available for this report.");
    return;
  }

  services.forEach((service, index) => {
    doc
      .fontSize(16)
      .fillColor("#2563eb")
      .text(`${index + 1}. ${service}`);

    doc.moveDown(0.5);

    doc
      .fontSize(12)
      .fillColor("#444444")
      .text(
        `${service} performance data is included in this monthly report and will be explained in detail in its dedicated section.`,
        {
          lineGap: 4,
        }
      );

    doc.moveDown(1.2);
  });
};

module.exports = drawServiceOverview;
