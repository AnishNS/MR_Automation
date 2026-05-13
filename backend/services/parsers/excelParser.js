const XLSX = require("xlsx");
const extractSheets = require("./sheetExtractor");

const parseExcel = (filePath) => {
  const workbook = XLSX.readFile(filePath);

  const sheets = extractSheets(workbook);

  return sheets;
};

module.exports = parseExcel;