// Function to simplify selecting elements using CSS selectors
const selectElement = (selector) => document.querySelector(selector);

// DOM Element Variables
const submitButton = selectElement("button"),
  searchInput = selectElement("#inputBox"),
  moviesContainer = selectElement(".movieList"),
  detailcardBox = selectElement("#detailBox"),
  quitDetailList = selectElement("#detailBox > span a"),
  detailsBox = selectElement(".moviedetailsBox"),
  favoriteButton = selectElement(".favoriteBtn"),
  favoritecardBox = selectElement("#favoriteBox"),
  quitFavoriteList = selectElement("#favoriteBox > span a"),
  // Defining the Callback Function for opening favorite box, and closing favorite box abnd details card
  showFavoritecardBox = () => {favoritecardBox.classList.add("active")},
  showQuitfavoriteList = () => {favoritecardBox.classList.remove("active")},
  showQuitdetailcardBox = () => {detailcardBox.classList.remove("active")};

// Event Listeners for Opening and Closing Favorite List box
favoriteButton.addEventListener("click", showFavoritecardBox);
quitFavoriteList.addEventListener("click", showQuitfavoriteList);
quitDetailList.addEventListener("click", showQuitdetailcardBox);

// Function to fetch and display movies based on user input
const displaySearchResults = async (e) => {
  const url = `https://www.omdbapi.com/?i=tt3896198&apikey=d5b992d0&s=${searchInput.value}&page=1`;
  const fetchedData = await (await fetch(url)).json();
  moviesContainer.innerHTML = "";

  // Loop through the search results and create movie elements
  for (const { Title, Year, Poster } of fetchedData.Search) {
    const movieBox = document.createElement("div");
    movieBox.classList.add("movie-box");
    movieBox.innerHTML = `
        <img src=${Poster} alt="movie-poster">
        <button class="titleyearBtn">
            <span class="movie-title">${Title}</span>
            <span class="movie-year">${Year}</span>
        </button>`;
    moviesContainer.append(movieBox);
  };
};

// Event Listener for user input to fetch movies
searchInput.addEventListener("keyup", displaySearchResults);

// Array to store favorite movies
let favoriteMovies = [];

// Function to fetch detailed information about a movie
const fetchMovieDetails = async (name, year) =>
  await (await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=d5b992d0&t=${name}&y=${year}&plot=full`)).json();

// Event Listener for click events on moviesContainer to view details
moviesContainer.addEventListener("click", async (event) => {
  // Get the clicked element
  const clickedElement = event.target;
  if (clickedElement.classList.contains("titleyearBtn") || clickedElement.tagName === "IMG" || clickedElement.tagName === "SPAN") {
    // Find the closest ancestor element with the class "movie-box"
    const closestmovieBox = clickedElement.closest(".movie-box");
    // Check if the closestmovieBox element exists
    if (closestmovieBox) {
      // Extract movie details from the closestmovieBox
      const name = closestmovieBox.querySelector(".movie-title").textContent.trim();
      const year = closestmovieBox.querySelector(".movie-year").textContent.trim();
      const movieDetail = { name, year };
      // Activate the detailcardBox by adding the "active" class
      detailcardBox.classList.add("active");
      // Fetch detailed information about the movie using the fetchMovieDetails function
      const movieData = await fetchMovieDetails(movieDetail.name, movieDetail.year);
      // Clear the existing content inside the detailsBox element
      detailsBox.innerHTML = "";
      // Create a new div for displaying movie details
      const detailDiv = document.createElement("div");
      detailDiv.classList.add("movieDetails");
      // Populate the div with HTML content representing the movie details
      detailDiv.innerHTML = `
            <div class="imageContainer">
                <img src="${movieData.Poster}" alt="movie-poster">
                <button class="btn addToFavorite-btn">Add To Favorites List</button>
            </div>
            <div class="movieinfoContainer">
                <h1 class="title">${movieData.Title} <span>${movieData.Year}</span></h1>
              <div class="moviedata">
                <p><b>GENRE :</b> ${movieData.Genre}</p>
                <p><b>RUNTIME :</b> ${movieData.Runtime}</p>
                <p><b>RELEASED DATE :</b> ${movieData.Released}</p>
                <p><b>Country :</b> ${movieData.Country}</p>
                <p><b>ACTORS :</b> ${movieData.Actors}</p>
                <p><b>IMDb Votes :</b> ${movieData.imdbVotes}</p>
                <p><b>IMDb Rating :</b> ${movieData.imdbRating}</p>
                <p><b>DIRECTOR :</b> ${movieData.Director}</p>
                <p><b>BOX OFFICE :</b> ${movieData.BoxOffice}</p>
                <p><b>AWARDS :</b> ${movieData.Awards}</p>
                <p><b>LANGUAGE :</b> ${movieData.Language}</p>
                <p class="plot"><b>PLOT :</b> ${movieData.Plot}</p>
              </div>
            </div>`;
      // Append the created div to the detailsBox element
      detailsBox.append(detailDiv);
      
      // Event Listener for adding movie to favorites
      const addButton = selectElement(".addToFavorite-btn");
      addButton.addEventListener("click", () => (
        isMovieInFavorites(movieData) ? alert("Movie already added in favorites!") : (favoriteMovies.push(movieData), localStorage.favoriteMovies = JSON.stringify(favoriteMovies), updatedFavList())
      ));
    }
  }
});

// Function to check if a movie is already in the favorites list
function isMovieInFavorites(movie) {
  return favoriteMovies.some((favMovie) => favMovie.Title === movie.Title && favMovie.Year === movie.Year);
}

// Function to update the favorite movies list in the UI
function updatedFavList() {
  // Select the container for favorite movies
  const favoriteMovieContainer = selectElement(".favoriteboxContainer");
  // Clear the existing content inside the favoriteMovieContainer
  favoriteMovieContainer.innerHTML = "";
  // Iterate through each movie in the favoriteMovies array
  for (const movie of favoriteMovies) {
    // Create a list item element for each favorite movie
    const favoriteMovieList = document.createElement("li");
    favoriteMovieList.classList.add("listofFavmovies");
    // Populate the list item with HTML content representing the movie details
    favoriteMovieList.innerHTML = `
        <img src="${movie.Poster}" alt="movie-poster">
        <p>${movie.Title} <span>${movie.Year}</span></p>`;
    // Create a delete button element for each favorite movie
    const deleteButton = document.createElement("span");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteButton.classList.add("delete-button");
    // Append the delete button to the favoriteMovieList
    favoriteMovieList.append(deleteButton);
    // Event Listener for deleting a movie from favorites
    deleteButton.addEventListener("click", () => {
      // Find the index of the clicked movie in the favoriteMovies array
      const indexofMovie = favoriteMovies.indexOf(movie);
      // Check if the movie is found in the array
      if (indexofMovie !== -1) {
        // Remove the movie from the favoriteMovies array
        // Create a new array excluding the movie to be removed
        favoriteMovies = favoriteMovies.filter((favMovie, index) => index !== indexofMovie);
        // Update the stored favorite movies in local storage
        localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
        // Recursive call to update the favorite movies list in the UI after deletion
        updatedFavList();
      }
    });
    // Append the favoriteMovieList to the favoriteMovieContainer
    favoriteMovieContainer.append(favoriteMovieList);
  };
  // Update the movie count displayed in the UI
  selectElement("#favoriteCount").textContent = favoriteMovies.length;
}

// Event Listener to show movie details when clicking on a favorite movie
document.addEventListener("click", (event) => event.target.classList.contains("listofFavmovies") && detailcardBox.classList.add("active"));

// Function to retrieve stored favorite movies from local storage
const retrieveStoredFavMovies = () => JSON.parse(localStorage.getItem("favoriteMovies")) || [];
// Event Listener for page load to initialize favorites and update the UI
document.addEventListener("DOMContentLoaded", () => {
  favoriteMovies = retrieveStoredFavMovies();
  updatedFavList();
});