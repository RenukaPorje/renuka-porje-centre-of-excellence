// Card expiry date as MM/YYYY, a number of months from the current month, so the test data never expires
export function cardExpiryDate(monthsFromNow: number): string {
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth() + monthsFromNow, 1);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${month}/${date.getFullYear()}`;
}
