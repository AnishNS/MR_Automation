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

const getValue = (row, possibleKeys = []) => {
  for (const key of possibleKeys) {
    if (
      row[key] !== undefined &&
      row[key] !== null &&
      row[key] !== ""
    ) {
      return row[key];
    }
  }

  return "";
};

const youtubeNormalizer = (rows = []) => {
  if (!Array.isArray(rows)) return [];

  return rows.map((row) => {
    return {
      title: getValue(row, [
        "Video title",
        "video title",
        "Title",
        "title",
        "Video",
        "video",
      ]),

      views: cleanNumber(
        getValue(row, [
          "Views",
          "views",
        ])
      ),

      watchTime: cleanNumber(
        getValue(row, [
          "Watch time",
          "watch time",
          "Watch time (hours)",
          "watch time (hours)",
        ])
      ),

      subscribers: cleanNumber(
        getValue(row, [
          "Subscribers",
          "subscribers",
          "Subscribers gained",
        ])
      ),

      likes: cleanNumber(
        getValue(row, [
          "Likes",
          "likes",
        ])
      ),

      comments: cleanNumber(
        getValue(row, [
          "Comments",
          "comments",
        ])
      ),

      shares: cleanNumber(
        getValue(row, [
          "Shares",
          "shares",
        ])
      ),

      impressions: cleanNumber(
        getValue(row, [
          "Impressions",
          "impressions",
        ])
      ),

      ctr: cleanNumber(
        getValue(row, [
          "CTR",
          "ctr",
          "Impressions click-through rate",
        ])
      ),

      date: getValue(row, [
        "Date",
        "date",
        "Published date",
      ]),

      raw: row,
    };
  });
};

module.exports = youtubeNormalizer;