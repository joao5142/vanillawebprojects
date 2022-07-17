const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");

const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;
const moviesList = [
  "./assets/images/avengers.jpg",
  "./assets/images/joker.jpg",
  "./assets/images/toy.jpg",
  "./assets/images/lion.jpg",
];

populateUi();
//Get data from localstorage and populate UI

function populateUi() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats && selectedSeats.length > 0) {
    selectedSeats.forEach((index) => {
      seats[index].classList.add("selected");
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  const selectedMoviePrice = localStorage.getItem("selectedMoviePrice");

  if (selectedMovieIndex) {
    movieSelect.selectedIndex = selectedMovieIndex;
    setBackground(selectedMovieIndex);
  }
  if (selectedMoviePrice) {
  }
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  //  Copy selected sets into arr
  //  Map through array
  //  Return a new array index

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//Set Background when select is change
function setBackground(index) {
  let movieBackground = moviesList[index];
  document.body.style.backgroundImage = `url(${movieBackground})`;
}
//Seat Click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

//Select change event
movieSelect.addEventListener("change", (e) => {
  let selectValue = e.target.value;
  ticketPrice = +selectValue;

  let selectedIndex = e.target.selectedIndex;

  setBackground(selectedIndex);
  setMovieData(selectedIndex, selectValue);
  updateSelectedCount();
});

//Inicial count and total set
updateSelectedCount();
