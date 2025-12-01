export const priceSplitter = (number) =>
  parseFloat(number)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
