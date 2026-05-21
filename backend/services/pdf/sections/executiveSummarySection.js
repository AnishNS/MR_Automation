const drawPageHeader = require("../components/pageHeader");
const drawHighlightBox = require("../components/highlightBox");

const formatServiceName = (service) => {
  return String(service)
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
};

const drawExecutiveSummary = (doc, reportData = {}) => {
  doc.addPage();

  const clientName = reportData.clientName || "Client";
  const reportMonth = reportData.month || "";
  const reportYear = reportData.year || "";

  const services = Array.isArray(reportData.services)
    ? reportData.services
    : [];

  drawPageHeader(
    doc,
    "Executive Summary",
    "Monthly digital marketing performance overview",
    reportData
  );

  let y = 205;

  const summaryText = `This report provides a concise overview of ${clientName}'s digital marketing performance for ${reportMonth} ${reportYear}. It summarizes active services, key performance indicators, performance insights, recommendations, and month-to-month growth observations based on the uploaded marketing data.`;

  doc
    .font("Helvetica")
    .fontSize(13)
    .fillColor("#374151")
    .text(summaryText, 55, y, {
      width: 485,
      lineGap: 7,
      align: "justify",
    });

  y += doc.heightOfString(summaryText, {
    width: 485,
    lineGap: 7,
  }) + 45;

  const snapshotLines = [
    `Client: ${clientName}`,
    `Reporting Period: ${reportMonth} ${reportYear}`,
    `Active Services: ${services.length}`,
  ];

  const snapshotTextHeight = snapshotLines.length * 22;
  const snapshotBoxHeight = snapshotTextHeight + 65;

  doc
    .roundedRect(55, y, 485, snapshotBoxHeight, 12)
    .fillAndStroke("#eff6ff", "#bfdbfe");

  doc
    .font("Helvetica-Bold")
    .fontSize(15)
    .fillColor("#1d4ed8")
    .text("Report Snapshot", 75, y + 22);

  let snapshotY = y + 52;

  snapshotLines.forEach((line) => {
    doc
      .font("Helvetica")
      .fontSize(11.5)
      .fillColor("#374151")
      .text(line, 75, snapshotY, {
        width: 430,
      });

    snapshotY += 22;
  });

  y += snapshotBoxHeight + 55;

  doc
    .font("Helvetica-Bold")
    .fontSize(20)
    .fillColor("#111827")
    .text("Services Included", 55, y);

  y += 45;

  services.forEach((service, index) => {
    const serviceName = formatServiceName(service);

    doc
      .roundedRect(60, y, 470, 48, 10)
      .fillAndStroke("#ffffff", "#e5e7eb");

    doc
      .circle(88, y + 24, 11)
      .fill("#2563eb");

    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor("#ffffff")
      .text(String(index + 1), 85, y + 20);

    doc
      .font("Helvetica-Bold")
      .fontSize(13)
      .fillColor("#111827")
      .text(serviceName, 120, y + 17);

    y += 62;
  });

  const scopeText =
    "The following sections provide detailed performance breakdowns, KPI summaries, charts, comparisons, strategic insights, and recommendations for all active marketing services included in this monthly report.";

  drawHighlightBox(
    doc,
    "Report Scope",
    scopeText,
    55,
    y + 20
  );
};

module.exports = drawExecutiveSummary;