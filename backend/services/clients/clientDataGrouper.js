const { standardizeClientName } = require("./clientResolver");

const getServiceKey = (platform = "") => {
  const serviceMap = {
    instagram: "instagram",
    seo: "seo",
    meta_ads: "metaAds",
    facebook: "facebook",
    youtube: "youtube",
    linkedin: "linkedin",
    google_ads: "googleAds",
    website_analytics: "websiteAnalytics",
    ads: "metaAds",
    website: "websiteAnalytics",
  };

  return serviceMap[platform] || platform || "generic";
};

const groupByClient = (processedFiles = []) => {
  const clients = {};

  const ensureClient = (clientName) => {
    const cleanClientName =
      standardizeClientName(clientName) || "Unknown Client";

    if (!clients[cleanClientName]) {
      clients[cleanClientName] = {
        clientName: cleanClientName,
        services: {},
        files: [],
      };
    }

    return clients[cleanClientName];
  };

  processedFiles.forEach((file) => {
    if (file.platform === "seo" && file.analytics?.clientSummaries?.length) {
      file.analytics.clientSummaries.forEach((seoClient) => {
        const client = ensureClient(seoClient.clientName);

        client.files.push(file);

        client.services.seo = {
          platform: "seo",
          analytics: {
            platform: "seo",
            totalClients: 1,
            clientSummaries: [seoClient],
            insights:
              file.analytics.insights?.filter(
                (item) => item.clientName === seoClient.clientName
              ) || [],
            recommendations:
              file.analytics.recommendations?.filter(
                (item) => item.clientName === seoClient.clientName
              ) || [],
          },
          charts: file.charts,
          data: file.data?.filter(
            (item) => item.clientName === seoClient.clientName
          ),
        };
      });

      return;
    }

    const clientName =
      file.clientName ||
      file.data?.clientName ||
      file.data?.[0]?.clientName ||
      file.file?.originalname ||
      "Unknown Client";

    const client = ensureClient(clientName);

    client.files.push(file);

    const serviceName = getServiceKey(file.platform || file.service);

    client.services[serviceName] = {
      platform: file.platform,
      analytics: file.analytics,
      charts: file.charts,
      data: file.data,
    };
  });

  return Object.values(clients);
};

module.exports = {
  groupByClient,
  getServiceKey,
};