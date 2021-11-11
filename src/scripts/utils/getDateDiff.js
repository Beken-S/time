import { DateTime } from "luxon";

/**
 * Функция вычисляет разницу дат.
 * @param {*} date1 дата.
 * @param {*} date2 дата.
 * @returns {{ years: Number, months: Number, days: Number }} объект с разницей
 * лет, месяцев и дней.
 */
export const getDateDiff = (date1, date2) => {
  if (date1 > date2) {
    [date1, date2] = [date2, date1];
  }

  let start = null;
  let end = null;
  if (DateTime.isDateTime(date1) && DateTime.isDateTime(date2)) {
    start = date1;
    end = date2;
    return end
      .diff(start, [
        "years",
        "months",
        "days",
        "hours",
        "minutes",
        "seconds",
        "milliseconds",
      ])
      .toObject();
  }
  if (typeof date1 === "string" && typeof date2 === "string") {
    start = DateTime.fromISO(date1);
    end = DateTime.fromISO(date2);
    return end
      .diff(start, [
        "years",
        "months",
        "days",
        "hours",
        "minutes",
        "seconds",
        "millisecond",
      ])
      .toObject();
  }
  return;
};
