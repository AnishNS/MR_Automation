const path = require("path");

const parseCSV = require("../services/parsers/csvParser");
const parseExcel = require("../services/parsers/excelParser");

const detectPlatform = require("../services/detectors/platformDetector");
const normalizeByPlatform = require("../services/normalizers/unifiedNormalizer");

const { generateInstagramAnalytics } = require("../services/analytics/instagramAnalytics");
const { generateSEOAnalytics } = require("../services/analytics/seoAnalytics");
const {
  generateMetaAdsAnalytics,
} = require("../services/analytics/metaAdsAnalytics");
const {
  generateFacebookAnalytics,
} = require("../services/analytics/facebookAnalytics");

const { buildCharts } = require("../services/charts/chartBuilder");
const { assembleReport } = require("../services/reports/reportAssembler");

const { groupByClient } = require("../services/clients/clientDataGrouper");

const {
  assembleClientReport,
} = require("../services/reports/clientReportAssembler");

const {
  generateClientPdfReport,
} = require("../services/reports/clientPdfReportGenerator");

const {
  saveProcessedReport,
} = require("../services/database/saveProcessedReport");

const {
  findClientById,
  normalizeText,
} = require("../services/database/clientService");

const monthNames = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

const getDisplayMonth = (month) => {
  if (!month) return null;
  return monthNames[String(month).padStart(2, "0")] || month;
};

const getClientAliasList = (client) => {
  if (!client) return [];

  const aliases = client.client_aliases
    ? client.client_aliases.split(",").map((alias) => alias.trim())
    : [];

  return [
    client.client_name,
    client.report_display_name,
    ...aliases,
  ].filter(Boolean);
};

const getRowText = (rows = []) => {
  if (!Array.isArray(rows)) return "";

  return rows
    .slice(0, 50)
    .map((row) => Object.values(row).join(" "))
    .join(" ");
};

const doesTextMatchClient = (text = "", aliasList = []) => {
  const normalizedText = normalizeText(text);

  return aliasList.some((alias) => {
    const normalizedAlias = normalizeText(alias);
    return normalizedAlias && normalizedText.includes(normalizedAlias);
  });
};

const filterExcelSheetsByClient = (parsedData, selectedClient) => {
  if (!Array.isArray(parsedData) || !parsedData[0]?.sheetName) {
    return parsedData;
  }

  const aliasList = getClientAliasList(selectedClient);

  const matchingSheets = parsedData.filter((sheet) => {
    const sheetName = sheet.sheetName || "";
    const sheetRowsText = getRowText(sheet.rows || []);

    return doesTextMatchClient(
      `${sheetName} ${sheetRowsText}`,
      aliasList
    );
  });

  return matchingSheets.length > 0 ? matchingSheets : parsedData;
};

const processSingleFile = async (file, selectedClient) => {
  const filePath = file.path;
  const ext = path.extname(file.originalname).toLowerCase();

  let parsedData;

  if (ext === ".csv") {
    parsedData = await parseCSV(filePath);
  } else if (ext === ".xlsx" || ext === ".xls") {
    parsedData = parseExcel(filePath);
    parsedData = filterExcelSheetsByClient(parsedData, selectedClient);
  } else {
    throw new Error("Only CSV and Excel files are supported for parsing right now");
  }

  const platform = detectPlatform(parsedData, file.originalname);
  const normalizedData = normalizeByPlatform(platform, parsedData);

  let analytics = null;

  if (platform === "instagram") {
    analytics = generateInstagramAnalytics(normalizedData);
  }

  if (platform === "seo") {
    analytics = generateSEOAnalytics(normalizedData);
  }

  if (platform === "meta_ads") {
    analytics = generateMetaAdsAnalytics(normalizedData);
  }
  if (platform === "facebook") {
    analytics = generateFacebookAnalytics(normalizedData);
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
    clientName:
      selectedClient.report_display_name ||
      selectedClient.client_name,
    clientId: selectedClient.id,
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

    const month = getDisplayMonth(req.body.month);
    const year = req.body.year || null;
    const selectedClientId = req.body.selectedClientId || null;

    if (!files.length) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    if (!selectedClientId) {
      return res.status(400).json({
        success: false,
        message: "Selected client is required",
      });
    }

    if (!month || !year) {
      return res.status(400).json({
        success: false,
        message: "Report month and year are required",
      });
    }

    const selectedClient = await findClientById(selectedClientId);

    if (!selectedClient) {
      return res.status(404).json({
        success: false,
        message: "Selected client not found",
      });
    }

    const processedFiles = [];

    for (const file of files) {
      const processedFile = await processSingleFile(file, selectedClient);
      processedFiles.push(processedFile);
    }

    const clients = groupByClient(processedFiles);

    if (!clients.length) {
      return res.status(404).json({
        success: false,
        message: `No service data found for selected client: ${
          selectedClient.report_display_name || selectedClient.client_name
        }`,
      });
    }

    const clientReports = clients.map((client) =>
      assembleClientReport({
        ...client,
        clientId: selectedClient.id,
        actualClientName: selectedClient.client_name,
        reportDisplayName:
          selectedClient.report_display_name ||
          selectedClient.client_name,
        clientAliases:
          selectedClient.client_aliases ||
          selectedClient.client_name,
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

    return res.json({
      success: true,
      message: "Files uploaded and processed successfully",
      totalFiles: files.length,
      selectedClient,
      processedFiles,
      clients,
      clientReports,
      generatedPdfReports,
      savedDatabaseReports,
    });
  } catch (error) {
    console.error("Upload processing error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadFile,
};