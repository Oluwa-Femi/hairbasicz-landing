const CalculatePercentage = (list = []) => {
  if (list?.length > 0) {
    const numOfNull = list?.filter((each) => each?.status === null);
    const length = Number(numOfNull.length);
    const totalLenght = Number(list.length);
    const cal = (length / totalLenght) * 100;
    const per = Math.round(cal);
    const reminder = 100 - per;
    return { per, reminder };
  }

  return { per: 0, reminder: 0 };
};

export default CalculatePercentage;
