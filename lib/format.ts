/**
 * Bengali Number and Text Formatting Utilities
 */

export const toBn = (num: number | string): string => {
  if (num === undefined || num === null) return '';
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[parseInt(d, 10)] ?? d);
};

export const formatBnCurrency = (amount: number): string => {
  return '৳' + toBn(amount.toLocaleString('en-IN'));
};
