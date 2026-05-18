const path = require("path");

const drawCoverPage = (doc, reportData) => {

  const logoPath = path.join(
    __dirname,
    "../../../assets/logo.png"
  );

  // PAGE BACKGROUND
  doc.rect(0, 0, doc.page.width, doc.page.height)
     .fill("#ffffff");

  // LOGO
  doc.image(logoPath, 55, 55, {
    fit: [90, 90],
  });

  // COMPANY NAME TOP RIGHT
  doc
    .fontSize(16)
    .fillColor("#666666")
    .text(
      "Usher Media",
      380,
      70,
      {
        align: "right",
      }
    );

  // BLUE LINE
  doc
    .moveTo(55, 140)
    .lineTo(540, 140)
    .lineWidth(2)
    .strokeColor("#2563eb")
    .stroke();

  // REPORT TITLE
  doc
    .fontSize(34)
    .fillColor("#111111")
    .font("Helvetica-Bold")
    .text(
      "MONTHLY",
      55,
      190
    );

  doc
    .fontSize(34)
    .fillColor("#111111")
    .text(
      "MARKETING REPORT",
      55,
      235
    );

  // CLIENT NAME
  doc
    .fontSize(24)
    .fillColor("#2563eb")
    .text(
      reportData.clientName || "Client Report",
      55,
      330
    );

  // MONTH + YEAR
  doc
    .fontSize(20)
    .fillColor("#444444")
    .font("Helvetica")
    .text(
      `${reportData.month || ""} ${reportData.year || ""}`,
      55,
      370
    );

  // DESCRIPTION
  doc
    .fontSize(13)
    .fillColor("#666666")
    .text(
      "Comprehensive digital marketing performance analysis, KPI tracking, strategic insights and growth recommendations.",
      55,
      430,
      {
        width: 360,
        lineGap: 5,
      }
    );

  // PREPARED FOR BOX
  doc
    .roundedRect(55, 560, 220, 80, 10)
    .fillAndStroke("#f8fafc", "#dbeafe");

  doc
    .fontSize(12)
    .fillColor("#777777")
    .text(
      "PREPARED FOR",
      75,
      580
    );

  doc
    .fontSize(20)
    .fillColor("#111111")
    .font("Helvetica-Bold")
    .text(
      reportData.clientName || "Client",
      75,
      605
    );

  // PREPARED BY BOX
  doc
    .roundedRect(320, 560, 220, 80, 10)
    .fillAndStroke("#f8fafc", "#dbeafe");

  doc
    .fontSize(12)
    .fillColor("#777777")
    .font("Helvetica")
    .text(
      "PREPARED BY",
      340,
      580
    );

  doc
    .fontSize(20)
    .fillColor("#111111")
    .font("Helvetica-Bold")
    .text(
      "Usher Media",
      340,
      605
    );

  // FOOTER
  doc
    .fontSize(10)
    .fillColor("#999999")
    .font("Helvetica")
    .text(
      `Generated on ${new Date().toDateString()}`,
      55,
      760
    );
};

module.exports = drawCoverPage;