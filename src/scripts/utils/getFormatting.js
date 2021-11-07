"use strict";

/**
 * Удаляет из переданной строки любой символ не являющийся числом.
 * @param {String} string строка для фильтрации.
 * @returns отфильтрованная строка.
 */
export const filterNotNumber = (string) => {
  const regex = /(?:-)[\D]+/g;
  return string.replace(regex, "");
};

/**
 * Преобразует миллисекунды в строку формата hh:mm:ss.
 * @param {Number} mSeconds миллисекунды.
 * @returns строка формата hh:mm:ss.
 */
export const formatTime = (mSeconds) => {
  const seconds = Math.trunc((mSeconds / 1000) % 60);
  const minutes = Math.trunc((mSeconds / 60000) % 60);
  const hours = Math.trunc(mSeconds / 3600000);
  return `
      ${hours < 10 ? "0" + hours : hours} :
      ${minutes < 10 ? "0" + minutes : minutes} :
      ${seconds < 10 ? "0" + seconds : seconds}
    `;
};
