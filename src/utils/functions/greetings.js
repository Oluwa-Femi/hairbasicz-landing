/**
 * @name: Greetings
 * @description: Time of the day greetings
 */

const Greetings = {
  morning: "Good morning",
  afternoon: "Good afternoon",
  night: "Good night",
  unknown: "Good day",
};

export const GreetingTime = (time = new Date()) => {
  const current_time = time.getHours();
  if (current_time < 12) return Greetings?.morning;
  if (current_time < 18) return Greetings?.afternoon;
  if (current_time > 18) return Greetings?.night;
  return Greetings.unknown;
};
