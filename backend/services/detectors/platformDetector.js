const normalize = (value = "") => {
  return String(value).toLowerCase().trim();
};

const getColumnsFromRows = (rows) => {
  if (!rows || rows.length === 0) return [];

  return Object.keys(rows[0]).map((key) => normalize(key));
};

const getTextFromRows = (rows) => {
  if (!rows || rows.length === 0) return "";

  return rows
    .slice(0, 30)
    .map((row) => Object.values(row).join(" "))
    .join(" ")
    .toLowerCase();
};

const hasAny = (text, keywords = []) => {
  return keywords.some((keyword) => text.includes(keyword));
};

const detectFromText = (text = "") => {
  const content = normalize(text);

  if (
    hasAny(content, [
      "seo monthly report",
      "keyword rankings",
      "organic traffic",
      "google business profile",
      "google search console",
      "gsc",
      "avg position",
      "average position",
      "search queries",
      "technical seo",
    ])
  ) {
    return "seo";
  }

  if (
    hasAny(content, [
      "instagram",
      "ig reach",
      "ig leads",
      "profile visits",
      "accounts reached",
      "content interactions",
      "reels",
      "followers",
    ])
  ) {
    return "instagram";
  }

  if (
    hasAny(content, [
      "facebook",
      "fb reach",
      "fb leads",
      "page reach",
      "page likes",
      "facebook followers",
    ])
  ) {
    return "facebook";
  }

  if (
    hasAny(content, [
      "meta ads",
      "meta campaign",
      "amount spent",
      "cost per result",
      "cpl",
      "campaign name",
      "ad set",
      "ads manager",
      "instagram leads",
      "facebook leads",
    ])
  ) {
    return "meta_ads";
  }

  if (
    hasAny(content, [
      "google ads",
      "google ad",
      "campaign type",
      "conversions",
      "cost / conv",
      "search campaign",
      "display campaign",
      "google adwords",
    ])
  ) {
    return "google_ads";
  }

  if (
    hasAny(content, [
      "youtube",
      "watch time",
      "views",
      "subscribers",
      "likes",
      "comments",
      "average view duration",
      "channel analytics",
    ])
  ) {
    return "youtube";
  }

  if (
    hasAny(content, [
      "linkedin",
      "company page",
      "linkedin followers",
      "impressions",
      "reactions",
      "shares",
      "click-through rate",
    ])
  ) {
    return "linkedin";
  }

  if (
    hasAny(content, [
      "website analytics",
      "ga4",
      "google analytics",
      "sessions",
      "users",
      "bounce rate",
      "engagement rate",
      "page views",
      "active users",
    ])
  ) {
    return "website_analytics";
  }

  return null;
};

const detectFromColumns = (columns = []) => {
  const joinedColumns = columns.join(" ");

  const hasInstagramFields =
    columns.includes("views") &&
    columns.includes("reach") &&
    (columns.includes("likes") || columns.includes("follows"));

  const hasSEOFields =
    columns.includes("clicks") &&
    columns.includes("impressions") &&
    (columns.includes("ctr") ||
      columns.includes("position") ||
      columns.includes("avg position"));

  const hasMetaAdsFields =
    (columns.includes("campaign") || columns.includes("campaign name")) &&
    (columns.includes("amount spent") ||
      columns.includes("spend") ||
      columns.includes("cpl") ||
      columns.includes("cost per result"));

  const hasGoogleAdsFields =
    hasAny(joinedColumns, [
      "campaign",
      "conversions",
      "cost",
      "clicks",
      "impressions",
      "ctr",
      "avg cpc",
    ]) &&
    hasAny(joinedColumns, ["conversion", "cost / conv", "google ads"]);

  const hasYouTubeFields =
    hasAny(joinedColumns, [
      "views",
      "watch time",
      "subscribers",
      "average view duration",
      "likes",
      "comments",
    ]);

  const hasLinkedInFields =
    hasAny(joinedColumns, [
      "impressions",
      "clicks",
      "reactions",
      "shares",
      "followers",
      "engagement rate",
    ]) &&
    hasAny(joinedColumns, ["linkedin", "company page"]);

  const hasWebsiteAnalyticsFields =
    hasAny(joinedColumns, [
      "sessions",
      "users",
      "page views",
      "bounce rate",
      "engagement rate",
      "active users",
    ]);

  if (hasSEOFields) return "seo";
  if (hasMetaAdsFields) return "meta_ads";
  if (hasGoogleAdsFields) return "google_ads";
  if (hasInstagramFields) return "instagram";
  if (hasYouTubeFields) return "youtube";
  if (hasLinkedInFields) return "linkedin";
  if (hasWebsiteAnalyticsFields) return "website_analytics";

  return null;
};

const detectPlatform = (data, fileName = "") => {
  if (!data) return "unknown";

  const fileNameMatch = detectFromText(fileName);
  if (fileNameMatch) return fileNameMatch;

  // Excel multi-sheet format
  if (Array.isArray(data) && data[0]?.sheetName && data[0]?.rows) {
    const combinedText = data
      .map((sheet) => {
        const sheetName = sheet.sheetName || "";
        const sheetColumns = getColumnsFromRows(sheet.rows).join(" ");
        const sheetText = getTextFromRows(sheet.rows);

        return `${sheetName} ${sheetColumns} ${sheetText}`;
      })
      .join(" ")
      .toLowerCase();

    const textMatch = detectFromText(combinedText);
    if (textMatch) return textMatch;

    return "excel";
  }

  // CSV row format
  if (Array.isArray(data)) {
    const columns = getColumnsFromRows(data);
    const text = `${columns.join(" ")} ${getTextFromRows(data)}`;

    const columnMatch = detectFromColumns(columns);
    if (columnMatch) return columnMatch;

    const textMatch = detectFromText(text);
    if (textMatch) return textMatch;

    return "generic";
  }

  // Text/document fallback
  if (typeof data === "string") {
    const textMatch = detectFromText(data);
    if (textMatch) return textMatch;

    return "generic_document";
  }

  return "unknown";
};

module.exports = detectPlatform;