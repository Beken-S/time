"use strict";

import { getDateDiff } from "../utils/getDateDiff.js";
import { getLayoutError, getLayoutDateDiff } from "../utils/getLayout.js";

const dateCalcForm = document.querySelector(".date-calc");
const dateCalcResult = document.getElementById("dateCalcResult");

const handleCalcDates = (event) => {
  if (event.target.id !== "dateCalcButton") return;
  dateCalcResult.textContent = "";
  const {
    dateFrom: { value: dateFrom },
    dateTo: { value: dateTo },
  } = event.currentTarget.elements;

  if (dateFrom !== "" && dateTo !== "") {
    const diff = getDateDiff(dateFrom, dateTo);
    dateCalcResult.innerHTML = getLayoutDateDiff(diff);
  } else {
    dateCalcResult.innerHTML = getLayoutError(
      "Для расчета промежутка необходимо заполнить оба поля."
    );
  }
};

dateCalcForm.addEventListener("click", handleCalcDates);
