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

/* Generate Random Number based on length of api array length */
const randomNum = function (data) {
  return Math.floor(Math.random() * data.movies.length);
};

/* Populate Container 2 with data from API */
const populateCont2 = function (data) {
  for (var i = 0; i < 4; i++) {
    const posterImg = document.querySelectorAll(".poster_img");
    const h1 = document.querySelectorAll(".poster_h1");
    const h2 = document.querySelectorAll(".poster_h2");
    const h3 = document.querySelectorAll(".poster_h3");
    posterImg[i].src = data.movies[i].poster;
    h1[i].innerHTML = data.movies[i].title;
    h2[i].innerHTML = data.movies[i].director;
    h3[i].innerHTML = data.movies[i].released;
  }
};
// functions for opening modal
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
/* function to close modal */
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

/* Close modal when clicking overlay or close button */
window.addEventListener("click", function (event) {
  if (event.target == overlay || event.target == btnClose) {
    closeModal();
  }
});
const modalMoreInfo = (data) => {
  console.log(btn.id);
};

/* Fetch Data from API */
const fetchData = function () {
  fetch("movieDB.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      populateCont2(data);
      let getNum = randomNum(data);
    });
};
fetchData();
