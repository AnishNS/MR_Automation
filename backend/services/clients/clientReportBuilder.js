const buildClientReport = (client) => {
  const services = client.services || {};
  const availableServices = Object.keys(services);

  return {
    reportType: "client-monthly-report",

    clientName: client.clientName,

    generatedAt: new Date().toISOString(),

    availableServices,

    reportOverview: {
      totalFiles: client.files?.length || 0,
      totalServices: availableServices.length,
      servicesIncluded: availableServices,
    },

    sections: {
      coverPage: {
        clientName: client.clientName,
        reportTitle: `${client.clientName} Monthly Performance Report`,
      },

      executiveSummary: {
        servicesIncluded: availableServices,
        summaryText: `This report summarizes monthly performance across ${availableServices.join(
          ", "
        )}.`,
      },

      serviceSections: services,
    },
  };
};

module.exports = {
  buildClientReport,
};