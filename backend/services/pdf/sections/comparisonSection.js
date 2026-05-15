const drawPageHeader = require("../components/pageHeader");

const trendColor = (trend) => {
  if (trend === "increase") return "#16a34a";
  if (trend === "decrease") return "#dc2626";
  return "#6b7280";
};

const drawComparisonCard = (doc, item, x, y) => {
  const color = trendColor(item.trend);

  doc
    .roundedRect(x, y, 225, 90, 10)
    .fillAndStroke("#ffffff", "#e5e7eb");

  doc
    .fontSize(12)
    .fillColor("#111827")
    .text(item.label || "Metric", x + 15, y + 14);

  doc
    .fontSize(10)
    .fillColor("#6b7280")
    .text(`Previous: ${item.previous ?? "N/A"}`, x + 15, y + 38);

  doc
    .fontSize(10)
    .fillColor("#6b7280")
    .text(`Current: ${item.current ?? "N/A"}`, x + 15, y + 54);

  doc
    .fontSize(11)
    .fillColor(color)
    .text(`Difference: ${item.difference ?? "N/A"}`, x + 15, y + 70);
};

const drawComparisonGroup = (doc, title, comparisons, startY) => {
  let y = startY;

  doc
    .roundedRect(55, y, 485, 40, 10)
    .fillAndStroke("#f3f4f6", "#e5e7eb");

  doc
    .fontSize(15)
    .fillColor("#2563eb")
    .text(title, 75, y + 13);

  y += 60;

  const items = Object.values(comparisons || {});

  items.forEach((item, index) => {
    const x = index % 2 === 0 ? 60 : 315;

    drawComparisonCard(doc, item, x, y);

    if (index % 2 === 1) {
      y += 110;
    }
  });

  if (items.length % 2 === 1) {
    y += 110;
  }

  return y + 15;
};

const drawComparisonSection = (doc, reportData) => {
  doc.addPage();

  drawPageHeader(
    doc,
    "Month-to-Month Comparison",
    "Performance growth tracking overview"
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
      .fontSize(12)
      .fillColor("#555555")
      .text("No comparison data available for this report.", 50, 150);
    return;
  }

  let y = 150;

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