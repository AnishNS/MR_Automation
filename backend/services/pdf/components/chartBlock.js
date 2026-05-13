const drawChartBlock = (doc, chartBuffer, x, y, width) => {
  if (!chartBuffer) return;

  doc.image(chartBuffer, x, y, {
    width,
  });
};

module.exports = drawChartBlock;