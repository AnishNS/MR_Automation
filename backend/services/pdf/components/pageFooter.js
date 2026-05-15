const drawPageFooter = (doc, clientName = "") => {
  const bottomY = doc.page.height - 40;

  doc
    .moveTo(50, bottomY - 10)
    .lineTo(doc.page.width - 50, bottomY - 10)
    .strokeColor("#e5e7eb")
    .stroke();

  doc
    .fontSize(9)
    .fillColor("#6b7280")
    .text(clientName || "Marketing Report", 50, bottomY, {
      width: 250,
      align: "left",
    });

  doc
    .fontSize(9)
    .fillColor("#6b7280")
    .text(`Page ${doc.bufferedPageRange().count}`, doc.page.width - 120, bottomY, {
      width: 70,
      align: "right",
    });
};

module.exports = drawPageFooter;