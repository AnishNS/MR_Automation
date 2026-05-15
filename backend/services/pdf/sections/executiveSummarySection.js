const drawExecutiveSummary = (doc, reportData = {}) => {
  doc.addPage();

  const pageWidth = doc.page.width;
  const clientName = reportData.clientName || "Client";
  const reportMonth = reportData.month || "";
  const reportYear = reportData.year || "";
  const services = Array.isArray(reportData.services)
    ? reportData.services
    : [];

  doc.rect(0, 0, pageWidth, 110).fill("#0f172a");

  doc
    .fillColor("#ffffff")
    .fontSize(28)
    .text("Executive Summary", 50, 45);

  doc
    .fillColor("#374151")
    .fontSize(13)
    .text(
      `This report provides a comprehensive overview of ${clientName}'s monthly digital marketing performance for ${reportMonth} ${reportYear}. The report includes platform-wise analytics, performance insights, strategic recommendations, and month-to-month growth analysis across all active marketing services.`,
      50,
      150,
      {
        width: 500,
        lineGap: 8,
        align: "justify",
      }
    );

  doc
    .fontSize(20)
    .fillColor("#111827")
    .text("Services Included", 50, 300);

  let startY = 350;

  services.forEach((service, index) => {
    doc
      .roundedRect(60, startY, 470, 45, 10)
      .fillAndStroke("#f3f4f6", "#e5e7eb");

    doc
      .fillColor("#2563eb")
      .fontSize(14)
      .text(String(index + 1), 80, startY + 14);

    doc
      .fillColor("#111827")
      .fontSize(14)
      .text(String(service), 120, startY + 14);

    startY += 65;
  });

  doc
    .fontSize(12)
    .fillColor("#6b7280")
    .text(
      "The following sections provide detailed breakdowns of each marketing service along with key performance indicators, charts, comparisons, and actionable recommendations.",
      50,
      startY + 20,
      {
        width: 500,
        lineGap: 6,
        align: "justify",
      }
    );
};

module.exports = drawExecutiveSummary;