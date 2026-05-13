const drawSEOSection = (doc, seoData) => {
  if (!seoData) return;

  doc.addPage();

  doc
    .fontSize(24)
    .fillColor("#111111")
    .text("SEO Performance");

  doc.moveDown(1);

  const summaries = seoData.analytics?.clientSummaries || [];

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
};

module.exports = drawSEOSection;