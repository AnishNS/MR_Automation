const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

const generatePieChartImage = async (labels = [], values = [], title = "") => {
  const chartCanvas = new ChartJSNodeCanvas({
    width: 700,
    height: 400,
    backgroundColour: "white",
  });

  const configuration = {
    type: "pie",
    data: {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            "#2563eb",
            "#38bdf8",
            "#0f172a",
            "#93c5fd",
            "#1e40af",
          ],
          borderColor: "#ffffff",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        title: {
          display: true,
          text: title,
          font: {
            size: 16,
            weight: "bold",
          },
        },
        legend: {
          position: "top",
        },
      },
    },
  };

  const buffer = await chartCanvas.renderToBuffer(configuration);
  return Buffer.from(buffer);
};

module.exports = {
  generatePieChartImage,
};