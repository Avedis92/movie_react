import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Input from '../../components/Input/input';
import Search from '../../components/Search/search';
import MovieList from '../../components/MovieList/movielist';
import GridStyleChanger from '../../components/GridStyleChanger/gridstylechanger';
import * as constants from '../../constants/constants';
import { getSearchedMovie } from '../../helpers/movieapi';
import styles from './searchpage.module.scss';

interface MovieLists {
  id:number,
  genre_ids:Array<number>,
  original_title:string,
  vote_average:number,
  overview:string,
  poster_path:string,
  backdrop_path:string
}

function SearchPage() {
  const { search } = useLocation();
  const movieTitle = new URLSearchParams(search).get('searchedMovie');
  const [errorMessage, setErrorMessage] = useState('');
  const [gridStyle, setGridStyle] = useState('Multi');
  const [movieLoading, setMovieLoading] = useState(true);
  const [seeMoreLoading, setSeeMoreLoading] = useState(false);
  const [gridTemplateColumn, setGridTemplateColumn] = useState(4);
  const [movieList, setMovieList] = useState<Array<MovieLists>>([]);
  const [page, setPage] = useState(constants.defaultPageNumber);
  const {
    Container, titleAndGridStyle,
  } = styles;

  useEffect(() => {
    if (movieTitle) {
      getSearchedMovie(movieTitle, constants.defaultPageNumber)
        .then((result) => {
          setMovieList([...result]);
          setMovieLoading(false);
        })
        .catch(() => setErrorMessage("Couldn't fetch the searched movie! Please try reloading the page!"));
    }
    if (movieTitle && page > constants.defaultPageNumber) {
      getSearchedMovie(movieTitle, page)
        .then((result) => {
          setMovieList([...movieList, ...result]);
          setSeeMoreLoading(false);
        })
        .catch(() => setErrorMessage("Couldn't load more searched movies! Please try reloading the page!"));
    }
  }, [movieTitle, page]);

  return (
    <div className={Container}>
      <Input
        setupMoviePage={() => {
          setPage(constants.defaultPageNumber);
          setMovieLoading(true);
        }}
      />
      {movieList.length > 0 ? (
        <>
          <Search
            movieId={movieList[0].id}
            originalTitle={movieList[0].original_title}
            movieBackgroundImage={constants.postPathUrl + movieList[0].backdrop_path}
            genreList={movieList[0].genre_ids}
            movieOverview={movieList[0].overview}
            movieVoteAverage={movieList[0].vote_average}
            searchMovieLoading={movieLoading}
          />
          <div className={titleAndGridStyle}>
            <h1>Searched Movies:</h1>
            <GridStyleChanger
              changeGridStyle={(gridStyles:'Horizontal'|'Multi', gridColumns:number) => {
                setGridStyle(gridStyles);
                setGridTemplateColumn(gridColumns);
              }}
            />
          </div>
          <MovieList
            movieList={movieList}
            gridStyle={gridStyle}
            gridTemplateColumn={gridTemplateColumn}
            errorMessage={errorMessage}
            setMoviePage={() => {
              setPage(page + 1);
              setSeeMoreLoading(true);
            }}
            listLoading={movieLoading}
            loadingMore={seeMoreLoading}
          />
        </>
      ) : (
        <Search
          movieBackgroundImage={constants.pageNotFoundBackgroundImage}
          searchMovieLoading={false}
        />
      ) }
    </div>
  );
}
export default SearchPage;
