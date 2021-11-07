"use strict";

const navButtons = document.querySelectorAll(".nav__button");
const navPages = document.querySelectorAll(".nav__page");
const regex = /\d+$/g;

const removeActive = () => {
  navButtons.forEach((button) => {
    if (button.classList.contains("nav__button_active")) {
      button.classList.remove("nav__button_active");
    }
  });
  navPages.forEach((page) => {
    if (page.classList.contains("nav__page_active")) {
      page.classList.remove("nav__page_active");
    }
  });
};

const addActive = (button) => {
  navPages.forEach((page) => {
    const pageId = page.id.match(regex).toString();
    const buttonId = button.id.match(regex).toString();

    if (pageId === buttonId) {
      button.classList.add("nav__button_active");
      page.classList.add("nav__page_active");
    }
  });
};

const switchPages = (button) => {
  removeActive();
  addActive(button);
};

navButtons.forEach((button) =>
  button.addEventListener("click", (event) => switchPages(event.target))
);
