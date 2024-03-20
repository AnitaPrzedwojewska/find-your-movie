import {
  GENRES_LIST,
  getPoster,
  fetchTrendingMovies,
  fetchSearchedMovies,
  fetchMovieDetails,
  fetchMovieTrailers,
} from './api-tmdb';

import {
  formEl,
  searchEl,
  galleryEl,
  galleryTitleEl,
  searchedWords,
  keywords,
  moviesOnScreen,
  page,
  pages,
  results,
} from './refs';

import { handleMovieClick } from './modals';

// console.log('search: ', search);

// const POSTERS_URL = 'https://image.tmdb.org/t/p/w500/'; png
const POSTERS_URL = 'https://image.tmdb.org/t/p/original/'; // jpg

// tworzy listę odpowiadających gatunków filmowych
function getGenres(ids, genres) {
  let matchGenres = [];
  ids.forEach(id => {
    matchGenres.push(genres.find(genre => genre.id === id).name);
  });
  return matchGenres.length === 0
    ? '[genres-not-found]'
    : matchGenres.join(`, `);
}

// czyści galerię
function newGallery() {
  moviesGallery.innerHTML = '';
}

// const buildGallery = (moviesArray, galleryElement) => {};

// generuje kod HTML galerii z podanymi filmami
async function showGallery(moviesArray, galleryElement) {
  // get genres from API TMDB
  // const allGenres = await fetchGenres();
  // const allGenres = GENRES_LIST;
  console.log('moviesArray: ', moviesArray);

  const galleryItems = moviesArray.map(
    ({
      id,
      poster_path,
      title,
      release_date,
      genre_ids,
      original_title,
      vote_average,
      popularity,
      vote_count,
      overview,
    }) => {
      const poster = `${POSTERS_URL}${poster_path}`;
      const genres = getGenres(genre_ids, GENRES_LIST);
      const year = release_date.substring(0, 4);
      return `
  <li class="mov-gallery-card" data-id="${id}" mod-details-open>
    <div href="" class="mov-gallery-movie-link link" id=${id}>
      <div class="movie-details"
        data-id="${id}"
        data-poster_path="${poster}"
        data-title="${title}"
        data-genre_ids="${genres}"
        data-original_title="${original_title}"
        data-vote_average="${vote_average}"
        data-popularity="${popularity}"
        data-vote_count="${vote_count}"
        data-overview="${overview}"
        data-release_date="${release_date}">
      </div>
      <div class="mov-gallery-poster">
        <img src=${poster} alt="Poster of film: ${title}">
      </div>
      <div class="mov-gallery-info">
        <p class="mov-gallery-title">${title}</p>
        <p class="mov-gallery-txt">${genres} | ${year}</p>
      </div>
    </div>
  </li>`;
    }
  );
  const galleryAll = galleryItems.join('');
  galleryElement.insertAdjacentHTML('beforeend', galleryAll);
}

const getMoviesData = moviesArray => {
  const result = moviesArray.map(
    ({
      id,
      poster_path,
      title,
      release_date,
      genre_ids,
      original_title,
      vote_average,
      popularity,
      vote_count,
      overview,
    }) => ({
      id,
      poster_path,
      title,
      release_date,
      genre_ids,
      original_title,
      vote_average,
      popularity,
      vote_count,
      overview,
    })
  );
  console.log('result of getMoviesData: ', result);
  return result;
};

// ================================================== showTrendingMovies
// wyświetla galerię popularnych filmów
export async function showTrendingMovies() {
  try {
    console.log('showTrendingMovies starts...');
    newGallery();
    let pageNo = 1;
    const moviesList = await fetchTrendingMovies(pageNo);
    const pages = moviesList.total_pages > 500 ? 500 : moviesList.total_pages;
    // console.log('pages: ', pages);
    const results =
      moviesList.total_results > 1000 ? 1000 : moviesList.total_results;
    // console.log('results: ', results);
    // console.log('moviesList.results: ', moviesList.results);
    let moviesOnScreen = getMoviesData(moviesList.results);
    console.log('moviesOnScreen: ', moviesOnScreen);
    galleryTitleEl.innerHTML = 'Trending movies';
    showGallery(moviesOnScreen, galleryEl);

    handleMovieClick();
    //addEventListener for get more movies
  } catch (error) {
    console.log(error);
  }
}

// ================================================== showSearchedMovies
// wyświetla galerię wyszukiwanych filmów
// export async function showSearchedMovies() {
//   try {
//     console.log('showSearchedMovies starts...');
//     newGallery();
//     searchedWords = searchEl.value;
//     console.log('searchedWords: ', searchedWords);
//     formEl.reset();
//     const keywords = searchedWords.toLowerCase().split(' ').join('+');
//     page = 1;
//     const moviesList = await fetchSearchedMovies(keywords, page);
//     const pages = moviesList.total_pages;
//     const results = moviesList.total_results;
//     const movies = moviesList.results;
//     galleryTitleEl.innerHTML = `Searched movies - we found ${results} movies with "${searchedWords}"`;
//     showGallery(moviesList.results, galleryEl);

//     // addEventListener for get more movies
//   } catch (error) {
//     console.log(error);
//   }
// }

// ================================================== showWatched
// export function showWatched() {
//   console.log('showWatched starts...');
// }

// ================================================== showQueue
// export function showQueue() {
//   console.log('showQueue starts...');
// }