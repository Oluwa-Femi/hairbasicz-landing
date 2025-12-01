export const priceRange = (priceValue) => {
  switch (priceValue) {
    case "1":
      return { fromPrice: 0, toPrice: 2000 };
    case "2":
      return { fromPrice: 2000, toPrice: 5000 };
    case "3":
      return { fromPrice: 5000, toPrice: 10000 };
    case "4":
      return { fromPrice: 10000, toPrice: 50000 };
    case "5":
      return { fromPrice: 50000, toPrice: 100000 };
    case "6":
      return { fromPrice: 100000, toPrice: 1000000000 };
  }
};
