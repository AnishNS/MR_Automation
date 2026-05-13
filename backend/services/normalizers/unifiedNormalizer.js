const instagramNormalizer = require("./instagramNormalizer");
const seoNormalizer = require("./seoNormalizer");
const genericNormalizer = require("./genericNormalizer");

const normalizeByPlatform = (platform, rows) => {
  if (platform === "instagram") {
    return instagramNormalizer(rows);
  }

  if (platform === "seo") {
    return seoNormalizer(rows);
  }

  return genericNormalizer(rows);
};

module.exports = normalizeByPlatform;