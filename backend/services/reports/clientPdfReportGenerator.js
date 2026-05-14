const generateClientPdf = require("../pdf/clientPdfGenerator");

const generateClientPdfReport = async (clientReport) => {
  const pdf = await generateClientPdf(clientReport);

  return {
    clientName: clientReport.clientName,
    services: clientReport.services,
    pdf,
    downloadUrl: `/generated-reports/${pdf.fileName}`,
  };
};

module.exports = {
  generateClientPdfReport,
};