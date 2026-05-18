const { findOrCreateClient } = require("./clientService");
const { createReport } = require("./reportService");
const { createService } = require("./serviceService");
const {
  fetchPreviousInstagramAnalytics,
} = require("./fetchPreviousInstagramAnalytics");
const {
  fetchPreviousSEOAnalytics,
} = require("./fetchPreviousSEOAnalytics");
const {
  buildInstagramHistoricalComparisons,
  buildSEOHistoricalComparisons,
} = require("../analytics/buildHistoricalComparisons");
const {
  saveInstagramAnalytics,
} = require("./instagramAnalyticsService");
const {
  saveSEOAnalytics,
} = require("./seoAnalyticsService");
// const {
//   findExistingReport,
// } = require("./reportLookupService");

const saveProcessedReport = async ({
  clientReport,
  pdfReport,
}) => {
  const client = await findOrCreateClient(clientReport.clientName);

    // const duplicateChecks = [];

    // for (const platform of clientReport.services || []) {
    // const existingReport = await findExistingReport({
    //     clientId: client.id,
    //     month: clientReport.month,
    //     year: clientReport.year,
    //     platform,
    // });

    // if (existingReport) {
    //     duplicateChecks.push(platform);
    // }
    // }

    // if (duplicateChecks.length > 0) {
    // return {
    //     client,
    //     skipped: true,
    //     reason: `Duplicate report already exists for ${duplicateChecks.join(", ")} - ${clientReport.month} ${clientReport.year}`,
    // };
    // }

    const report = await createReport({
    clientId: client.id,
    month: clientReport.month || null,
    year: clientReport.year || null,
    pdfPath: pdfReport?.pdf?.filePath || null,
    });

    const savedServices = [];


  for (const platform of clientReport.services || []) {
    const serviceData = clientReport[platform];

    const service = await createService({
      reportId: report.id,
      platform,
      rawFileName: serviceData?.file?.originalname || null,
    });

    if (platform === "instagram") {
    const previousInstagramAnalytics =
        await fetchPreviousInstagramAnalytics(
            client.id,
            clientReport.month,
            clientReport.year
        );

    serviceData.analytics.comparisons =
        buildInstagramHistoricalComparisons(
        serviceData.analytics,
        previousInstagramAnalytics
        );

    await saveInstagramAnalytics({
        serviceId: service.id,
        analytics: serviceData?.analytics,
    });
    }

    if (platform === "seo") {
    const previousSEOAnalytics =
        await fetchPreviousSEOAnalytics(
            client.id,
            clientReport.month,
            clientReport.year
        );

    if (serviceData?.analytics?.clientSummaries?.length) {
        serviceData.analytics.clientSummaries =
        serviceData.analytics.clientSummaries.map((summary) => ({
            ...summary,
            comparisons: buildSEOHistoricalComparisons(
            summary,
            previousSEOAnalytics
            ),
        }));
    }

    await saveSEOAnalytics({
        serviceId: service.id,
        analytics: serviceData?.analytics,
    });
    }

    savedServices.push(service);
  }

  return {
    client,
    report,
    services: savedServices,
  };
};

module.exports = {
  saveProcessedReport,
};