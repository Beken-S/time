/**
 * Создает разметку для объекта с разницей дат.
 * @param {{ years: Number, months: Number, days: Number }} diff объект с
 * разницей дат.
 * @returns строка с HTML разметкой.
 */
export const getLayoutDateDiff = (diff) => {
  let years = "";
  let months = "";
  let days = "";

  if (diff.years > 0) {
    const key = diff.years < 20 ? diff.years : diff.years % 10;
    switch (key) {
      case 1:
        years = `${diff.years} год,`;
        break;
      case 2:
      case 3:
      case 4:
        years = `${diff.years} года,`;
        break;
      default:
        years = `${diff.years} лет,`;
        break;
    }
  }

  if (diff.months > 0) {
    const key = diff.months < 20 ? diff.months : diff.months % 10;
    switch (key) {
      case 1:
        months = `${diff.months} месяц,`;
        break;
      case 2:
      case 3:
      case 4:
        months = `${diff.months} месяца,`;
        break;
      default:
        months = `${diff.months} месяцев,`;
        break;
    }
  }

  if (diff.days > 0) {
    const key = diff.days < 20 ? diff.days : diff.days % 10;
    switch (key) {
      case 1:
        days = `${diff.days} день.`;
        break;
      case 2:
      case 3:
      case 4:
        days = `${diff.days} дня.`;
        break;
      default:
        days = `${diff.days} дней.`;
        break;
    }
  }

  return `
      <span>
        ${years} ${months} ${days}
      </span>
    `;
};

/**
 * Создает разметку для сообщения ошибки.
 * @param {String} text текст ошибки.
 * @returns строка с HTML разметкой.
 */
export const getLayoutError = (text) => `<span class="error">${text}</span>`;
