const drawPageHeader = require("../components/pageHeader");

const drawFocusCard = (doc, text, index, y) => {
  doc
    .roundedRect(60, y, 470, 55, 10)
    .fillAndStroke("#ffffff", "#e5e7eb");

  doc
    .circle(90, y + 28, 12)
    .fill("#2563eb");

  doc
    .fontSize(10)
    .fillColor("#ffffff")
    .text(String(index + 1), 86, y + 24);

  doc
    .fontSize(12)
    .fillColor("#374151")
    .text(text, 115, y + 18, {
      width: 380,
      lineGap: 4,
    });
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

  const summaryText = hasInstagram && !hasSEO
    ? `This monthly report summarizes the Instagram performance of ${clientName} for the reporting period. The analysis highlights content performance, audience reach, engagement trends, and opportunities to improve future social media growth.`
    : `This monthly report summarizes the digital marketing performance of ${clientName} for the reporting period. The analysis highlights campaign performance, audience engagement trends, SEO visibility, and strategic growth opportunities identified from the uploaded marketing data.`;

  doc
    .fontSize(13)
    .fillColor("#4b5563")
    .text(summaryText, 55, 205, {
      width: 485,
      align: "justify",
      lineGap: 7,
    });

  doc
    .fontSize(20)
    .fillColor("#111827")
    .text("Recommended Focus Areas", 55, 315);

  const focusAreas = [];

  if (hasInstagram) {
    focusAreas.push(
      "Continue improving high-performing Instagram content formats and audience engagement strategies.",
      "Use monthly content performance data to identify the best-performing post types and posting patterns.",
      "Review lower-performing content and optimize creative direction, captions, timing, and consistency."
    );
  }

  if (hasSEO) {
    focusAreas.push(
      "Strengthen SEO visibility through keyword optimization, content improvements, and technical SEO practices."
    );
  }

  focusAreas.push(
    "Track monthly performance comparisons consistently to identify long-term growth trends and opportunities."
  );

  let y = 365;

  focusAreas.slice(0, 4).forEach((item, index) => {
    drawFocusCard(doc, item, index, y);
    y += 75;
  });

const overallSummaryText = hasInstagram && !hasSEO
  ? "The current month's Instagram performance shows measurable audience visibility and engagement. Continued optimization of high-performing content formats will help improve reach, consistency, and long-term brand presence."
  : "The current month's performance demonstrates measurable audience engagement and visibility growth across the available marketing channels. Continued optimization and consistent reporting will help improve campaign effectiveness and long-term digital presence.";

const summaryTextHeight = doc.heightOfString(overallSummaryText, {
  width: 420,
  lineGap: 5,
});

const summaryCardHeight = summaryTextHeight + 70;

doc
  .roundedRect(55, y + 20, 485, summaryCardHeight, 12)
  .fillAndStroke("#eff6ff", "#bfdbfe");

doc
  .fontSize(15)
  .fillColor("#1d4ed8")
  .text("Overall Report Summary", 75, y + 40);

doc
  .fontSize(11.5)
  .fillColor("#374151")
  .text(overallSummaryText, 75, y + 65, {
    width: 420,
    lineGap: 5,
  });
};

module.exports = drawConclusionSection;