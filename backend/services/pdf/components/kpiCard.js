const drawKpiCard = (doc, x, y, width, height, title, value) => {
  doc
    .roundedRect(x, y, width, height, 10)
    .fillAndStroke("#f3f7ff", "#dbeafe");

  doc
    .fontSize(10)
    .fillColor("#555555")
    .text(title, x + 12, y + 12, {
      width: width - 24,
    });

  doc
    .fontSize(18)
    .fillColor("#2563eb")
    .text(String(value), x + 12, y + 35, {
      width: width - 24,
    });
};

module.exports = drawKpiCard;