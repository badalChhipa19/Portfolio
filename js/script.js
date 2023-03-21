"use strict";

const headerLists = document.querySelector(".header__lists");
const headergGreet = document.querySelectorAll(".header__greets");
const sectionNode = document.querySelectorAll(".section");
const skillGraph = document.querySelectorAll(".skill__graph");
const header = document.querySelector(".header");
const headerNav = document.querySelector(".header__nav");
const goToTop = document.querySelector(".up__arr");
const eduBtn = document.querySelectorAll(".education__btn");
const eduContent = document.querySelectorAll(".education__content");
const certificateImg = document.querySelectorAll(".certificate__img");
const certificateContent = document.querySelectorAll(".certificate__content");
const inputBox = document.querySelectorAll(".contact__input_box");
const submitBtn = document.querySelector(".contact__submit");

const [...section] = sectionNode;

// Navigation Hover efficts////////////////////////////////////////////////////////////////
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

// Section disclose////////////////////////////////////////////////////////////////
const reveal = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.style.transition = "all .8s";
  entry.target.classList.remove("section__hidden");
};

const sectionReveal = new IntersectionObserver(reveal, {
  root: null,
  threshold: 0.3,
});

section.forEach((e) => {
  sectionReveal.observe(e);
  e.classList.add("section__hidden");
});

// SKILL ANIMATION**************************************************************
const skillAni = function (entries) {
  const [entery] = entries;
  if (!entery.isIntersecting) return;
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
      let time = 1500 / start;
      startAnimation(start, graph, time, value);
      num++;
    } else {
      clearInterval(a);
    }
  }, 10);
};

const skillAnimation = new IntersectionObserver(skillAni, {
  root: null,
  threshold: 0.5,
});

skillAnimation.observe(section[1]);

// Navigation go off in footer**************************************************************

const navigationGoOff = function (entries) {
  const [entery] = entries;
  if (entery.isIntersecting) {
    headerNav.style.position = "relative";
  } else {
    headerNav.style.position = "fixed";
  }
};

const navOnFooter = new IntersectionObserver(navigationGoOff, {
  root: null,
  threshold: 0.2,
});

navOnFooter.observe(section.at(-1));

// NAVIGATIONS SHOWING////////////////////////////////////////////////////////////////
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

// REVEAL EDUCATION////////////////////////////////////////////////////////////////
let btnCount = 0;
eduContent[0].classList.remove("u__reveal_not");
eduBtn[0].setAttribute("name", "remove-outline");
eduBtn.forEach((btn, i) => {
  btn.addEventListener("click", function (e) {
    // Hide all other content
    eduContent.forEach((e) => e.classList.add("u__reveal_not"));

    // Menipulate all other btns
    eduBtn.forEach((b) => b.setAttribute("name", "add-outline"));

    // Menipulate Btn
    e.target.setAttribute("name", "remove-outline");

    // Reveal content
    const targetParent = e.target.closest(".education__detail");
    targetParent.children[1].classList.remove("u__reveal_not");
  });
});

// Certificate carousel////////////////////////////////////////////////////////////////

let carousel;

const carouselFun = function () {
  let imgCount = 0;
  let carouselLength = certificateImg.length;
  carousel = setInterval(() => {
    if (imgCount < carouselLength - 1) {
      certificateImg.forEach((img) => {
        img.style.transition = "all .8s";
        img.style.transform = `translateX(-${120 * (imgCount + 1)}%)`;
      });

      imgCount++;
    } else {
      imgCount = 0;
      certificateImg.forEach((i) => {
        i.style.transition = "all 0s";
        i.style.transform = "translateX(0%)";
      });
    }
  }, 3000);
};
carouselFun();

// Hover condition on certificate
certificateContent.forEach((content, index) => {
  // MOUSE OVER CERTIFICATE
  content.addEventListener("mouseover", (e) => {
    // 1. stop carousel
    clearInterval(carousel);

    // 2.go to first column
    certificateImg.forEach((i) => {
      i.style.transform = `translateX(-${120 * index}%)`;
    });

    // 3. show current certificate
    certificateImg[index].style.gridRow = "1 / 2";
  });

  // MOUSE OUT CONSITION

  content.addEventListener("mouseout", (e) => {
    carouselFun();
  });
});

// Input validation////////////////////////////////////////////////////////////////

let inputCount = 0;

submitBtn.addEventListener("click", function () {
  inputBox.forEach((input) => {
    input.value.length < 3 || alert("Enter valid Details");
  });
});
