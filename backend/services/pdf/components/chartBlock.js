const drawChartBlock = (
  doc,
  chartBuffer,
  x,
  y,
  width,
  options = {}
) => {
  if (!chartBuffer) return;

  const {
    padding = 12,
    backgroundColor = "#ffffff",
    borderColor = "#e5e7eb",
  } = options;

  const chartHeight = 260;

  // Background Card
  doc
    .roundedRect(
      x - padding,
      y - padding,
      width + padding * 2,
      chartHeight + padding * 2,
      14
    )
    .fillAndStroke(backgroundColor, borderColor);

  // Chart Image
  doc.image(chartBuffer, x, y, {
    width,
  });
};

module.exports = drawChartBlock;