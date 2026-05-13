const groupByClient = (processedFiles = []) => {
  const clients = {};

  processedFiles.forEach((file) => {
    const clientName =
      file.clientName ||
      file.data?.clientName ||
      file.data?.[0]?.clientName ||
      file.file?.originalname ||
      "Unknown Client";

    if (!clients[clientName]) {
      clients[clientName] = {
        clientName,
        services: {},
        files: [],
      };
    }

    clients[clientName].files.push(file);

    const serviceName = file.platform || file.service || "generic";

    clients[clientName].services[serviceName] = {
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
};