const extractSheets = (workbook) => {
  return workbook.SheetNames.map((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];

    const rows = require("xlsx").utils.sheet_to_json(worksheet, {
      defval: "",
    });

    return {
      sheetName,
      rows,
    };
  });
};

module.exports = extractSheets;