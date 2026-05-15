const assembleClientReport = (client) => {
  const services = client.services || {};
  const serviceNames = Object.keys(services);

  return {
    reportType: "client-monthly-report",

    clientName: client.clientName,

    month: client.month,
    year: client.year,

    generatedAt: new Date().toISOString(),

    services: serviceNames,

    summary: {
      totalServices: serviceNames.length,
      totalFiles: client.files?.length || 0,
    },

    instagram: services.instagram || null,

    seo: services.seo || null,

    metaAds: services.metaAds || null,

    facebook: services.facebook || null,

    youtube: services.youtube || null,

    linkedin: services.linkedin || null,

    website: services.website || null,
  };
};

module.exports = {
  assembleClientReport,
};