const instagramNormalizer = require("./instagramNormalizer");
const seoNormalizer = require("./seoNormalizer");
const genericNormalizer = require("./genericNormalizer");
const facebookNormalizer = require("./facebookNormalizer");

/*
  Future Normalizers
  (Create later step-by-step)
*/

const normalizeMetaAds = (rows) => {
  return genericNormalizer(rows);
};

const normalizeGoogleAds = (rows) => {
  return genericNormalizer(rows);
};

const normalizeFacebook = (rows) => {
  return facebookNormalizer(rows);
};

const normalizeLinkedIn = (rows) => {
  return genericNormalizer(rows);
};

const normalizeYouTube = (rows) => {
  return genericNormalizer(rows);
};

const normalizeWebsiteAnalytics = (rows) => {
  return genericNormalizer(rows);
};

const normalizeByPlatform = (platform, rows) => {
  switch (platform) {
    case "instagram":
      return instagramNormalizer(rows);

    case "seo":
      return seoNormalizer(rows);

    case "meta_ads":
      return normalizeMetaAds(rows);

    case "google_ads":
      return normalizeGoogleAds(rows);

    case "facebook":
      return normalizeFacebook(rows);

    case "linkedin":
      return normalizeLinkedIn(rows);

    case "youtube":
      return normalizeYouTube(rows);

    case "website_analytics":
      return normalizeWebsiteAnalytics(rows);

    default:
      return genericNormalizer(rows);
  }
};

module.exports = normalizeByPlatform;