const addSectionTitle = (doc, title) => {
  doc
    .fontSize(24)
    .fillColor("#111111")
    .text(title);

  doc.moveDown(1);
};

const addSubTitle = (doc, title) => {
  doc
    .fontSize(16)
    .fillColor("#2563eb")
    .text(title);

  doc.moveDown(0.8);
};

const addParagraph = (doc, text) => {
  doc
    .fontSize(12)
    .fillColor("#444444")
    .text(text, {
      lineGap: 6,
    });

  doc.moveDown(1);
};

const addBulletList = (doc, items = []) => {
  items.forEach((item) => {
    doc
      .fontSize(12)
      .fillColor("#333333")
      .text(`• ${item}`);
  });

  doc.moveDown(1);
};

module.exports = {
  addSectionTitle,
  addSubTitle,
  addParagraph,
  addBulletList,
};