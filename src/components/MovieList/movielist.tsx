import MovieCard from '../MovieCard/moviecard';
import HorizontalMovieCard from '../HorizontalMovieCard/horizontalmoviecard';
import ErrorHandler from '../ErrorHandler/errorhandler';
import Loader from '../Loader/loader';
import styles from './movielist.module.scss';
import * as constants from '../../constants/constants';

interface MovieLists {
  id:number,
  genre_ids:Array<number>,
  original_title:string,
  vote_average:number,
  overview:string,
  poster_path:string
}
function MovieList({
  movieList, gridStyle, gridTemplateColumn, errorMessage, setMoviePage, listLoading, loadingMore,
}:{movieList:Array<MovieLists>, gridStyle:string, listLoading:boolean, loadingMore:boolean, gridTemplateColumn:number, errorMessage:string, setMoviePage:()=>void}) {
  const {
    movieListContainer, movieGridsContainer, seeMore,
  } = styles;

  return (
    <div className={movieListContainer}>
      {!listLoading ? (
        <div className={movieGridsContainer} style={{ gridTemplateColumns: `repeat(${gridTemplateColumn},1fr)` }}>
          {movieList.length !== 0 && gridStyle === 'Multi' ? movieList.map((myMovies, index) => (
            <MovieCard
              key={index}
              id={myMovies.id}
              genreIds={myMovies.genre_ids}
              title={myMovies.original_title}
              voteAverage={myMovies.vote_average}
              overview={myMovies.overview}
              posterPath={constants.postPathUrl + myMovies.poster_path}
            />
          )) : movieList.length !== 0 && gridStyle === 'Horizontal' ? movieList.map((myMovies, index) => (
            <HorizontalMovieCard
              key={index}
              id={myMovies.id}
              genreIds={myMovies.genre_ids}
              title={myMovies.original_title}
              voteAverage={myMovies.vote_average}
              overview={myMovies.overview}
              posterPath={constants.postPathUrl + myMovies.poster_path}
            />
          )) : <ErrorHandler message={errorMessage} />}
        </div>
      ) : <Loader />}
      {
        loadingMore ? (
          <Loader />)
          : <button className={seeMore} type="button" onClick={() => setMoviePage()}>See More</button>
        }
    </div>
  );
}
export default MovieList;
