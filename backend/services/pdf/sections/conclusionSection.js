const {
  addSectionTitle,
  addSubTitle,
  addParagraph,
  addBulletList,
} = require("../utils/pdfHelpers");

const drawConclusionSection = (doc) => {
  doc.addPage();

  addSectionTitle(doc, "Conclusion & Next Steps");

  addParagraph(
    doc,
    "This monthly report summarizes the available marketing performance data and highlights the key areas that need attention in the upcoming month."
  );

  addSubTitle(doc, "Recommended Focus Areas");

  addBulletList(doc, [
    "Continue improving high-performing content formats.",
    "Review low-performing campaigns and optimize strategy.",
    "Strengthen SEO visibility through keyword and technical improvements.",
    "Track monthly comparisons for clearer growth measurement.",
  ]);
};

module.exports = drawConclusionSection;