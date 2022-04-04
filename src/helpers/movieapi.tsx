import * as constants from '../constants/constants';

export const getMovieDetails = async (movieId:number) => {
  const response = await fetch(`${constants.baseUrl}movie/${movieId}?api_key=${constants.apiKey}`, {
    mode: 'cors',
    method: 'GET',
  });
  const data = await response.json();
  return data;
};

export const getSimilarMovies = async (pageNumber:number, movieId:number) => {
  const response = await fetch(`${constants.baseUrl}movie/${movieId}/similar?api_key=${constants.apiKey}&page=${pageNumber}`, {
    mode: 'cors',
    method: 'GET',
  });
  const data = await response.json();
  return data.results;
};

export const getSearchedMovie = async (movieName:string, pageNumber:number) => {
  const response = await fetch(`${constants.searchMovieUrl}${movieName}&page=${pageNumber}`, {
    mode: 'cors',
    method: 'GET',
  });
  const data = await response.json();
  return data.results;
};
export const getTopRatedMovies = async (pageNumber:number) => {
  const response = await fetch(`${constants.topRatedMovieUrl}+${pageNumber}`, {
    mode: 'cors',
    method: 'GET',
  });
  const data = await response.json();
  return data.results;
};

export const getTrendingMovies = async (pageNumber:number) => {
  const response = await fetch(`${constants.trendingMovieUrl}+${pageNumber}`, {
    mode: 'cors',
    method: 'GET',
  });
  const data = await response.json();
  return data.results;
};

export const getUpcomingMovies = async (pageNumber:number) => {
  const response = await fetch(`${constants.upcomingMovieUrl}+${pageNumber}`, {
    mode: 'cors',
    method: 'GET',
  });
  const data = await response.json();
  return data.results;
};

export const getMovieByGenre = async (pageNumber:number, genreId:number) => {
  const response = await fetch(`${constants.searchMovieByGenreUrl}+${genreId}&page=${pageNumber}`, {
    mode: 'cors',
    method: 'GET',
  });
  const data = await response.json();
  return data;
};

export const getTrailer = async (movieId:number) => {
  const response = await fetch(`${constants.movieVideoUrl}+${movieId}/videos?api_key=${constants.apiKey}`, {
    mode: 'cors',
    method: 'GET',
  });
  const data = await response.json();
  return data;
};
