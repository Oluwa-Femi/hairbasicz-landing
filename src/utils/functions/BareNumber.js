 const bareNumber = (value) => {
    if (value) {
      return value.replace(/[^\w\s]/gi, "");
    }
    return value;
 };

export default bareNumber;
