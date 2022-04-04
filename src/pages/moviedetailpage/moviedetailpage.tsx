import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getMovieDetails, getSimilarMovies } from '../../helpers/movieapi';
import * as constants from '../../constants/constants';
import Input from '../../components/Input/input';
import MovieDetailCard from '../../components/MovieDetailCard/moviedetailcard';
import MovieList from '../../components/MovieList/movielist';
import GridStyleChanger from '../../components/GridStyleChanger/gridstylechanger';
import Loader from '../../components/Loader/loader';
import styles from './moviedetailpage.module.scss';

interface MovieLists {
  id:number,
  genre_ids:Array<number>,
  original_title:string,
  vote_average:number,
  overview:string,
  poster_path:string
}
interface MovieDetail extends Omit<MovieLists, 'genre_ids'|'vote_average'>{
  backdrop_path:string,
  genres:Array<Genre>,
  tagline:string,
  runtime:number,
  release_date:string,
}

function MovieDetailPage() {
  const { search } = useLocation();
  const movieDetailId = Number(new URLSearchParams(search).get('movieId'));
  const [movieList, setMovieList] = useState<Array<MovieLists>>([]);
  const [gridStyle, setGridStyle] = useState('Multi');
  const [isLoading, setIsLoading] = useState(true);
  const [movieListLoading, setMovieListLoading] = useState(true);
  const [seeMoreLoading, setSeeMoreLoading] = useState(false);
  const [gridTemplateColumn, setGridTemplateColumn] = useState(4);
  const [errorMessage, setErrorMessage] = useState('');
  const [page, setPage] = useState(constants.defaultPageNumber);
  const [myMovie, setMyMovie] = useState<MovieDetail>({
    backdrop_path: '',
    poster_path: '',
    id: movieDetailId,
    genres: [],
    original_title: '',
    tagline: '',
    runtime: -1,
    release_date: '',
    overview: '',
  });
  const {
    pageContainer, titleAndGridStyle,
  } = styles;

  useEffect(() => {
    getMovieDetails(movieDetailId)
      .then((result) => {
        setMyMovie(result);
        setIsLoading(false);
      })
      .catch(() => setErrorMessage("Couldn't fetch your requested movie! Please try reloading the page!"));
    getSimilarMovies(constants.defaultPageNumber, movieDetailId)
      .then((result) => {
        setMovieList([...result]);
        setMovieListLoading(false);
      })
      .catch(() => setErrorMessage("Couldn't fetch similar movies! Please reload page"));
  }, [movieDetailId]);

  useEffect(() => {
    getSimilarMovies(page, movieDetailId)
      .then((result) => {
        setMovieList([...movieList, ...result]);
        setSeeMoreLoading(false);
      })
      .catch(() => setErrorMessage("Couldn't fetch similar movies! Please reload page"));
  }, [page]);

  return (

    <div className={pageContainer}>
      <Input />
      { isLoading === false
        ? (
          <>
            <MovieDetailCard
              backdropPath={myMovie.backdrop_path ? constants.postPathUrl + myMovie.backdrop_path : constants.defaultBackgroundImage}
              posterPath={myMovie.poster_path ? constants.postPathUrl + myMovie.poster_path : null}
              id={myMovie.id}
              movieGenre={myMovie.genres}
              title={myMovie.original_title}
              tagline={myMovie.tagline}
              runtime={myMovie.runtime}
              releaseDate={myMovie.release_date}
              overview={myMovie.overview}
            />
            <div className={titleAndGridStyle}>
              <h1 style={{ color: 'rgb(27, 186, 235)' }}>Watch Similar Movies</h1>
              <GridStyleChanger
                changeGridStyle={(gridStyles:'Horizontal'|'Multi', gridColumns:number) => {
                  setGridStyle(gridStyles);
                  setGridTemplateColumn(gridColumns);
                }}
              />
            </div>
          </>
        ) : <Loader />}
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

    </div>
  );
}
export default MovieDetailPage;
