export function formatPrice(price: number): string {
  if (price < 0.00001) {
    return price.toFixed(8);
  }
  return price.toFixed(8);
}