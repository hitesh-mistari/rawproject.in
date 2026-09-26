import { ProductPrices } from "../types";

export function formatPrice(
  amount: ProductPrices | number | string | undefined | null
): string {
  if (!amount) return "₹0";

  let num: number = 0;

  if (typeof amount === "object" && "price" in amount) {
    if (amount.price_range) {
      const min = parseFloat(amount.price_range.min_amount) / 100;
      const max = parseFloat(amount.price_range.max_amount) / 100;
      return `${formatCurrency(min)} – ${formatCurrency(max)}`;
    }
    num = parseFloat(amount.price);
  } else if (typeof amount === "string") {
    num = parseFloat(amount);
  } else {
    num = amount;
  }

  if (isNaN(num)) return "₹0";

  // If Store API returns minor units (paise, e.g. 4500000)
  const finalAmount = num > 100000 ? num / 100 : num;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(finalAmount);
}

export const formatCurrency = (amount: number | string | undefined | null) => {
  return formatPrice(amount);
};

export function stripHtml(html: string = ""): string {
  return html.replace(/<[^>]*>?/gm, "").trim();
}
