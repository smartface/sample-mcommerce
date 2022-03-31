export function moneyFormatter(price: number): string {
    return price !== undefined ? `$${price?.toFixed(2).toString()}` : null;
}
