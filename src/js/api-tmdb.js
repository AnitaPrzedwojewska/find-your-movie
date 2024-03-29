import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'c4a1a601044e07d1317cdc7a5a610d93';
const AUTHORIZATION =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGExYTYwMTA0NGUwN2QxMzE3Y2RjN2E1YTYxMGQ5MyIsInN1YiI6IjY1ZDI3MGEwNGJjMzhiMDE3MDU0NDZkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ORxI6_6HPJevgkEWPjECtsf0C8jWV9cvINuU4auf04c';

const LANGUAGE = 'en-US';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: AUTHORIZATION,
  },
};

// Genres
export async function fetchGenres() {
  const endpointUrl = 'genre/movie/list';
  const searchParams = new URLSearchParams({
    language: 'en',
  });
  const url = new URL(`${BASE_URL}${endpointUrl}?${searchParams}`);

  const response = await axios.get(url, options);
  // console.log('fetchGenres response: ', response);
  return response.data;
}

export const GENRES_LIST = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

// Posters
export async function getPoster(posterUrl) {
  const url = `POSTERS_URL${posterUrl}`;
  const response = await axios(url, options);
  return response.data;
}

// Trending:
export async function fetchTrendingMovies(pageNo) {
  const endpointUrl = 'trending/movie/day';
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: LANGUAGE,
    page: pageNo,
  });
  const url = `${BASE_URL}${endpointUrl}?${searchParams}`;
  const response = await axios(url, options);
  return response.data;
}

// Search
export async function fetchSearchedMovies(keywords, pageNo) {
  const endpointUrl = 'search/movie';
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    query: keywords,
    include_adult: false,
    language: LANGUAGE,
    page: pageNo,
  });
  const url = `${BASE_URL}${endpointUrl}?${searchParams}`;
  const response = await axios(url, options);
  return response.data;
}

// Movie Details
export async function fetchMovieDetails(movieId) {
  const endpointUrl = 'movie';
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: LANGUAGE,
  });
  const url = `${BASE_URL}${endpointUrl}/${movieId}?${searchParams}`;
  const response = await axios(url, options);
  return response.data;
}

// Movie Trailer
export async function fetchMovieTrailers(movieId) {
  const endpointUrl = 'movie';
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: LANGUAGE,
  });
  const url = `${BASE_URL}${endpointUrl}/${movieId}/videos?${searchParams}`;
  const response = await axios(url, options);
  return response.data;
}
