const drawPageHeader = require("../components/pageHeader");

const trendColor = (trend) => {
  if (trend === "increase") return "#16a34a";
  if (trend === "decrease") return "#dc2626";
  return "#6b7280";
};

const drawComparisonCard = (doc, item, x, y) => {
  const color = trendColor(item.trend);

  doc
    .roundedRect(x, y, 225, 96, 12)
    .fillAndStroke("#ffffff", "#e5e7eb");

  doc
    .font("Helvetica-Bold")
    .fontSize(12.5)
    .fillColor("#111827")
    .text(item.label || "Metric", x + 16, y + 14, {
      width: 190,
    });

  doc
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor("#6b7280")
    .text("Previous", x + 16, y + 40);

  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor("#374151")
    .text(String(item.previous ?? "N/A"), x + 16, y + 54);

  doc
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor("#6b7280")
    .text("Current", x + 105, y + 40);

  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor("#374151")
    .text(String(item.current ?? "N/A"), x + 105, y + 54);

  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor(color)
    .text(`Difference: ${item.difference ?? "N/A"}`, x + 16, y + 76);
};

const drawComparisonGroup = (doc, title, comparisons, startY) => {
  let y = startY;

  doc
    .roundedRect(55, y, 485, 44, 12)
    .fillAndStroke("#eff6ff", "#bfdbfe");

  doc
    .font("Helvetica-Bold")
    .fontSize(15)
    .fillColor("#1d4ed8")
    .text(title, 75, y + 14);

  y += 62;

  const items = Object.values(comparisons || {});

  items.forEach((item, index) => {
    const x = index % 2 === 0 ? 60 : 315;

    drawComparisonCard(doc, item, x, y);

    if (index % 2 === 1) {
      y += 116;
    }
  });

  if (items.length % 2 === 1) {
    y += 116;
  }

  return y + 10;
};

const drawComparisonSection = (doc, reportData) => {
  doc.addPage();

  drawPageHeader(
    doc,
    "Month-to-Month Comparison",
    "Performance growth tracking overview",
    reportData
  );

  const instagramComparisons =
    reportData.instagram?.analytics?.comparisons || {};

  const seoSummaries =
    reportData.seo?.analytics?.clientSummaries || [];

  if (
    !Object.keys(instagramComparisons).length &&
    !seoSummaries.length
  ) {
    doc
      .font("Helvetica")
      .fontSize(12)
      .fillColor("#555555")
      .text("No comparison data available for this report.", 55, 205);
    return;
  }

  let y = 205;

  if (Object.keys(instagramComparisons).length) {
    y = drawComparisonGroup(
      doc,
      "Instagram Comparison",
      instagramComparisons,
      y
    );
  }

  if (seoSummaries.length) {
    seoSummaries.forEach((client) => {
      y = drawComparisonGroup(
        doc,
        `SEO Comparison - ${client.clientName}`,
        client.comparisons || {},
        y
      );
    });
  }
};

module.exports = drawComparisonSection;