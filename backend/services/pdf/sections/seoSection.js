const drawChartBlock = require("../components/chartBlock");
const drawPageHeader = require("../components/pageHeader");

const {
  generateSEOBarChartImage,
} = require("../charts/seoChartGenerator");

const formatValue = (value) => {
  if (value === undefined || value === null || value === "") return "-";
  return String(value);
};

const drawMetricCard = (doc, label, value, x, y) => {
  doc
    .roundedRect(x, y, 145, 60, 10)
    .fillAndStroke("#f8fafc", "#e5e7eb");

  doc.fontSize(9.5).fillColor("#64748b").text(label, x + 12, y + 12, {
    width: 120,
  });

  doc.fontSize(14).fillColor("#2563eb").text(formatValue(value), x + 12, y + 34, {
    width: 120,
  });
};

const drawSEOSection = async (doc, seoData) => {
  if (!seoData) return;

  const summaries = seoData.analytics?.clientSummaries || [];

  doc.addPage();

  drawPageHeader(doc, "SEO Performance", "Monthly SEO analytics overview");

  if (!summaries.length) {
    doc
      .fontSize(12)
      .fillColor("#555555")
      .text("No SEO analytics data available.", 50, 150);
    return;
  }

  let y = 150;

  summaries.forEach((client) => {
    doc
      .roundedRect(55, y, 485, 38, 10)
      .fillAndStroke("#f3f4f6", "#e5e7eb");

    doc
      .fontSize(15)
      .fillColor("#2563eb")
      .text(client.clientName || "SEO Client", 75, y + 12);

    y += 58;

    const metrics = [
      ["Organic Traffic", client.organicTraffic],
      ["Impressions", client.impressions],
      ["Organic Clicks", client.clicks],
      ["CTR", client.ctr],
      ["Avg. Position", client.avgPosition],
      ["GBP Views", client.profileViews],
      ["Calls", client.calls],
      ["Directions", client.directionRequests],
      ["Reviews", client.reviews],
    ];

    metrics.forEach(([label, value], index) => {
      const col = index % 3;
      const row = Math.floor(index / 3);

      drawMetricCard(doc, label, value, 55 + col * 165, y + row * 78);
    });

    y += 260;
  });

  const chartLabels = summaries.map((client) => client.clientName);
  const chartValues = summaries.map((client) => Number(client.organicTraffic) || 0);

  const chartBuffer = await generateSEOBarChartImage(
    chartLabels,
    chartValues,
    "SEO Organic Traffic Overview"
  );

  doc.addPage();

  drawPageHeader(doc, "SEO Traffic Chart", "Organic traffic comparison overview");

  drawChartBlock(doc, chartBuffer, 50, 160, 500);
};

module.exports = drawSEOSection;