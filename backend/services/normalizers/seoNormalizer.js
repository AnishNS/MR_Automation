const cleanValue = (value) => {
  if (value === undefined || value === null) return "";
  return value;
};

const getMainColumnKey = (row) => {
  return Object.keys(row)[0];
};

const normalizeSEOSheet = (sheet) => {
  const normalizedRows = sheet.rows
  .map((row) => {
    const mainKey = getMainColumnKey(row);

    return {
      label: cleanValue(row[mainKey]),
      previousMonth: cleanValue(row["__EMPTY"]),
      currentMonth: cleanValue(row["__EMPTY_4"] || row["__EMPTY_1"]),
      difference: cleanValue(row["__EMPTY_5"] || row["__EMPTY_2"]),
      notes: cleanValue(row["__EMPTY_6"] || row["__EMPTY_3"]),
    };
  })
    .filter((row) => {
    return row.label && row.label.trim() !== "";
  });

  return {
    clientName: sheet.sheetName,
    platform: "seo",
    rows: normalizedRows,
  };
};

const seoNormalizer = (sheets) => {
  return sheets.map((sheet) => normalizeSEOSheet(sheet));
};

module.exports = seoNormalizer;