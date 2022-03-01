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
const stillsBtn = document.querySelector(".stillsBtn");
const stillsDiv = document.querySelector(".stills");

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
  }
});
/* For movies.html Populate all poster images on display */
const populateMovies = (data) => {
  const posterContainer = document.querySelector(".movieGallery");
  const seriesGall = document.querySelector(".seriesGallery");
  const cardArr = [];
  const seriesArr = [];
  for (let i = 0; i < data.movies.length; i++) {
    // FOR SELF LEARNING - newElement additions must be within the loop scope otherwise only creates one instance instead of multiples
    if (data.movies[i].isMovie === 1) {
      const newDiv = document.createElement("div");
      const newImg = document.createElement("img");
      posterContainer.append(newDiv);
      newDiv.classList.add("movieCard");
      newDiv.append(newImg);
      cardArr.push(newDiv);
      const movieCard = document.querySelector(".movieCard");
      movieCard.id = i;
      newImg.src = data.movies[i].thumbnail;
    } else {
      const newDiv = document.createElement("div");
      const newImg = document.createElement("img");
      seriesGall.append(newDiv);
      newDiv.classList.add("seriesCard");
      newDiv.append(newImg);
      seriesArr.push(newDiv);
      const seriesCard = document.querySelector(".seriesCard");
      seriesCard.id = i;
      newImg.src = data.movies[i].thumbnail;
    }
  }
  for (let i = 0; i < cardArr.length; i++) {
    cardArr[i].firstChild.addEventListener(
      "click",
      (event) => (
        (event.target.onclick = openModalMovies()), populateMoviesModal(i, data)
      )
    ),
      seriesArr[i].firstChild.addEventListener(
        "click",
        (event) => (
          (event.target.onclick = openModalMovies()),
          populateMoviesModal(i, data)
        )
      );
  }
};
// rename some of these functions and clean shit up
const populateMoviesModal = (i, data) => {
  const modalMoviesTitle = document.querySelector(".movies_modalTitle");
  const modalMoviesReleased = document.querySelector(".movies_modalReleased");
  const modalMoviesRating = document.querySelector(".movies_modalRating");
  const modalMoviesDirector = document.querySelector(".movies_modalDirector");
  const modalMoviesTomato = document.querySelector(".movies_modalTomato");
  const modalMoviesPlot = document.querySelector(".movies_modalPlot");
  const stillsBtn = document.querySelector(".stillsBtn");
  modalMoviesTitle.innerHTML = data.movies[i].title;
  modalMoviesReleased.innerHTML = "Released: " + data.movies[i].released;
  modalMoviesDirector.innerHTML = "Director: " + data.movies[i].director;
  modalMoviesTomato.innerHTML = "Tomato Rating: " + data.movies[i].tomato;
  modalMoviesRating.innerHTML = "IMDB Rating: " + data.movies[i].imdb;
  modalMoviesPlot.innerHTML =
    "<strong>Plot: </strong>" + data.movies[i].synopsis;
  stillsBtn.id = i;
};

// function to close modal on movies.html page when clicking outside modal or on close button
const closeMoviesModal = function () {
  window.addEventListener("click", function (event) {
    if (event.target == overlayMovies || event.target == btnCloseMovies) {
      closeModalMovies();
    }
  });
};

/* populate modal on index.html with data of correlating show/movie */
const populateIndexModal = (data) => {
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
      const tomatoRating = data.movies[btn[i].id].tomato;
      openModal();
      modalTitle.innerHTML = data.movies[btn[i].id].title;
      modalReleased.innerHTML = "Released: " + data.movies[btn[i].id].released;
      modalDirector.innerHTML = "Director: " + data.movies[btn[i].id].director;
      if (tomatoRating > 50) {
        modalTomato.innerHTML =
          "Tomato: " + data.movies[btn[i].id].tomato + "% " + "🍅";
      } else if (tomatoRating <= 50) {
        modalTomato.innerHTML =
          "Tomato: " + data.movies[btn[i].id].tomato + "% " + "🟢";
      }
      modalImdb.innerHTML = "IMDB: " + data.movies[btn[i].id].imdb + "⭐ ";
      modalPlot.innerHTML = data.movies[btn[i].id].synopsis;
    });
  }
};

// function to populate stills page with images from each movie clicked on movies.html page
//WIP
const populateStills = (data) => {
  let stillsLen = data.movies[i].stills.length;
  for (let a = 0; a < stillsLen; a++) {
    const newImg = document.createElement("img");
    stillsDiv.appendChild(newImg);
    newImg.src = data.movies[i].stills[a];
  }
};
/* Fetch Data from API */
const fetchData = function () {
  fetch("./database/movieDB.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (
        window.location.href == "http://127.0.0.1:5501/What2Watch/index.html" ||
        window.location.href == "https://mjstone587.github.io/What2Watch/" ||
        window.location.href == "http://127.0.0.1:5501/index.html" ||
        window.location.href ==
          "https://mjstone587.github.io/What2Watch/index.html"
      ) {
        populateCont2(data);
        populateCont3(data);
        populateIndexModal(data);
      } else if (
        window.location.href ==
          "http://127.0.0.1:5501/What2Watch/movies.html" ||
        window.location.href ==
          "https://mjstone587.github.io/What2Watch/movies.html" ||
        window.location.href == "http://127.0.0.1:5501/movies.html"
      ) {
        populateMovies(data);
        closeMoviesModal();
      }
    });
};
fetchData();
