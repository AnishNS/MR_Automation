const drawCoverPage = (doc, reportData) => {
  doc
    .fontSize(28)
    .fillColor("#111111")
    .text("MONTHLY MARKETING REPORT", {
      align: "center",
    });

  doc.moveDown(2);

  doc
    .fontSize(22)
    .fillColor("#2563eb")
    .text(reportData.clientName || "Client Report", {
      align: "center",
    });

  doc.moveDown(1);

  doc
    .fontSize(14)
    .fillColor("#555555")
    .text(`Generated on: ${new Date().toDateString()}`, {
      align: "center",
    });

  doc.moveDown(5);

  doc
    .fontSize(18)
    .fillColor("#111111")
    .text("Prepared By", {
      align: "center",
    });

  doc.moveDown(0.5);

  doc
    .fontSize(24)
    .fillColor("#000000")
    .text("Usher Media", {
      align: "center",
    });
};

module.exports = drawCoverPage;