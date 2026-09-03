export function formatMoney(
  amount: number,
  currency: "INR" | "USD" = "INR",
): string {
  const locale = currency === "INR" ? "en-IN" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatSetLabel(setQuantity: number): string {
  return `Set of ${setQuantity} pieces`;
}
