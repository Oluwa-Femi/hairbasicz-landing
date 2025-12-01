import { GreetingTime } from "../../utils/functions/greetings";

describe("Test time fo the day greeting", () => {
  it("TIME_BEFORE_12_SHOULD_BE_MORNING", () => {
    const date = new Date("March 13, 12 1:20");
    const greeting = GreetingTime(date);
    expect(greeting).toBe("Good morning");
  });

  it("TIME_AFTER_12_BEFORE_18_SHOULD_BE_AFTERNOON", () => {
    const afternoon = new Date("March 13, 12 12:20");
    const evening = new Date("March 13, 19 18:20");
    const greeting = GreetingTime(afternoon);
    const greetingEvening = GreetingTime(evening);
    expect(greeting).toBe("Good afternoon");
    expect(greetingEvening).not.toBe("Good afternoon");
  });

  it("TIME_AFTER_18_SHOULD_BE_NIGHT", () => {
    const evening = new Date("March 13, 19 19:20");
    const greeting = GreetingTime(evening);
    expect(greeting).toBe("Good night");
  });

  it("UNCOVERED_TIME_RETURNS_GOOD_DAY", () => {
    const evening = new Date("March 13, 19 18:00");
    const greeting = GreetingTime(evening);
    expect(greeting).toBe("Good day");
  });

  it("CHECK_CURRENT_TIME", () => {
    const greeting = GreetingTime();
    expect(greeting).toBeTruthy();
  });
});
