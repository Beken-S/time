/**
 * Удаляет из переданной строки любой символ не являющийся числом.
 * @param {String} string строка для фильтрации.
 * @returns отфильтрованная строка.
 */
export const filterNotNumber = (string) => {
  const regex = /(?:-)[\D]+/g;
  return string.replace(regex, "");
};
