const drawPageHeader = (doc, title, subtitle = "") => {
  doc
    .rect(0, 0, doc.page.width, 90)
    .fill("#111827");

  doc
    .fillColor("#ffffff")
    .fontSize(24)
    .text(title, 50, 30);

  if (subtitle) {
    doc
      .fontSize(11)
      .fillColor("#d1d5db")
      .text(subtitle, 50, 60);
  }

  doc.moveDown(2);
};

module.exports = drawPageHeader;