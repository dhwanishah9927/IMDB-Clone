# IMDB-Clone

Host on => https://dhwanishah9927.github.io/IMDB-Clone/

YouTube Presentation Video => https://youtu.be/xr8RiFSmBBI?si=VVzLP1cB88ORDJ5B 

This is a JavaScript web application that allows users to search for movies using the OMDB API and manage a list of favorite movies. The app includes functionality to display search results, view detailed information about each movie, and add/remove movies from the favorites list.
Table of Contents

    Introduction
    Features
    Getting Started
    Usage
    Functionality Overview
    

Introduction

The Movie Search and Favorites Web App is built using HTML, CSS, and JavaScript. It leverages the OMDB API to fetch movie data based on user input and provides an interactive interface for managing favorite movies.
Features

    Search Movies: Users can enter a movie title in the search input, and the app will fetch and display relevant movie results using the OMDB API.

    View Movie Details: Clicking on a movie in the search results will display detailed information about the selected movie, including genre, runtime, release date, and more.

    Add to Favorites: Users can add movies to their favorites list by clicking the "Add to Favorites" button in the detailed movie view.

    Remove from Favorites: Movies in the favorites list can be removed by clicking the delete button associated with each movie.

    Favorites Count: The app displays the count of favorite movies in real-time.

Getting Started

To run the application locally, follow these steps:

            Clone the repository.
        
            Open the index.html file in a web browser.

Usage

            Enter a movie title in the search input to fetch and display relevant movie results.
            Click on a movie to view detailed information.
            In the detailed view, click "Add to Favorites" to add the movie to the favorites list.
            Click on a favorite movie to view its details.
            In the favorites list, click the delete button to remove a movie from the favorites.

Functionality Overview

            Selecting DOM Elements
            
            The selectElement function simplifies selecting DOM elements using CSS selectors.
            
            const selectElement = (selector) => document.querySelector(selector);
            
            Event Listeners
            
            Event listeners are used to handle user interactions, such as opening/closing the favorites list and searching for movies.
            
            Fetching and Displaying Movies
            
            The displaySearchResults function fetches and displays movies based on user input.
            
            Managing Favorites
            
                isMovieInFavorites: Checks if a movie is already in the favorites list.
                updatedFavList: Updates the UI to display the list of favorite movies.
                retrieveStoredFavMovies: Retrieves stored favorite movies from local storage.
            
            Movie Details
            
                The handleMovieClick function handles click events on movies to display detailed information. ((the functionality described as "handleMovieClick" is implemented within the click event listener for the "moviesContainer" element)
                
            Initialization
                
                The initializeApp function sets up the app on page load. (the functionality described as "initializeApp" is implemented within the click event listener for the "DOMContentLoaded" event)
