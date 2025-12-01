export const calculateSubTotal = (data) => {
  const arr = data?.map((items) => {
    if (items?.product_details?.discount_amount !== null) {
      return items?.product_details?.discount_amount;
    } else {
      return items?.amount;
    }
  });
  let total = 0;
  for (let i = 0; i < arr?.length; i += 1) {
    total += Number(arr[i]);
  }
  return total;
};
