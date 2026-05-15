const CLIENT_NAME_ALIASES = {
  "stylewell interior design": "StyleWell Interior",
  "style well interior": "StyleWell Interior",
  "stylewell interior": "StyleWell Interior",
};

const normalizeName = (value) => {
  if (!value) return "";
  return String(value).trim();
};

const normalizeClientKey = (value) => {
  return normalizeName(value)
    .toLowerCase()
    .replace(/\s+/g, " ");
};

const standardizeClientName = (value) => {
  const cleanName = normalizeName(value);
  const key = normalizeClientKey(cleanName);

  return CLIENT_NAME_ALIASES[key] || cleanName;
};

const resolveClientName = (platform, normalizedData, requestedClientName = "") => {
  const selectedClient = standardizeClientName(requestedClientName);

  if (selectedClient) {
    return selectedClient;
  }

  if (platform === "instagram") {
    return (
      standardizeClientName(normalizedData?.[0]?.accountName) ||
      standardizeClientName(normalizedData?.[0]?.username) ||
      "Unknown Client"
    );
  }

  if (platform === "seo") {
    if (Array.isArray(normalizedData) && normalizedData.length === 1) {
      return standardizeClientName(normalizedData[0].clientName) || "Unknown Client";
    }

    return "Multiple Clients";
  }

  return "Unknown Client";
};

module.exports = {
  resolveClientName,
  standardizeClientName,
};