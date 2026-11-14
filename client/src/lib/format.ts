export const formatPrice = (value: number) =>
  `${value.toLocaleString("en-US", { maximumFractionDigits: 0 })} ر.س`;

export const formatNumber = (value: number) =>
  value.toLocaleString("en-US", { maximumFractionDigits: 0 });

export const formatCompact = (value: number) => {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return `${value}`;
};

export const formatPercent = (value: number) =>
  `${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}%`;

export const todayLabel = () =>
  new Date().toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
