const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const drawCoverPage = require("./sections/coverPageSection");
const drawExecutiveSummary = require("./sections/executiveSummarySection");
const drawServiceOverview = require("./sections/serviceOverviewSection");
const drawInstagramSection = require("./sections/instagramSection");
const drawSEOSection = require("./sections/seoSection");
const drawConclusionSection = require("./sections/conclusionSection");
const drawInsightsSection = require("./sections/insightsSection");
const drawRecommendationsSection = require("./sections/recommendationsSection");
const drawComparisonSection = require("./sections/comparisonSection");
const drawPageFooter = require("../pdf/components/pageFooter");

const generateClientPdf = async (reportData) => {
  return new Promise(async(resolve, reject) => {
    try {
      const reportsDir = path.join(__dirname, "../../generated-reports");

      if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
      }

      const fileName = `${Date.now()}-report.pdf`;
      const filePath = path.join(reportsDir, fileName);

      const doc = new PDFDocument({
        margin: 50,
        size: "A4",
      });

      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      drawCoverPage(doc, reportData);
      drawExecutiveSummary(doc, reportData);
      drawServiceOverview(doc, reportData);
      drawInsightsSection(doc, reportData);
      drawRecommendationsSection(doc, reportData);
      drawComparisonSection(doc, reportData);
      await drawInstagramSection(doc, reportData.instagram);
      await drawSEOSection(doc, reportData.seo);
      drawConclusionSection(doc, reportData);

      doc.end();

      stream.on("finish", () => {
        resolve({
          fileName,
          filePath,
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = generateClientPdf;