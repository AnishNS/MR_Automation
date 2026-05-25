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
    if (row[key] !== undefined && row[key] !== null && row[key] !== "") {
      return row[key];
    }
  }

  return "";
};

const facebookNormalizer = (rows = []) => {
  if (!Array.isArray(rows)) return [];

  return rows.map((row) => {
    return {
      postType: getValue(row, [
        "Post type",
        "post type",
        "Content type",
        "content type",
        "Type",
        "type",
      ]),

      title: getValue(row, [
        "Title",
        "title",
        "Description",
        "description",
        "Post",
        "post",
      ]),

      reach: cleanNumber(
        getValue(row, [
          "Reach",
          "reach",
          "Facebook reach",
          "fb reach",
          "Page reach",
        ])
      ),

      views: cleanNumber(
        getValue(row, [
          "Views",
          "views",
          "Video views",
          "video views",
          "Post views",
        ])
      ),

      likes: cleanNumber(
        getValue(row, [
          "Likes",
          "likes",
          "Reactions",
          "reactions",
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

      clicks: cleanNumber(
        getValue(row, [
          "Clicks",
          "clicks",
          "Link clicks",
          "link clicks",
        ])
      ),

      engagement: cleanNumber(
        getValue(row, [
          "Engagement",
          "engagement",
          "Content interactions",
          "content interactions",
        ])
      ),

      date: getValue(row, [
        "Date",
        "date",
        "Published date",
        "published date",
      ]),

      raw: row,
    };
  });
};

module.exports = facebookNormalizer;