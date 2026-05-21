const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

const generateBarChartImage = async (labels = [], values = [], title = "") => {
  const chartCanvas = new ChartJSNodeCanvas({
    width: 800,
    height: 400,
    backgroundColour: "white",
  });

  const configuration = {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: "#2563eb",
          borderRadius: 6,
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: title,
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  const buffer = await chartCanvas.renderToBuffer(configuration);
  return Buffer.from(buffer);
};

module.exports = {
  generateBarChartImage,
};