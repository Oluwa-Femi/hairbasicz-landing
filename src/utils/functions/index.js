export const getFirstLetters = (str) => {
  const firstLetters = str.match(/\b\w/g).join("");

  return firstLetters;
};
