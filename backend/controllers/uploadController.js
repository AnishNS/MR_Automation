const path = require("path");

const parseCSV = require("../services/parsers/csvParser");
const parseExcel = require("../services/parsers/excelParser");

const detectPlatform = require("../services/detectors/platformDetector");
const normalizeByPlatform = require("../services/normalizers/unifiedNormalizer");

const { generateInstagramAnalytics } = require("../services/analytics/instagramAnalytics");
const { generateSEOAnalytics } = require("../services/analytics/seoAnalytics");

const { buildCharts } = require("../services/charts/chartBuilder");

const { assembleReport } = require("../services/reports/reportAssembler");

const { groupByClient } = require("../services/clients/clientDataGrouper");
const { buildClientReport } = require("../services/clients/clientReportBuilder");

const {
  assembleClientReport,
} = require("../services/reports/clientReportAssembler");
const {
  generateClientPdfReport,
} = require("../services/reports/clientPdfReportGenerator");
const {
  saveProcessedReport,
} = require("../services/database/saveProcessedReport");

const normalizeClientText = (value = "") =>
  String(value)
    .toLowerCase()
    .replace(/\s+/g, "")
    .trim();
const processSingleFile = async (file) => {
  const filePath = file.path;
  const ext = path.extname(file.originalname).toLowerCase();
  const { resolveClientName } = require("../services/clients/clientResolver");

  let parsedData;

  if (ext === ".csv") {
    parsedData = await parseCSV(filePath);
  } else if (ext === ".xlsx" || ext === ".xls") {
    parsedData = parseExcel(filePath);
  } else {
    throw new Error("Only CSV and Excel files are supported for parsing right now");
  }

  const platform = detectPlatform(parsedData);
  const normalizedData = normalizeByPlatform(platform, parsedData);
  const clientName = resolveClientName(
    platform,
    normalizedData,
    ""
  );

  let analytics = null;

  if (platform === "instagram") {
    analytics = generateInstagramAnalytics(normalizedData);
  }

  if (platform === "seo") {
    analytics = generateSEOAnalytics(normalizedData);
  }

  const charts = buildCharts(platform, normalizedData);

  const totalRecords = Array.isArray(normalizedData)
    ? normalizedData.length
    : 0;

  const report = assembleReport({
    platform,
    file,
    totalRecords,
    analytics,
    charts,
    data: normalizedData,
  });

  return {
    clientName,
    file,
    platform,
    totalRecords,
    data: normalizedData,
    analytics,
    charts,
    report,
  };
};

const uploadFile = async (req, res) => {
  try {
    const files = req.files || [];
    const month = req.body.month || null;
    const year = req.body.year || null;
    const selectedClientName = req.body.selectedClientName || null;

    if (!files.length) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    const processedFiles = [];

    for (const file of files) {
      const processedFile = await processSingleFile(file);
      processedFiles.push(processedFile);
    }

    let clients = groupByClient(processedFiles);
    if (selectedClientName) {
      clients = clients.filter(
        (client) =>
          normalizeClientText(client.clientName) ===
          normalizeClientText(selectedClientName)
      );
    }
    if (!clients.length) {
      return res.status(404).json({
        success: false,
        message: `No data found for selected client: ${selectedClientName}`,
      });
    }

    const clientReports = clients.map((client) =>
      assembleClientReport({
        ...client,
        month,
        year,
      })
    );

    const generatedPdfReports = [];
    const savedDatabaseReports = [];
    for (const clientReport of clientReports) {
      const pdfReport = await generateClientPdfReport(clientReport);
      generatedPdfReports.push(pdfReport);
      const savedReport = await saveProcessedReport({
        clientReport,
        pdfReport,
      });
      savedDatabaseReports.push(savedReport);
    }

    res.json({
      success: true,
      message: "Files uploaded and processed successfully",
      totalFiles: files.length,
      processedFiles,
      clients,
      clientReports,
      generatedPdfReports,
      savedDatabaseReports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadFile,
};