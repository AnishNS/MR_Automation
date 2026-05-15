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
    "Final monthly performance summary"
  );

  const clientName = reportData.clientName || "the client";

  doc
    .fontSize(13)
    .fillColor("#4b5563")
    .text(
      `This monthly report summarizes the digital marketing performance of ${clientName} for the reporting period. The analysis highlights campaign performance, audience engagement trends, SEO visibility, and strategic growth opportunities identified from the uploaded marketing data.`,
      55,
      150,
      {
        width: 485,
        align: "justify",
        lineGap: 7,
      }
    );

  doc
    .fontSize(20)
    .fillColor("#111827")
    .text("Recommended Focus Areas", 55, 250);

  const focusAreas = [
    "Continue improving high-performing content formats and audience engagement strategies.",
    "Review lower-performing campaigns and optimize targeting, creatives, and publishing consistency.",
    "Strengthen SEO visibility through keyword optimization, content improvements, and technical SEO practices.",
    "Track monthly performance comparisons consistently to identify long-term growth trends and opportunities.",
  ];

  let y = 300;

  focusAreas.forEach((item, index) => {
    drawFocusCard(doc, item, index, y);
    y += 75;
  });

  doc
    .roundedRect(55, y + 20, 485, 85, 12)
    .fillAndStroke("#eff6ff", "#bfdbfe");

  doc
    .fontSize(15)
    .fillColor("#1d4ed8")
    .text("Overall Report Summary", 75, y + 40);

  doc
    .fontSize(11.5)
    .fillColor("#374151")
    .text(
      "The current month's performance demonstrates measurable audience engagement and visibility growth across the available marketing channels. Continued optimization and consistent reporting will help improve campaign effectiveness and long-term digital presence.",
      75,
      y + 65,
      {
        width: 420,
        lineGap: 5,
      }
    );
};

module.exports = drawConclusionSection;