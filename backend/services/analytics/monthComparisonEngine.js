const toNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

const calculateDifference = (current, previous) => {
  return toNumber(current) - toNumber(previous);
};

const calculateGrowthPercent = (current, previous) => {
  const curr = toNumber(current);
  const prev = toNumber(previous);

  if (prev === 0) return null;

  return Number((((curr - prev) / prev) * 100).toFixed(2));
};

const compareMetric = (label, current, previous) => {
  const difference = calculateDifference(current, previous);
  const growthPercent = calculateGrowthPercent(current, previous);

  return {
    label,
    previous,
    current,
    difference,
    growthPercent,
    trend:
      difference > 0
        ? "increase"
        : difference < 0
        ? "decrease"
        : "no-change",
  };
};

module.exports = {
  compareMetric,
  calculateDifference,
  calculateGrowthPercent,
};