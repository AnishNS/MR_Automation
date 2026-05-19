const drawKpiCard = (
  doc,
  x,
  y,
  width,
  height,
  title,
  value
) => {
  // Card Background
  doc
    .roundedRect(x, y, width, height, 14)
    .fillAndStroke("#f8fbff", "#dbeafe");

  // Title
  doc
    .font("Helvetica")
    .fontSize(10.5)
    .fillColor("#6b7280")
    .text(title, x + 16, y + 14, {
      width: width - 32,
    });

  // Main Value
  doc
    .font("Helvetica-Bold")
    .fontSize(22)
    .fillColor("#2563eb")
    .text(String(value), x + 16, y + 38, {
      width: width - 32,
    });

  // Small Top Accent Line
  doc
    .roundedRect(x, y, width, 5, 14)
    .fill("#2563eb");
};

module.exports = drawKpiCard;