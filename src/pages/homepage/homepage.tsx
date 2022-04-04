import { useState, useEffect } from 'react';
import {
  getTopRatedMovies, getUpcomingMovies, getMovieByGenre, getTrendingMovies,
} from '../../helpers/movieapi';
import Input from '../../components/Input/input';
import Search from '../../components/Search/search';
import Navbar from '../../components/Navbar/navbar';
import MovieList from '../../components/MovieList/movielist';
import * as constants from '../../constants/constants';

interface MovieLists {
  id:number,
  genre_ids:Array<number>,
  original_title:string,
  vote_average:number,
  overview:string,
  poster_path:string
}

function Homepage() {
  const [movieList, setMovieList] = useState<Array<MovieLists>>([]);
  const [movieType, setMovieType] = useState(constants.defaultMovieType);
  const [page, setPage] = useState(constants.defaultPageNumber);
  const [movieListLoading, setMovieListLoading] = useState(true);
  const [seeMoreLoading, setSeeMoreLoading] = useState(false);
  const [gridStyle, setGridStyle] = useState('Multi');
  const [gridTemplateColumn, setGridTemplateColumn] = useState(4);
  const [errorMessage, setErrorMessage] = useState('');
  const [movieGenreId, setMovieGenreId] = useState(-1);

  const handleNavClick = (type:string) => {
    if (type !== movieType) {
      setMovieType(type);
      setMovieListLoading(true);
      setPage(constants.defaultPageNumber);
      setMovieList([]);
    }
  };

  const handleGenreSelection = (genreId:number, genreName:string) => {
    setMovieType(genreName);
    setMovieListLoading(true);
    setMovieGenreId(genreId);
    setPage(constants.defaultPageNumber);
    setMovieList([]);
  };

  useEffect(() => {
    switch (movieType) {
      case 'toprated':
        getTopRatedMovies(page)
          .then((result) => {
            setMovieList([...movieList, ...result]);
            setMovieListLoading(false);
            setSeeMoreLoading(false);
          })
          .catch(() => setErrorMessage("Can't fetch top rated movies! Please reload page!"));
        break;
      case 'upcoming':
        getUpcomingMovies(page)
          .then((result) => {
            setMovieList([...movieList, ...result]);
            setMovieListLoading(false);
            setSeeMoreLoading(false);
          })
          .catch(() => setErrorMessage("Can't fetch upcoming movies! Please reload page!"));
        break;
      case 'Genre':
        getMovieByGenre(page, movieGenreId)
          .then((result) => {
            setMovieList([...movieList, ...result.results]);
            setMovieListLoading(false);
            setSeeMoreLoading(false);
          })
          .catch(() => setErrorMessage("Can't fetch your requested movies! Please reload page!"));
        break;
      default:
        getTrendingMovies(page)
          .then((result) => {
            setMovieList([...movieList, ...result]);
            setMovieListLoading(false);
            setSeeMoreLoading(false);
          })
          .catch(() => setErrorMessage("Can't fetch trending movies! Please reload page!"));
    }
  }, [movieType, movieGenreId, page]);

  return (
    <>
      <Input />
      <Search
        movieBackgroundImage={constants.defaultBackgroundImage}
        searchMovieLoading={false}
      />
      <Navbar
        handleNavigation={handleNavClick}
        handleGenre={handleGenreSelection}
        handleGridStyle={(gridStyles:string, gridColumnNumber:number) => {
          setGridStyle(gridStyles);
          setGridTemplateColumn(gridColumnNumber);
        }}
      />
      <MovieList
        movieList={movieList}
        gridStyle={gridStyle}
        gridTemplateColumn={gridTemplateColumn}
        errorMessage={errorMessage}
        setMoviePage={() => {
          setPage(page + 1);
          setSeeMoreLoading(true);
        }}
        listLoading={movieListLoading}
        loadingMore={seeMoreLoading}
      />
    </>
  );
}

export default Homepage;
