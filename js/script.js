"use strict";

const headerLists = document.querySelector(".header__lists");
const headergGreet = document.querySelectorAll(".header__greets");

// Link highlite style___
const heandalLinks = function (e) {
  e.preventDefault();
  if (e.target.classList.contains("header__link")) {
    const link = e.target;
    const siblings = link
      .closest(".header__lists")
      .querySelectorAll(".header__link");
    siblings.forEach((l) => {
      if (l !== link) {
        l.style.opacity = this;
      }
    });
  }
};

headerLists.addEventListener("mouseover", heandalLinks.bind(0.4));
headerLists.addEventListener("mouseout", heandalLinks.bind(1));

// HEADER CONTENT -----------------------

let value = 0;
var interval = setInterval(() => {
  headergGreet[value].style.marginTop = "0";
  if (value < headergGreet.length) value++;
  else value = 0;
}, 300);

setTimeout(() => {
  clearInterval(interval);
}, 1800);
