const drawPageFooter = (doc, clientName = "", pageNumber = 1, totalPages = 1) => {
  const footerY = doc.page.height - 38;

  doc
    .font("Helvetica")
    .fontSize(7.5)
    .fillColor("#9ca3af")
    .text(clientName || "Marketing Report", 55, footerY, {
      width: 250,
      height: 10,
      lineBreak: false,
    });

  doc
    .font("Helvetica")
    .fontSize(7.5)
    .fillColor("#9ca3af")
    .text(`Page ${pageNumber} of ${totalPages}`, doc.page.width - 155, footerY, {
      width: 100,
      height: 10,
      align: "right",
      lineBreak: false,
    });
};

module.exports = drawPageFooter;