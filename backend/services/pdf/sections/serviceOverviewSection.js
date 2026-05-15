const drawPageHeader = require("../components/pageHeader");

const drawServiceOverview = (doc, reportData) => {
  doc.addPage();

  drawPageHeader(
    doc,
    "Service Overview",
    "Summary of marketing services included in this monthly report"
  );

  const services = reportData.services || [];

  if (!services.length) {
    doc
      .fontSize(13)
      .fillColor("#555555")
      .text("No service data available for this report.", 50, 150);
    return;
  }

  let y = 150;

  services.forEach((service, index) => {
    doc
      .roundedRect(55, y, 485, 75, 10)
      .fillAndStroke("#ffffff", "#e5e7eb");

    doc
      .circle(85, y + 37, 15)
      .fill("#2563eb");

    doc
      .fontSize(11)
      .fillColor("#ffffff")
      .text(String(index + 1), 81, y + 31);

    doc
      .fontSize(15)
      .fillColor("#111827")
      .text(service, 120, y + 18);

    doc
      .fontSize(11.5)
      .fillColor("#6b7280")
      .text(
        `${service} performance data is included in this report with dedicated insights, recommendations, charts, and comparison metrics where available.`,
        120,
        y + 42,
        {
          width: 380,
          lineGap: 3,
        }
      );

    y += 95;
  });
};

module.exports = drawServiceOverview;