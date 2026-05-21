const drawPageHeader = require("../components/pageHeader");

/**
 * Build structured focus areas with title + supporting text.
 */
const buildFocusAreas = (hasInstagram, hasSEO) => {
  const areas = [];

  if (hasInstagram && hasSEO) {
    areas.push({
      title: "Content Strategy & Analysis",
      text:
        "Continue improving high-performing Instagram content formats and use monthly data to refine creative direction, captions, and posting consistency.",
    });
  } else if (hasInstagram) {
    areas.push(
      {
        title: "Content Format Optimisation",
        text:
          "Continue improving high-performing Instagram content formats and audience engagement strategies, with emphasis on short-form video.",
      },
      {
        title: "Performance Analysis",
        text:
          "Use monthly data to identify best-performing post types and refine creative direction, captions, and posting consistency.",
      }
    );
  }

  if (hasSEO && !hasInstagram) {
    areas.push({
      title: "SEO & Search Visibility",
      text:
        "Strengthen SEO visibility through keyword optimisation, content improvements, and technical best practices.",
    });
  }

  areas.push({
    title: "Consistent Performance Tracking",
    text:
      "Track monthly performance comparisons consistently to identify long-term growth trends and strategic opportunities.",
  });

  return areas.slice(0, 3);
};

/**
 * Build a growth outlook statement based on available services.
 */
const buildGrowthOutlook = (data) => {
  const hasIG = !!data.instagram;
  const hasSEO = !!data.seo;

  const base =
    "The current month establishes a clear content direction, with Reels and consistent performance tracking forming the foundation for continued audience growth.";
  if (hasIG && hasSEO) {
    return base + " Combined with organic search improvements, this positions the brand for sustained digital growth.";
  }
  return base;
};

/**
 * Draw a compact info box with tighter padding than the standard highlightBox.
 * Uses 9pt body font to conserve page space.
 */
const drawCompactBox = (doc, title, text, x, y, width, options = {}) => {
  const {
    bgColor = "#f8fafc",
    borderColor = "#dbeafe",
    titleColor = "#1d4ed8",
    textColor = "#4b5563",
    fontSize = 9,
  } = options;

  const textHeight = doc.heightOfString(text, {
    width: width - 40,
    lineGap: 3,
  });

  const boxHeight = textHeight + 48;

  doc.roundedRect(x, y, width, boxHeight, 10).fillAndStroke(bgColor, borderColor);

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(titleColor)
    .text(title, x + 20, y + 14);

  doc
    .font("Helvetica")
    .fontSize(fontSize)
    .fillColor(textColor)
    .text(text, x + 20, y + 34, { width: width - 40, lineGap: 3 });

  return boxHeight;
};

/**
 * Draw a compact focus action card with number badge, title, and supporting text.
 */
const drawFocusCard = (doc, title, text, index, startY) => {
  const w = 470;
  const tw = w - 70;

  const th = doc.heightOfString(text, { width: tw, lineGap: 3 });
  const cardH = 34 + th + 8;

  // Card body with soft border
  doc.roundedRect(60, startY, w, cardH, 6).fillAndStroke("#ffffff", "#e5e7eb");
  // Top accent bar
  doc.rect(60, startY, w, 2).fill("#2563eb");
  // Left accent bar
  doc.rect(60, startY, 2, cardH).fill("#2563eb");

  // Number badge
  doc.circle(82, startY + 15, 7).fill("#2563eb");
  doc
    .font("Helvetica-Bold")
    .fontSize(7)
    .fillColor("#ffffff")
    .text(String(index + 1), 79, startY + 12);

  // Focus title
  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor("#111827")
    .text(title, 103, startY + 9, { width: w - 120 });

  // Supporting text
  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor("#4b5563")
    .text(text, 80, startY + 34, { width: tw, lineGap: 3 });

  return startY + cardH;
};

const drawConclusionSection = (doc, reportData = {}) => {
  doc.addPage();

  drawPageHeader(
    doc,
    "Conclusion & Next Steps",
    "Final monthly performance summary",
    reportData
  );

  const clientName = reportData.clientName || "the client";
  const hasInstagram = !!reportData.instagram;
  const hasSEO = !!reportData.seo;

  const summaryText =
    hasInstagram && !hasSEO
      ? `This monthly report summarizes the Instagram performance of ${clientName} for the reporting period. The analysis highlights content performance, audience reach, engagement trends, and opportunities to improve future social media growth.`
      : `This monthly report summarizes the digital marketing performance of ${clientName} for the reporting period. The analysis highlights campaign performance, audience engagement trends, SEO visibility, and strategic growth opportunities identified from the uploaded marketing data.`;

  const focusAreas = buildFocusAreas(hasInstagram, hasSEO);
  const outlookText = buildGrowthOutlook(reportData);

  // ── LAYOUT ──
  let y = 205;

  // 1. MONTHLY SUMMARY CARD
  const summaryHeight = drawCompactBox(doc, "Monthly Summary", summaryText, 55, y, 485, {
    bgColor: "#f8fafc",
    borderColor: "#dbeafe",
    titleColor: "#1d4ed8",
    textColor: "#4b5563",
  });
  y += summaryHeight + 12;

  // 2. RECOMMENDED FOCUS AREAS SECTION
  doc.roundedRect(55, y, 485, 34, 8).fillAndStroke("#f8fafc", "#dbeafe");
  doc.rect(55, y, 3, 34).fill("#2563eb");
  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor("#1d4ed8")
    .text("RECOMMENDED FOCUS AREAS", 75, y + 10);
  y += 42;

  // Focus action cards (gap between cards only, none after last)
  focusAreas.forEach((area, index) => {
    y = drawFocusCard(doc, area.title, area.text, index, y);
    if (index < focusAreas.length - 1) {
      y += 10;
    }
  });

  // 3. GROWTH OUTLOOK
  y += 4;
  drawCompactBox(doc, "Growth Outlook", outlookText, 55, y, 485, {
    bgColor: "#f8fafc",
    borderColor: "#dbeafe",
    titleColor: "#1d4ed8",
    textColor: "#374151",
  });
};

module.exports = drawConclusionSection;