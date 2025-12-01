import {
  UpdateSchema,
  findOne,
  fallbackChoice,
} from "../../../src/utils/functions/settings/notification.helper";

describe("Update Schema", () => {
  const data = [
    { id: "order_confirmation", value: "weekly" },
    { id: "shipping_updates", value: "monthly" },
    { id: "special_offers", value: "daily" },
  ];

  const compare = "shipping_updates";

  const fallbackOption = {
    order_confirmation: "monthly",
    shipping_updates: "weekly",
    special_offers: "daily",
  };

  it("SHOULD_RETURN_VALUE_FOR_DATA_WHEN_AVALIABLE", () => {
    const result = UpdateSchema(data, compare, fallbackOption);
    const result2 = UpdateSchema(data, "order_confirmation", fallbackOption);
    const result3 = UpdateSchema(data, "special_offers", fallbackOption);
    expect(result).toBe("monthly");
    expect(result).not.toBe("weekly");
    expect(result2).toBe("weekly");
    expect(result3).toBe("daily");
  });

  it("SHOULD_RETURN_VALUE_FOR_FALLBACK_WHEN_DATA_WHEN_UNAVALIABLE", () => {
    const result = UpdateSchema([], compare, fallbackOption);
    const result2 = UpdateSchema([], "order_confirmation", fallbackOption);
    const result3 = UpdateSchema([], "special_offers", fallbackOption);
    expect(result).toBe("weekly");
    expect(result).not.toBe("monthly");
    expect(result2).toBe("monthly");
    expect(result3).toBe("daily");
  });

  it("SHOULD_RETURN_NULL_WHEN_NO_FALLBACK_OR_DATA_SUPPLIED", () => {
    const result = UpdateSchema([], "special_offers", {});
    expect(result).toBe(null);
  });

  it("NO_COMPARE_RETURN_NULL_WHEN_NO_FALLBACK_OR_DATA_SUPPLIED", () => {
    const result = UpdateSchema();
    expect(result).toBe(null);
  });
});

describe("<FallbackChoice />", () => {
  const fallbackOption = {
    order_confirmation: "monthly",
    shipping_updates: "weekly",
    special_offers: "daily",
  };
  it("RETURNS_VALUE_OF_OPTION", () => {
    const result = fallbackChoice(fallbackOption, "order_confirmation");
    expect(result).toBe("monthly");
  });

  it("EMPTY_FIELDS_RETURNS_VALUE_UNDEFINED", () => {
    const result = fallbackChoice(fallbackOption, "order_confirmatio");
    const result2 = fallbackChoice(fallbackOption);
    expect(result).toBe(undefined);
    expect(result2).toBe(undefined);
  });

  it("EMPTY_PROPS_RETURNS_VALUE_UNDEFINED", () => {
    const result = fallbackChoice();
    expect(result).toBe(undefined);
  });
});

describe("<findOne />", () => {
  const data = [
    { id: "order_confirmation", value: "weekly" },
    { id: "shipping_updates", value: "monthly" },
    { id: "special_offers", value: "daily" },
  ];
  it("RETURNS_VALUE_OF_OPTION", () => {
    const result = findOne(data, "order_confirmation");
    expect(result.value).toBe("weekly");
  });

  it("EMPTY_FIELDS_RETURNS_VALUE_UNDEFINED", () => {
    const result = findOne(data, "order_confirmatio");
    const result2 = findOne(data);
    expect(result).toBe(undefined);
    expect(result2).toBe(undefined);
  });

  it("EMPTY_PROPS_RETURNS_VALUE_UNDEFINED", () => {
    const result = findOne();
    expect(result).toBe(undefined);
  });
});
