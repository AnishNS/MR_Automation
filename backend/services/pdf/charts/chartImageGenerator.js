const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

const width = 800;
const height = 400;

const chartCanvas = new ChartJSNodeCanvas({
  width,
  height,
  backgroundColour: "white",
});

const generateBarChartImage = async (labels = [], values = [], title = "") => {
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
  generateBarChartImage,
};