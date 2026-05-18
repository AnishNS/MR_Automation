const drawPageHeader = (doc, title, subtitle = "", reportData = {}) => {
  const clientName = reportData.clientName || "";
  const month = reportData.month || "";
  const year = reportData.year || "";

  doc.rect(0, 0, doc.page.width, 125).fill("#ffffff");

  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .fillColor("#111827")
    .text("USHER MEDIA", 50, 35);

  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor("#9f1239")
    .text(clientName ? clientName.toUpperCase() : "", 320, 34, {
      width: 220,
      align: "right",
    });

  doc
    .font("Helvetica")
    .fontSize(8.5)
    .fillColor("#6b7280")
    .text(
      clientName ? `${month} ${year} Report` : "",
      320,
      52,
      {
        width: 220,
        align: "right",
      }
    );

  doc
    .moveTo(50, 78)
    .lineTo(545, 78)
    .lineWidth(1.4)
    .strokeColor("#2563eb")
    .stroke();

  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .fillColor("#2563eb")
    .text("SECTION", 50, 98);

  doc
    .font("Helvetica-Bold")
    .fontSize(20)
    .fillColor("#111827")
    .text(title, 50, 115);

  doc
    .moveTo(50, 145)
    .lineTo(545, 145)
    .lineWidth(1.4)
    .strokeColor("#2563eb")
    .stroke();

  if (subtitle) {
    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor("#6b7280")
      .text(subtitle, 50, 153, {
        width: 470,
      });
  }

  doc.y = subtitle ? 175 : 165;
};

module.exports = drawPageHeader;