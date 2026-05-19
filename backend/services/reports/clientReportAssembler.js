const hasRealValue = (value) => {
  if (value === undefined || value === null) return false;
  if (value === "") return false;
  if (value === "-") return false;
  if (value === "N/A") return false;
  if (value === "n/a") return false;

  return true;
};

const hasMeaningfulSEOData = (seoService) => {
  if (!seoService) return false;

  const summaries =
    seoService.analytics?.clientSummaries || [];

  return summaries.some((client) => {
    return (
      hasRealValue(client.organicTraffic) ||
      hasRealValue(client.impressions) ||
      hasRealValue(client.clicks) ||
      hasRealValue(client.ctr) ||
      hasRealValue(client.avgPosition) ||
      hasRealValue(client.profileViews) ||
      hasRealValue(client.calls) ||
      hasRealValue(client.directionRequests) ||
      hasRealValue(client.reviews)
    );
  });
};

const assembleClientReport = (client) => {
  const services = client.services || {};

  const filteredServices = {};

  // INSTAGRAM
  if (services.instagram) {
    filteredServices.instagram = services.instagram;
  }

  // SEO ONLY IF VALID DATA EXISTS
  if (hasMeaningfulSEOData(services.seo)) {
    filteredServices.seo = services.seo;
  }

  // FUTURE SERVICES
  if (services.metaAds) {
    filteredServices.metaAds = services.metaAds;
  }

  if (services.facebook) {
    filteredServices.facebook = services.facebook;
  }

  if (services.youtube) {
    filteredServices.youtube = services.youtube;
  }

  if (services.linkedin) {
    filteredServices.linkedin = services.linkedin;
  }

  if (services.website) {
    filteredServices.website = services.website;
  }

  const serviceNames = Object.keys(filteredServices);

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

    instagram: filteredServices.instagram || null,

    seo: filteredServices.seo || null,

    metaAds: filteredServices.metaAds || null,

    facebook: filteredServices.facebook || null,

    youtube: filteredServices.youtube || null,

    linkedin: filteredServices.linkedin || null,

    website: filteredServices.website || null,
  };
};

module.exports = {
  assembleClientReport,
};