const drawPageHeader = require("../components/pageHeader");

const formatServiceName = (service) => {
  return String(service)
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
};

const getServiceMetrics = (service, reportData = {}) => {
  if (service === "instagram") {
    const summary = reportData.instagram?.analytics?.summary || {};

    return [
      { label: "Posts", value: summary.totalPosts || 0 },
      { label: "Reach", value: summary.totalReach || 0 },
      { label: "Eng.", value: summary.totalEngagement || 0 },
    ];
  }

  return [];
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
    const metrics = getServiceMetrics(service, reportData);

    doc
      .roundedRect(55, y, 485, 130, 12)
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
      .fontSize(11)
      .fillColor("#6b7280")
      .text(
        `${serviceName} performance data is included with dedicated insights, recommendations, charts, and comparison metrics.`,
        125,
        y + 55,
        {
          width: 360,
          lineGap: 4,
        }
      );

    if (metrics.length) {
      let metricX = 125;

      metrics.forEach((metric) => {
        doc
          .roundedRect(metricX, y + 92, 100, 25, 8)
          .fillAndStroke("#f8fafc", "#e5e7eb");

        doc
          .font("Helvetica-Bold")
          .fontSize(9)
          .fillColor("#2563eb")
          .text(String(metric.value), metricX + 10, y + 99, {
            width: 35,
          });

        doc
          .font("Helvetica")
          .fontSize(8.5)
          .fillColor("#6b7280")
          .text(metric.label, metricX + 45, y + 99, {
            width: 45,
          });

        metricX += 112;
      });
    }

    y += 150;
  });
};

module.exports = drawServiceOverview;