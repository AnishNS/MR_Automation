const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

const chartCanvas = new ChartJSNodeCanvas({
  width: 800,
  height: 400,
  backgroundColour: "white",
});

const generateSEOBarChartImage = async (labels = [], values = [], title = "") => {
  const configuration = {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: title,
          data: values,
          backgroundColor: "#2563eb",
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
        },
      },
    },
  };

  return await chartCanvas.renderToBuffer(configuration);
};

module.exports = {
  generateSEOBarChartImage,
};