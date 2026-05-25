export const formatJOD = (amount, options = {}) => {
  const value = amount ?? 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "JOD",
    maximumFractionDigits: 0,
    ...options,
  }).format(value);
};
