const drawSectionDivider = (doc, y = doc.y) => {
  doc
    .moveTo(55, y)
    .lineTo(540, y)
    .strokeColor("#d1d5db")
    .lineWidth(1)
    .stroke();

  doc.moveDown(1);
};

module.exports = drawSectionDivider;