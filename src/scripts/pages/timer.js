import { DateTime, Duration } from "luxon";
import { getDateDiff } from "../utils/getDateDiff.js";
import { filterNotNumber } from "../utils/getFormatting.js";
import endSound from "../../sounds/timer-clock-beep.mp3";

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
    case "end":
      timerButtonStart.classList.add("hide");
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

const setTimer = () => {
  const {
    hoursInput: { value: hours },
    minutesInput: { value: minutes },
    secondsInput: { value: seconds },
  } = timerForm.elements;
  timer.duration = {
    hours: +hours,
    minutes: +minutes,
    seconds: +seconds,
  };
  timer.start = DateTime.local();
  timer.current = timer.start;
  timer.end = timer.start.plus(timer.duration);
  timer.wasAlreadyRunning = true;
};

const resetTimer = () => {
  stopTimer();
  timer.current = timer.start;
  timer.wasAlreadyRunning = false;
  renderTimer();
};

const renderTimer = () => {
  const remaining = getDateDiff(timer.current, timer.end);
  timerResult.textContent = Duration.fromObject(remaining).toFormat("hh:mm:ss");
};

const startTimer = () => {
  if (timer.id !== null) stopTimer();
  interfaceControl("start");
  if (timer.wasAlreadyRunning) {
    resumeTimer();
  } else {
    setTimer();
  }
  timer.id = setInterval(() => {
    timer.current = DateTime.local();
    if (timer.current >= timer.end) {
      endTimer();
    }
    renderTimer();
  }, 50);
};

const resumeTimer = () => {
  const remainder = getDateDiff(timer.current, timer.end);
  timer.end = DateTime.local().plus(remainder);
  timer.start = timer.end.minus(timer.duration);
};

const stopTimer = () => {
  clearInterval(timer.id);
  timer.id = null;
  interfaceControl("stop");
};

const endTimer = () => {
  const timerEndSound = new Audio(endSound);
  stopTimer();
  timer.current = timer.end;
  timer.wasAlreadyRunning = false;
  timerEndSound.play();
  interfaceControl("end");
};

const deleteTimer = () => {
  stopTimer();
  timer.start = null;
  timer.current = null;
  timer.end = null;
  timer.wasAlreadyRunning = false;
  initFields();
  interfaceControl("delete");
};

const timer = {
  id: null,
  duration: null,
  start: null,
  end: null,
  current: null,
  wasAlreadyRunning: false,
};

initFields();

hoursInput.addEventListener("input", (event) => {
  handleInputTime(event, "hours");
});
minutesInput.addEventListener("input", (event) => {
  handleInputTime(event, "minutes");
});
secondsInput.addEventListener("input", (event) => {
  handleInputTime(event, "seconds");
});
timerButtonStart.addEventListener("click", startTimer);
timerButtonStop.addEventListener("click", stopTimer);
timerButtonDelete.addEventListener("click", deleteTimer);
timerButtonReset.addEventListener("click", resetTimer);
