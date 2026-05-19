const drawChartBlock = require("../components/chartBlock");
const drawPageHeader = require("../components/pageHeader");

const {
  generateSEOBarChartImage,
} = require("../charts/seoChartGenerator");

const hasValue = (value) => {
  return value !== undefined && value !== null && value !== "" && value !== "-";
};

const formatValue = (value) => {
  if (!hasValue(value)) return "-";
  return String(value);
};

const drawMetricCard = (doc, label, value, x, y) => {
  doc
    .roundedRect(x, y, 145, 60, 10)
    .fillAndStroke("#f8fafc", "#e5e7eb");

  doc
    .fontSize(9.5)
    .fillColor("#64748b")
    .text(label, x + 12, y + 12, {
      width: 120,
    });

  doc
    .fontSize(14)
    .fillColor("#2563eb")
    .text(formatValue(value), x + 12, y + 34, {
      width: 120,
    });
};

const drawSEOSection = async (doc, seoData) => {
  if (!seoData) return;

  const summaries = seoData.analytics?.clientSummaries || [];

  const validSummaries = summaries
    .map((client) => {
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
      ].filter(([, value]) => hasValue(value));

      return {
        ...client,
        metrics,
      };
    })
    .filter((client) => client.metrics.length > 0);

  if (!validSummaries.length) {
    return;
  }

  doc.addPage();

  drawPageHeader(
    doc,
    "SEO Performance",
    "Monthly SEO analytics overview",
    {
      clientName: seoData.clientName,
      month: seoData.month,
      year: seoData.year,
    }
  );

  let y = 185;

  validSummaries.forEach((client) => {
    doc
      .roundedRect(55, y, 485, 38, 10)
      .fillAndStroke("#f3f4f6", "#e5e7eb");

    doc
      .fontSize(15)
      .fillColor("#2563eb")
      .text(client.clientName || "SEO Client", 75, y + 12);

    y += 58;

    client.metrics.forEach(([label, value], index) => {
      const col = index % 3;
      const row = Math.floor(index / 3);

      drawMetricCard(
        doc,
        label,
        value,
        55 + col * 165,
        y + row * 78
      );
    });

    const rowsUsed = Math.ceil(client.metrics.length / 3);
    y += rowsUsed * 78 + 30;
  });

  const chartEligibleSummaries = validSummaries.filter((client) =>
    hasValue(client.organicTraffic) && Number(client.organicTraffic) > 0
  );

  if (!chartEligibleSummaries.length) {
    return;
  }

  const chartLabels = chartEligibleSummaries.map(
    (client) => client.clientName
  );

  const chartValues = chartEligibleSummaries.map(
    (client) => Number(client.organicTraffic) || 0
  );

  const chartBuffer = await generateSEOBarChartImage(
    chartLabels,
    chartValues,
    "SEO Organic Traffic Overview"
  );

  doc.addPage();

  drawPageHeader(
    doc,
    "SEO Traffic Chart",
    "Organic traffic comparison overview",
    {
      clientName: seoData.clientName,
      month: seoData.month,
      year: seoData.year,
    }
  );

  drawChartBlock(doc, chartBuffer, 50, 190, 500);
};

module.exports = drawSEOSection;