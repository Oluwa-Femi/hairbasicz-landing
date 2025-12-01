import CalculatePercentage from "../../utils/functions/CalculatePercentage";

const listArray = [
  { id: 1, status: null },
  { id: 2, status: true },
  { id: 3, status: true },
  { id: 4, status: true },
];

const percent = [
  { id: 1, status: true },
  { id: 2, status: true },
  { id: 3, status: true },
  { id: 4, status: true },
];

describe("<CalculatePercentage />", () => {
  it("FULL_LIST_SHOULD_RETURN_PERCENTAGE_AND_REMINDER", () => {
    const result = CalculatePercentage(listArray);
    const result2 = CalculatePercentage(percent);
    expect(result).toStrictEqual({ per: 25, reminder: 75 });
    expect(result2).toEqual({ per: 0, reminder: 100 });
  });

  it("EMPTY_ARR_SHOULD_FALL_BACK_DETAILS", () => {
    const result = CalculatePercentage();
    expect(result).toEqual({ per: 0, reminder: 0 });
  });
});
