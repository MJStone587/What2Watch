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
const posters = document.querySelectorAll(".individual_posters");

// functions for opening and closing all modals and overlays
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
/* add event listener to open modal for each btn*/
for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", () => {
    openModal();
    console.log(btn[i].id);
  });
}

/* When clicking close button close modals and overlays */
btnClose.addEventListener("click", () => {
  closeModal();
});

const populateCont2 = function () {
  fetch("movieDB.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (var i = 0; i < 4; i++) {}
    });
};
populateCont2();
