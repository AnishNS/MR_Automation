const genericNormalizer = (rows) => {
  return rows.map((row) => {
    const cleanedRow = {};

    Object.keys(row).forEach((key) => {
      const cleanKey = key
        .replace(/^\uFEFF/, "")
        .replace(/"/g, "")
        .trim();

      cleanedRow[cleanKey] = row[key];
    });

    return cleanedRow;
  });
};

module.exports = genericNormalizer;