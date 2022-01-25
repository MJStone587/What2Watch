"use strict";
// variables
const overlay = document.querySelector(".overlay");
const btnClose = document.querySelector(".btn_close");
const bttn1 = document.querySelector(".btn_movie1");
const bttn2 = document.querySelector(".btn_movie2");
const bttn3 = document.querySelector(".btn_movie3");
const bttn4 = document.querySelector(".btn_movie4");
const btn = document.querySelectorAll(".btn");
const modal = document.querySelector(".modal");

// functions for opening and closing all modals and overlays
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btn,
  addEventListener("click", () => {
    openModal();
  });
btn.forEach((el) => console.log(el.id));

const btnFnct = (btn) => {
  if (btn == bttn1) {
    console.log("btn 1 clicked");
  } else if (btn == bttn2) {
    console.log("btn2 clicked");
  } else if (btn == bttn3) {
    console.log("btn3 clicked");
  }
};
bttn1.addEventListener("click", () => {
  openModal();
});

/* When clicking close button close modals and overlays */
btnClose.addEventListener("click", () => {
  closeModal();
  console.log(modal.classList);
  console.log("close button clicked");
});

fetch("movieDB.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    console.log(data.movies[0].cast);
  });
