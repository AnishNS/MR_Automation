const drawChartBlock = require("../components/chartBlock");
const drawPageHeader = require("../components/pageHeader");

const {
  generateSEOBarChartImage,
} = require("../charts/seoChartGenerator");
const drawSEOSection = async(doc, seoData) => {
  if (!seoData) return;

  doc.addPage();

  drawPageHeader(
    doc,
    "SEO Performance",
    " Monthly SEO analytics overview"
  );
  doc.moveDown(1);

  const summaries = seoData.analytics?.clientSummaries || [];
  const chartLabels = summaries.map((client) => client.clientName);
  const chartValues = summaries.map((client) =>
    Number(client.organicTraffic) || 0
  );

  const chartBuffer = await generateSEOBarChartImage(
    chartLabels,
    chartValues,
    "SEO Organic Traffic Overview"
  );

  if (!summaries.length) {
    doc
      .fontSize(12)
      .fillColor("#555555")
      .text("No SEO analytics data available.");
    return;
  }

  summaries.forEach((client, index) => {
    doc
      .fontSize(15)
      .fillColor("#2563eb")
      .text(`${index + 1}. ${client.clientName}`);

    doc.moveDown(0.5);

    const rows = [
      ["Organic Traffic", client.organicTraffic],
      ["Impressions", client.impressions],
      ["Organic Clicks", client.clicks],
      ["CTR", client.ctr],
      ["Average Position", client.avgPosition],
      ["GBP Profile Views", client.profileViews],
      ["Calls from GBP", client.calls],
      ["Direction Requests", client.directionRequests],
      ["New Reviews", client.reviews],
    ];

    rows.forEach(([label, value]) => {
      doc
        .fontSize(12)
        .fillColor("#333333")
        .text(`${label}: ${value ?? "-"}`);
    });

    doc.moveDown(1.5);
  });
  doc.addPage();

doc
  .fontSize(22)
  .fillColor("#111111")
  .text("SEO Traffic Chart");

doc.moveDown(1);

drawChartBlock(doc, chartBuffer, 50, 140, 500);
};

module.exports = drawSEOSection;