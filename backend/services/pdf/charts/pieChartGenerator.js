const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

const chartCanvas = new ChartJSNodeCanvas({
  width: 700,
  height: 400,
  backgroundColour: "white",
});

const generatePieChartImage = async (labels = [], values = [], title = "") => {
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
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        title: {
          display: true,
          text: title,
        },
      },
    },
  };

  return await chartCanvas.renderToBuffer(configuration);
};

module.exports = {
  generatePieChartImage,
};