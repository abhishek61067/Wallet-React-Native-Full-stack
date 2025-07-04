export function formatNumberWithCommas(number) {
  if (isNaN(number)) return "0";
  return Number(number).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
