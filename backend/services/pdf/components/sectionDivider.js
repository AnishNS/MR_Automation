const drawSectionDivider = (doc, y = doc.y) => {
  doc
    .moveTo(50, y)
    .lineTo(545, y)
    .strokeColor("#000000")
    .lineWidth(1)
    .stroke();

  doc.moveDown(1);
};

module.exports = drawSectionDivider;