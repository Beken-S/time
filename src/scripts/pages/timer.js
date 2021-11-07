"use strict";

import { Howl } from "../utils/howler.js";
import { filterNotNumber, formatTime } from "../utils/getFormatting.js";

const timerForm = document.querySelector(".timer");
const timerInputField = timerForm.querySelector(".timer__input-field");
const {
  hoursInput,
  minutesInput,
  secondsInput,
  timerResult,
  timerButtonStart,
  timerButtonStop,
  timerButtonDelete,
  timerButtonReset,
} = timerForm.elements;

const interfaceControl = (event) => {
  switch (event) {
    case "start":
      timerInputField.classList.add("hide");
      timerResult.classList.remove("hide");
      timerButtonStart.classList.add("hide");
      timerButtonStop.classList.remove("hide");
      timerButtonReset.classList.remove("hide");
      timerButtonDelete.classList.remove("hide");
      break;
    case "stop":
      timerButtonStart.classList.remove("hide");
      timerButtonStop.classList.add("hide");
      break;
    case "delete":
      timerInputField.classList.remove("hide");
      timerResult.classList.add("hide");
      timerButtonReset.classList.add("hide");
      timerButtonDelete.classList.add("hide");
      break;
  }
};

const initFields = () => {
  hoursInput.value = "00";
  minutesInput.value = "00";
  secondsInput.value = "00";
  timerResult.textContent = "";
};

const handleInputTime = (event, units) => {
  const value = +filterNotNumber(event.target.value);
  if (value <= 0) {
    return (event.target.value = "00");
  } else if (value < 10) {
    return (event.target.value = `0${value}`);
  }
  switch (units) {
    case "hours":
      event.target.value = value.toString();
      return;
    case "minutes":
    case "seconds":
      if (value < 59) {
        event.target.value = value.toString();
      } else {
        event.target.value = "59";
      }
      return;
  }
};

const getTimerData = () => {
  const {
    hoursInput: { value: hours },
    minutesInput: { value: minutes },
    secondsInput: { value: seconds },
  } = timerForm.elements;
  return +hours * 3600000 + +minutes * 60000 + +seconds * 1000;
};

const startTimer = () => {
  stopTimer();
  if (timer.start === 0) {
    return;
  }
  interfaceControl("start");
  if (timer.current === 0) {
    timer.start = getTimerData();
    timer.end = Date.now() + timer.start;
  } else {
    timer.end = Date.now() + timer.current;
  }
  timer.id = setInterval(() => {
    timer.current = timer.end - Date.now();
    if (timer.current <= 0) endTimer();
    timerResult.textContent = formatTime(timer.current);
  }, 50);
};

const endTimer = () => {
  stopTimer();
  timerEndSound.play();
  timer.current = 0;
};

const stopTimer = () => {
  clearInterval(timer.id);
  interfaceControl("stop");
};

const deleteTimer = () => {
  stopTimer();
  initFields();
  interfaceControl("delete");
  for (let prop in timer) {
    if (prop === "id") {
      timer[prop] = null;
    } else {
      timer[prop] = 0;
    }
  }
};

const resetTimer = () => {
  stopTimer();
  timerButtonStart.classList.remove("hide");
  timerButtonStop.classList.add("hide");
  timer.current = timer.start;
  timerResult.textContent = formatTime(timer.current);
};

const timer = {
  id: null,
  start: 0,
  end: 0,
  current: 0,
};

const timerEndSound = new Howl({
  src: ["../../sounds/timer-clock-beep.mp3"],
});

initFields();

hoursInput.addEventListener("input", (event) => {
  handleInputTime(event, "hours");
  timer.start = getTimerData();
});
minutesInput.addEventListener("input", (event) => {
  handleInputTime(event, "minutes");
  timer.start = getTimerData();
});
secondsInput.addEventListener("input", (event) => {
  handleInputTime(event, "seconds");
  timer.start = getTimerData();
});
timerButtonStart.addEventListener("click", startTimer);
timerButtonStop.addEventListener("click", stopTimer);
timerButtonDelete.addEventListener("click", deleteTimer);
timerButtonReset.addEventListener("click", resetTimer);
