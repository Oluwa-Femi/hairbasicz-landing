import { format, formatDistance } from "date-fns";

export const formatDate = (date) =>
  formatDistance(new Date(date), new Date(), { addSuffix: true });

export const formatDay = (date) => format(new Date(date), "MM/dd/yyyy");
