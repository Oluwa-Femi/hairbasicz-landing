export const findOne = (data = [], compare) =>
  data?.find((each) => each?.id === compare);

// convert current changes
export const fallbackChoice = (list = {}, compare) => {
  const data = Object.keys(list);
  const value = Object.values(list);
  const findId = data?.findIndex((each) => each === compare);
  return value[findId];
};

export const UpdateSchema = (data = [], compare, fallbackOption = {}) => {
  const isFound = findOne(data, compare);

  if (isFound?.value) return isFound?.value;

  const isFallbackChoice = fallbackChoice(fallbackOption, compare);
  if (isFallbackChoice) return isFallbackChoice;

  return null;
};
