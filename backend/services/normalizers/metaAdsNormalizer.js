const cleanNumber = (value) => {
  if (value === undefined || value === null) return 0;

  return (
    Number(
      String(value)
        .replace(/,/g, "")
        .replace(/₹/g, "")
        .replace(/%/g, "")
        .trim()
    ) || 0
  );
};

const metaAdsNormalizer = (rows = []) => {
  if (!Array.isArray(rows)) return [];

  return rows.map((row) => ({
    campaignName:
      row.campaignName ||
      row.campaign ||
      row["Campaign Name"] ||
      "",

    reach: cleanNumber(
      row.reach ||
      row.Reach
    ),

    impressions: cleanNumber(
      row.impressions ||
      row.Impressions
    ),

    clicks: cleanNumber(
      row.clicks ||
      row.Clicks
    ),

    leads: cleanNumber(
      row.leads ||
      row.Leads
    ),

    spend: cleanNumber(
      row.spend ||
      row["Amount Spent"] ||
      row["amount spent"]
    ),

    cpl: cleanNumber(
      row.cpl ||
      row["Cost Per Lead"] ||
      row["cost per lead"]
    ),

    ctr: cleanNumber(
      row.ctr ||
      row.CTR
    ),

    source:
      row.source ||
      row.platform ||
      "",

    raw: row,
  }));
};

module.exports = metaAdsNormalizer;