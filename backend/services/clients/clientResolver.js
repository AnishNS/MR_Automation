const normalizeName = (value) => {
  if (!value) return "";
  return String(value).trim();
};

const resolveClientName = (platform, normalizedData, requestedClientName = "") => {
  const selectedClient = normalizeName(requestedClientName);

  if (selectedClient) {
    return selectedClient;
  }

  if (platform === "instagram") {
    return (
      normalizeName(normalizedData?.[0]?.accountName) ||
      normalizeName(normalizedData?.[0]?.username) ||
      "Unknown Client"
    );
  }

  if (platform === "seo") {
    if (Array.isArray(normalizedData) && normalizedData.length === 1) {
      return normalizeName(normalizedData[0].clientName) || "Unknown Client";
    }

    return "Multiple Clients";
  }

  return "Unknown Client";
};

module.exports = {
  resolveClientName,
};