"use strict";

const headerLists = document.querySelector(".header__lists");
const headergGreet = document.querySelectorAll(".header__greets");
const section = document.querySelectorAll(".section");
const skillGraph = document.querySelectorAll(".skill__graph");
const header = document.querySelector(".header");
const headerNav = document.querySelector(".header__nav");
const goToTop = document.querySelector(".up__arr");

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

// Section disclose
const reveal = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.style.transition = "all .8s";
  entry.target.classList.remove("section__hidden");

  // Skill Design
  const startAnimation = function (x, y, z, a) {
    let startValue = 0;
    let b = setInterval(() => {
      if (startValue <= x) {
        y.style.backgroundImage = `conic-gradient(#766dff, #88f3ff  ${
          3.6 * (startValue - 24)
        }deg,#00bfe7  ${3.6 * (startValue - 18)}deg,#00c1e771 ${
          3.6 * (startValue - 5)
        }deg,#00c1e72f ${3.6 * startValue}deg , transparent 0deg)`;
        a.textContent = `${startValue}%`;
        startValue++;
      } else {
        clearInterval(b);
      }
    }, z);
  };

  let num = 1;
  let size = skillGraph.length;

  let a = setInterval(() => {
    if (num <= size) {
      let start = document.querySelector(`.skill__value--${num}`).textContent;
      let graph = document.querySelector(`.skill__graph--${num}`);
      let value = document.querySelector(`.skill__value--${num}`);
      let time = 2500 / start;
      startAnimation(start, graph, time, value);
      num++;
    } else {
      clearInterval(a);
    }
  }, 10);
};

const sectionReveal = new IntersectionObserver(reveal, {
  root: null,
  threshold: 0.3,
});

section.forEach((e) => {
  sectionReveal.observe(e);
  e.classList.add("section__hidden");
});

// NAVIGATIONS SHOWING
const navHeight = headerNav.getBoundingClientRect().height;
const headerFun = function (entries) {
  let [entery] = entries;
  if (!entery.isIntersecting) {
    // NAVBAR
    headerNav.style.position = "fixed";
    // headerNav.style.top = "2rem";
    // headerNav.style.left = "2rem";
    headerNav.style.width = "100%";
    headerNav.style.zIndex = "2";

    // GO TO TOP
    goToTop.style.transition = "all .3s";
    goToTop.style.bottom = "40%";
    goToTop.style.zIndex = 2;
  } else {
    headerNav.style.position = "relative";
    goToTop.style.right = "5.7%";
    goToTop.style.bottom = "0%";
    goToTop.style.zIndex = -1;
  }
};

const headerObserver = new IntersectionObserver(headerFun, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);
