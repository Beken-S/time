"use strict";

import { DateTime } from "../utils/luxon.min.js";

/**
 * Функция вычисляет разницу дат.
 * @param {String} date1 строка с датой в виде yyyy-mm-dd.
 * @param {String} date2 строка с датой в виде yyyy-mm-dd.
 * @returns {{ years: Number, months: Number, days: Number }} объект с разницей
 * лет, месяцев и дней.
 */
export const getDateDiff = (date1, date2) => {
  if (date1 > date2) {
    [date1, date2] = [date2, date1];
  }

  const start = DateTime.fromISO(date1);
  const end = DateTime.fromISO(date2);

  const diff = end.diff(start, ["years", "months", "days"]).toObject();

  return diff;
};
