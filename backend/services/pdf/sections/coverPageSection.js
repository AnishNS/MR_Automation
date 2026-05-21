const path = require("path");

const formatDate = (dateString) => {
  if (!dateString) return new Date().toDateString();
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const drawCoverPage = (doc, reportData) => {
  const logoPath = path.join(__dirname, "../../../assets/logo.png");
  const clientName = reportData.clientName || "Client Report";
  const month = reportData.month || "";
  const year = reportData.year || "";
  const generatedAt = formatDate(reportData.generatedAt);

  // PAGE BACKGROUND
  doc.rect(0, 0, doc.page.width, doc.page.height).fill("#ffffff");

  // ── TOP LEFT: LOGO + BRANDING ──
  try {
    doc.image(logoPath, 55, 42, { fit: [55, 55] });
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .fillColor("#111827")
      .text("USHER MEDIA", 125, 58);
  } catch (e) {
    // Fallback if logo image is missing
    doc
      .font("Helvetica-Bold")
      .fontSize(16)
      .fillColor("#111827")
      .text("USHER MEDIA", 55, 58);
  }

  // ── TOP RIGHT: CLIENT NAME + PERIOD ──
  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor("#9f1239")
    .text(clientName.toUpperCase(), 320, 55, {
      width: 220,
      align: "right",
    });

  doc
    .font("Helvetica")
    .fontSize(8.5)
    .fillColor("#6b7280")
    .text(`${month} ${year}`, 320, 72, {
      width: 220,
      align: "right",
    });

  // ── BLUE DIVIDER LINE ──
  doc
    .moveTo(55, 100)
    .lineTo(545, 100)
    .lineWidth(1.5)
    .strokeColor("#2563eb")
    .stroke();

  // ── MAIN TITLE: "MONTHLY" ──
  doc
    .font("Helvetica-Bold")
    .fontSize(40)
    .fillColor("#111827")
    .text("MONTHLY", 55, 180);

  // ── MAIN TITLE: "PERFORMANCE" ──
  doc
    .font("Helvetica-Bold")
    .fontSize(40)
    .fillColor("#111827")
    .text("PERFORMANCE", 55, 230);

  // ── MAIN TITLE: "REPORT" (accent coloured) ──
  doc
    .font("Helvetica-Bold")
    .fontSize(40)
    .fillColor("#2563eb")
    .text("REPORT", 55, 280);

  // ── CLIENT NAME ──
  doc
    .font("Helvetica-Bold")
    .fontSize(28)
    .fillColor("#111827")
    .text(clientName, 55, 370);

  // ── MONTH + YEAR ──
  doc
    .font("Helvetica")
    .fontSize(20)
    .fillColor("#555555")
    .text(`${month.toUpperCase()} ${year}`, 55, 425);

  // ── DESCRIPTION ──
  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor("#777777")
    .text(
      "Comprehensive digital marketing performance analysis, KPI tracking, strategic insights and growth recommendations.",
      55,
      485,
      { width: 400, lineGap: 5 }
    );

  // ── SHORT ACCENT LINE BEFORE METADATA ──
  doc
    .moveTo(55, 555)
    .lineTo(200, 555)
    .lineWidth(2)
    .strokeColor("#2563eb")
    .stroke();

  // ── BOTTOM METADATA (two-column layout) ──

  // Left column
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor("#2563eb")
    .text("REPORTING PERIOD", 55, 580);

  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor("#374151")
    .text(`${month} ${year}`, 55, 598);

  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor("#2563eb")
    .text("PREPARED BY", 55, 640);

  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor("#374151")
    .text("Usher Media", 55, 658);

  // Right column
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor("#2563eb")
    .text("PREPARED FOR", 320, 580);

  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor("#374151")
    .text(clientName, 320, 598);

  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor("#2563eb")
    .text("DATE GENERATED", 320, 640);

  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor("#374151")
    .text(generatedAt, 320, 658);

};

// No footer or confidential notice — cover page has its own metadata section above.
// Footer is handled by pageFooter.js in clientPdfGenerator.js, which skips page 1.

module.exports = drawCoverPage;