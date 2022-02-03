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
const btnCloseMovies = document.querySelector(".btn_closeMovies");
const overlayMovies = document.querySelector(".overlayMovies");
const modalMovies = document.querySelector(".modalMovies");

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

/* populate container 3 information with a random movie from api */
const populateCont3 = (data) => {
  const cont3_img = document.querySelector(".cont3-img");
  const cont3_h1 = document.querySelector(".cont3-h1");
  const cont3_p = document.querySelector(".cont3-p");
  const viewMore = document.querySelector(".btn_viewMore");
  const trailer = document.querySelector(".btn_trailer");
  var num = Math.floor(Math.random() * data.movies.length);
  trailer.id = num;
  cont3_img.src = data.movies[num].poster;
  cont3_h1.innerHTML = data.movies[num].title;
  cont3_p.innerHTML = data.movies[num].synopsis;
  viewMore.id = num;
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
// close modal on page movies.html
const closeModalMovies = function () {
  modalMovies.classList.add("hidden");
  overlayMovies.classList.add("hidden");
};
// open modal on page movies.html
const openModalMovies = function () {
  modalMovies.classList.remove("hidden");
  overlayMovies.classList.remove("hidden");
};
/* Close modal when clicking overlay or close button */
window.addEventListener("click", function (event) {
  if (event.target == overlay || event.target == btnClose) {
    closeModal();
    closeModalMovies();
  }
});
/* For movie.html Populate all poster images on display */
const populateMovies = (data) => {
  const posterContainer = document.querySelector(".movieGallery");
  for (let i = 0; i < data.movies.length; i++) {
    // FOR SELF LEARNING - newElement additions must be within the loop otherwise only creates one instead of multiples
    const newDiv = document.createElement("div");
    const newImg = document.createElement("img");
    posterContainer.append(newDiv);
    newDiv.classList.add("movieCard");
    newDiv.id = i;
    newDiv.append(newImg);
    newImg.src = data.movies[i].poster;
  }
};

/* populate modal with data of correlating show/movie */
const populateModal = (data) => {
  const btn = document.querySelectorAll(".btn");
  const modalTitle = document.querySelector(".modal_title");
  const modalReleased = document.querySelector(".modal_released");
  const modalDirector = document.querySelector(".modal_director");
  const modalTomato = document.querySelector(".modal_tomato");
  const modalImdb = document.querySelector(".modal_imdb");
  const modalPlot = document.querySelector(".modal_plot");
  const trailer = document.querySelector(".btn_trailer");
  trailer.href = data.movies[trailer.id].trailer;
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", () => {
      openModal();
      modalTitle.innerHTML = data.movies[btn[i].id].title;
      modalReleased.innerHTML = "Released: " + data.movies[btn[i].id].released;
      modalDirector.innerHTML = "Director: " + data.movies[btn[i].id].director;
      modalTomato.innerHTML = "Tomato Rating: " + data.movies[btn[i].id].tomato;
      modalImdb.innerHTML = "IMDB Rating: " + data.movies[btn[i].id].imdb;
      modalPlot.innerHTML = data.movies[btn[i].id].synopsis;
    });
  }
};

/* Fetch Data from API */
const fetchData = function () {
  fetch("./database/movieDB.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (
        window.location.href == "http://127.0.0.1:5500/What2Watch/index.html" ||
        window.location.href == "https://mjstone587.github.io/What2Watch/" ||
        window.location.href == "http://127.0.0.1:5500"
      ) {
        populateCont2(data);
        populateCont3(data);
        populateModal(data);
      } else if (
        window.location.href ==
          "http://127.0.0.1:5500/What2Watch/movies.html" ||
        window.location.href ==
          "https://mjstone587.github.io/What2Watch/movies.html"
      ) {
        populateMovies(data);
      }
    });
};
fetchData();
