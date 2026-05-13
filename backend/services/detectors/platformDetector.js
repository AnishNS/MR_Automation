const getColumnsFromRows = (rows) => {
  if (!rows || rows.length === 0) return [];

  return Object.keys(rows[0]).map((key) =>
    key.toLowerCase().trim()
  );
};

const getTextFromRows = (rows) => {
  if (!rows || rows.length === 0) return "";

  return rows
    .slice(0, 20)
    .map((row) => Object.values(row).join(" "))
    .join(" ")
    .toLowerCase();
};

const detectPlatform = (data) => {
  if (!data) return "unknown";

  // Excel multi-sheet format
  if (Array.isArray(data) && data[0]?.sheetName && data[0]?.rows) {
    const combinedText = data
      .map((sheet) => {
        const sheetName = sheet.sheetName || "";
        const sheetText = getTextFromRows(sheet.rows);
        return `${sheetName} ${sheetText}`;
      })
      .join(" ")
      .toLowerCase();

    if (
      combinedText.includes("seo monthly report") ||
      combinedText.includes("keyword rankings") ||
      combinedText.includes("organic traffic") ||
      combinedText.includes("google business profile") ||
      combinedText.includes("gsc")
    ) {
      return "seo";
    }

    return "excel";
  }

  // CSV row format
  if (Array.isArray(data)) {
    const columns = getColumnsFromRows(data);

    const hasInstagramFields =
      columns.includes("views") &&
      columns.includes("reach") &&
      columns.includes("likes");

    const hasSEOFields =
      columns.includes("clicks") &&
      columns.includes("impressions") &&
      columns.includes("ctr");

    const hasAdsFields =
      columns.includes("campaign") &&
      (columns.includes("spend") ||
        columns.includes("amount spent"));

    if (hasInstagramFields) return "instagram";
    if (hasSEOFields) return "seo";
    if (hasAdsFields) return "ads";

    return "generic";
  }

  return "unknown";
};

module.exports = detectPlatform;