const drawPageHeader = require("../components/pageHeader");

const formatServiceName = (service) => {
  return String(service)
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
};

const drawServiceOverview = (doc, reportData = {}) => {
  doc.addPage();

  drawPageHeader(
    doc,
    "Service Overview",
    "Summary of marketing services included in this monthly report",
    reportData
  );

  const services = Array.isArray(reportData.services)
    ? reportData.services
    : [];

  if (!services.length) {
    doc
      .font("Helvetica")
      .fontSize(13)
      .fillColor("#6b7280")
      .text("No service data available for this report.", 55, 205);
    return;
  }

  let y = 205;

  services.forEach((service, index) => {
    const serviceName = formatServiceName(service);

    doc
      .roundedRect(55, y, 485, 105, 12)
      .fillAndStroke("#ffffff", "#e5e7eb");

    doc
      .circle(88, y + 38, 18)
      .fill("#2563eb");

    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor("#ffffff")
      .text(String(index + 1), 84, y + 32);

    doc
      .font("Helvetica-Bold")
      .fontSize(16)
      .fillColor("#111827")
      .text(serviceName, 125, y + 22);

    doc
      .roundedRect(420, y + 22, 75, 22, 11)
      .fill("#eff6ff");

    doc
      .font("Helvetica-Bold")
      .fontSize(8)
      .fillColor("#2563eb")
      .text("ACTIVE", 438, y + 29);

    doc
      .font("Helvetica")
      .fontSize(11.5)
      .fillColor("#6b7280")
      .text(
        `${serviceName} performance data is included in this report with dedicated insights, recommendations, charts, and comparison metrics where available.`,
        125,
        y + 55,
        {
          width: 360,
          lineGap: 4,
        }
      );

    y += 125;
  });
};

module.exports = drawServiceOverview;