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
document.cookie = "username=unknown";
let x = document.cookie;

console.log(x);

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
  const moviesGall = document.querySelector(".moviesGallery");
  const seriesGall = document.querySelector(".seriesGallery");
  const cardArr = [];
  const seriesArr = [];
  for (let x = 0; x < data.movies.length; x++) {
    // FOR SELF LEARNING - newElement additions must be within the loop scope otherwise only creates one instance instead of multiples
    if (data.movies[x].isMovie === 1) {
      const newImg = document.createElement("img");
      newImg.classList.add("movieCard");
      moviesGall.append(newImg);
      newImg.id = data.movies[x].title;
      cardArr.push(newImg);
      newImg.src = data.movies[x].thumbnail;
    } else {
      const newImg = document.createElement("img");
      seriesGall.append(newImg);
      newImg.classList.add("seriesCard");
      newImg.id = data.movies[x].title;
      seriesArr.push(newImg);
      newImg.src = data.movies[x].thumbnail;
    }
  }
  for (let i = 0; i < cardArr.length; i++) {
    cardArr[i].addEventListener(
      "click",
      (event) => (
        (event.target.onclick = openModalMovies()),
        populateMoviesModal(cardArr[i].id, data)
      )
    );
  }
  for (let i = 0; i < seriesArr.length; i++) {
    seriesArr[i].addEventListener(
      "click",
      (event) => (
        (event.target.onclick = openModalMovies()),
        populateMoviesModal(seriesArr[i].id, data)
      )
    );
  }
};

const populateMoviesModal = (id, data) => {
  const modalMoviesTitle = document.querySelector(".movies_modalTitle");
  const modalMoviesReleased = document.querySelector(".movies_modalReleased");
  const modalMoviesRating = document.querySelector(".movies_modalRating");
  const modalMoviesDirector = document.querySelector(".movies_modalDirector");
  const modalMoviesTomato = document.querySelector(".movies_modalTomato");
  const modalMoviesPlot = document.querySelector(".movies_modalPlot");
  const stillsBtn = document.querySelector(".stillsBtn");
  // can use the find() function or filter() for IE browser to produce same results as below
  for (var i = 0, numMovies = data.movies.length; i < numMovies; i++) {
    if (data.movies[i].title == id) {
      modalMoviesTitle.innerHTML = id;
      modalMoviesReleased.innerHTML = "Released: " + data.movies[i].released;
      modalMoviesDirector.innerHTML = "Director: " + data.movies[i].director;
      const tomatoRating = data.movies[i].tomato;
      if (tomatoRating > 50) {
        modalMoviesTomato.innerHTML =
          "Tomato: " + data.movies[i].tomato + "% " + "🍅";
      } else if (tomatoRating <= 50) {
        modalMoviesTomato.innerHTML =
          "Tomato: " + data.movies[i].tomato + "% " + "🟢";
      }
      modalMoviesRating.innerHTML =
        "IMDB Rating: " + data.movies[i].imdb + "⭐";
      modalMoviesPlot.innerHTML =
        "<strong>Plot: </strong>" + data.movies[i].synopsis;
      //POPULATE STILLS PAGE HERE IN FUTURE
    }
  }
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

// function to display or hide current tab of movies or series on movies.html
const moviesTab = document.querySelector(".moviesContainer1_moviesTab");
const seriesTab = document.querySelector(".moviesContainer1_seriesTab");
const seriesGallery = document.querySelector(".seriesGallery");
const moviesGallery = document.querySelector(".moviesGallery");

if (
  window.location.href === "http://127.0.0.1:5501/movies.html" ||
  window.location.href === "https://mjstone587.github.io/What2Watch/movies.html"
) {
  moviesTab.addEventListener("click", function () {
    seriesTab.style.color = "rgb(143, 10, 10)";
    moviesTab.style.color = "red";
    moviesTab.style.borderTop = "1px solid red";
    moviesTab.style.borderLeft = "1px solid red";
    moviesTab.style.borderRight = "1px solid red";
    seriesTab.style.borderLeft = "1px solid rgb(143, 10, 10)";
    seriesTab.style.borderRight = "1px solid rgb(143, 10, 10)";
    seriesTab.style.borderTop = "1px solid rgb(143, 10, 10)";
    seriesGallery.style.display = "none";
    moviesGallery.style.display = "flex";
  });
  seriesTab.addEventListener("click", function () {
    seriesTab.style.color = "red";
    moviesTab.style.color = "rgb(143, 10, 10)";
    seriesTab.style.borderLeft = "1px solid red";
    seriesTab.style.borderRight = "1px solid red";
    seriesTab.style.borderTop = "1px solid red";
    moviesTab.style.borderTop = "1px solid rgb(143, 10, 10)";
    moviesTab.style.borderLeft = "1px solid rgb(143, 10, 10)";
    moviesTab.style.borderRight = "1px solid rgb(143, 10, 10)";
    moviesGallery.style.display = "none";
    seriesGallery.style.display = "flex";
  });
}
