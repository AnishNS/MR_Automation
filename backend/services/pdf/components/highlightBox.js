const drawHighlightBox = (
  doc,
  title,
  text,
  x,
  y,
  width = 485,
  options = {}
) => {
  const {
    bgColor = "#eff6ff",
    borderColor = "#bfdbfe",
    titleColor = "#1d4ed8",
    textColor = "#374151",
  } = options;

  const textHeight = doc.heightOfString(text, {
    width: width - 40,
    lineGap: 5,
  });

  const boxHeight = textHeight + 70;

  doc
    .roundedRect(x, y, width, boxHeight, 12)
    .fillAndStroke(bgColor, borderColor);

  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .fillColor(titleColor)
    .text(title, x + 20, y + 20);

  doc
    .font("Helvetica")
    .fontSize(11.5)
    .fillColor(textColor)
    .text(text, x + 20, y + 45, {
      width: width - 40,
      lineGap: 5,
    });

  return boxHeight;
};

module.exports = drawHighlightBox;