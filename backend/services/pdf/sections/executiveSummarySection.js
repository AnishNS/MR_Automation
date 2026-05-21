const drawPageHeader = require("../components/pageHeader");
const drawHighlightBox = require("../components/highlightBox");

const formatServiceName = (service) => {
  return String(service)
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
};

const generatePerformanceHighlight = (reportData) => {
  const services = Array.isArray(reportData.services) ? reportData.services : [];
  const highlights = [];

  services.forEach((service) => {
    const s = service.toLowerCase().replace(/\s+/g, "");

    if (s.includes("instagram")) {
      const ig = reportData.instagram?.analytics?.summary;
      if (ig && (ig.totalViews || ig.totalReach)) {
        const views = ig.totalViews?.toLocaleString() || "-";
        const reach = ig.totalReach?.toLocaleString() || "-";
        const rate = ig.engagementRate != null ? `${ig.engagementRate}%` : "strong";
        highlights.push(`Instagram achieved ${views} views and ${reach} reach at ${rate} engagement, with short-form content driving the highest performance.`);
      } else {
        highlights.push("Instagram showed strong audience visibility this period, with content engagement and reach demonstrating effective audience connection and brand resonance.");
      }
    }

    if (s.includes("seo")) {
      const seoSummaries = reportData.seo?.analytics?.clientSummaries;
      if (seoSummaries?.length) {
        const totalTraffic = seoSummaries.reduce((sum, c) => sum + (Number(c.organicTraffic) || 0), 0);
        const totalImpressions = seoSummaries.reduce((sum, c) => sum + (Number(c.impressions) || 0), 0);
        const trafficStr = totalTraffic ? totalTraffic.toLocaleString() : "-";
        const impressionStr = totalImpressions ? totalImpressions.toLocaleString() : "-";
        highlights.push(`SEO drove ${trafficStr} organic visits and ${impressionStr} impressions, reflecting sustained search visibility and content ranking improvements.`);
      } else {
        highlights.push("SEO performance continued to strengthen with growth in organic traffic and search visibility across key terms and content categories.");
      }
    }

    if (s.includes("meta") || s.includes("facebook")) {
      highlights.push("Paid social campaigns delivered strong returns this period, with optimised audience targeting and ad creative driving meaningful engagement and conversions.");
    }
  });

  if (highlights.length > 0) {
    return highlights.join(" ");
  }
  return "All active services demonstrated measurable performance this period, contributing to the client's overall digital marketing growth and strategic objectives.";
};

const getServiceLabels = (service) => {
  const s = service.toLowerCase().replace(/\s+/g, "");
  if (s.includes("instagram")) return ["Content Performance", "Audience Engagement"];
  if (s.includes("seo")) return ["Search Visibility", "Traffic Growth"];
  if (s.includes("meta") || s.includes("facebook")) return ["Ad Performance", "Audience Targeting"];
  if (s.includes("youtube")) return ["Video Reach", "Channel Growth"];
  if (s.includes("linkedin")) return ["B2B Reach", "Professional Engagement"];
  if (s.includes("website")) return ["Site Performance", "User Experience"];
  return ["Key Metrics", "Growth Indicators"];
};

const drawExecutiveSummary = (doc, reportData = {}) => {
  doc.addPage();

  const clientName = reportData.clientName || "Client";
  const reportMonth = reportData.month || "";
  const reportYear = reportData.year || "";
  const services = Array.isArray(reportData.services) ? reportData.services : [];

  drawPageHeader(doc, "Executive Summary", "Monthly digital marketing performance overview", reportData);

  let y = 205;

  // 1. INTRODUCTORY PARAGRAPH
  const summaryText = `This report provides a concise overview of ${clientName}'s digital marketing performance for ${reportMonth} ${reportYear}. It summarizes active services, key performance indicators, performance insights, recommendations, and month-to-month growth observations based on the uploaded marketing data.`;

  doc.font("Helvetica").fontSize(11).fillColor("#4b5563").text(summaryText, 55, y, {
    width: 485,
    lineGap: 6,
    align: "justify",
  });

  y += doc.heightOfString(summaryText, { width: 485, lineGap: 6 }) + 22;

  // 2. PERFORMANCE HIGHLIGHTS
  const highlightText = generatePerformanceHighlight(reportData);

  const highlightHeight = drawHighlightBox(doc, "Performance Highlights", highlightText, 55, y, 485, {
    bgColor: "#f8fafc",
    borderColor: "#dbeafe",
    titleColor: "#1d4ed8",
    textColor: "#374151",
  });

  y += highlightHeight + 28;

  // 3. REPORT SNAPSHOT
  const snapshotHeight = 95;

  doc.roundedRect(55, y, 485, snapshotHeight, 10).fillAndStroke("#fafafa", "#e5e7eb");

  doc.font("Helvetica-Bold").fontSize(10).fillColor("#6b7280").text("REPORT SNAPSHOT", 75, y + 16);

  doc.moveTo(75, y + 36).lineTo(520, y + 36).lineWidth(0.5).strokeColor("#e5e7eb").stroke();

  const colX = [75, 220, 370];
  const colLabels = ["Client", "Reporting Period", "Active Services"];
  const colValues = [
    clientName,
    `${reportMonth} ${reportYear}`.trim(),
    `${services.length} Service${services.length !== 1 ? "s" : ""}`,
  ];

  colLabels.forEach((label, i) => {
    doc.font("Helvetica").fontSize(8).fillColor("#9ca3af").text(label.toUpperCase(), colX[i], y + 48);
    doc.font("Helvetica-Bold").fontSize(12).fillColor("#111827").text(colValues[i], colX[i], y + 64);
  });

  y += snapshotHeight + 30;

  // 4. SERVICES INCLUDED
  doc.font("Helvetica-Bold").fontSize(12).fillColor("#6b7280").text("SERVICES INCLUDED", 55, y);

  y += 20;

  doc.moveTo(55, y).lineTo(170, y).lineWidth(1.5).strokeColor("#2563eb").stroke();

  y += 18;

  services.forEach((service, index) => {
    const serviceName = formatServiceName(service);
    const labels = getServiceLabels(service);

    doc.roundedRect(60, y, 470, 42, 8).fillAndStroke("#ffffff", "#e5e7eb");

    doc.rect(60, y, 3, 42).fill("#2563eb");

    doc.circle(85, y + 21, 9).fill("#2563eb");

    doc.font("Helvetica-Bold").fontSize(8).fillColor("#ffffff").text(String(index + 1), 82, y + 17);

    doc.font("Helvetica-Bold").fontSize(11).fillColor("#111827").text(serviceName, 110, y + 14);

    const labelPositions = [265, 375];

    labels.forEach((label, i) => {
      const lx = labelPositions[i];
      doc.circle(lx, y + 21, 2.5).fill("#9ca3af");
      doc.font("Helvetica").fontSize(7.5).fillColor("#6b7280").text(label, lx + 8, y + 17);
    });

    y += 54;
  });
};

module.exports = drawExecutiveSummary;