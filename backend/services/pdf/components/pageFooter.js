const drawPageFooter = (doc, clientName = "", pageNumber = 1, totalPages = 1) => {
  const oldY = doc.y;
  const footerY = doc.page.height - 80;

  doc
    .moveTo(50, footerY - 10)
    .lineTo(doc.page.width - 50, footerY - 10)
    .strokeColor("#e5e7eb")
    .lineWidth(1)
    .stroke();

  doc
    .font("Helvetica")
    .fontSize(8.5)
    .fillColor("#6b7280")
    .text(clientName || "Marketing Report", 50, footerY, {
      width: 250,
      height: 12,
      lineBreak: false,
    });

  doc
    .font("Helvetica")
    .fontSize(8.5)
    .fillColor("#6b7280")
    .text(`Page ${pageNumber} of ${totalPages}`, doc.page.width - 170, footerY, {
      width: 120,
      height: 12,
      align: "right",
      lineBreak: false,
    });

  doc.y = oldY;
};

module.exports = drawPageFooter;