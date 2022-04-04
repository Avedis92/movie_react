import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './moviecard.module.scss';
import MovieCardMouseOver from '../MovieCardMouseOver/moviecardmouseover';
import ModalOpener from '../ModalOpener/modalopener';
import * as constants from '../../constants/constants';

function MovieCard({
  id, genreIds, title, voteAverage, overview, posterPath,
}:Card) {
  const allgenre = useSelector((state:RootState) => state.genre);
  const [movieCardVisibility, setMovieCardVisibility] = useState(true);
  const [viewInfoIsClicked, setViewInfoIsClicked] = useState(false);
  const movieGenre:Array<Genre> = allgenre.entities.length > 0 ? genreIds.map(
    (myid:number) => allgenre.entities.find((genre:Genre) => genre.id === myid),
  ) : [];
  const {
    container, movieItem, movieInfo, titleAndGenres, votesAverage,
  } = styles;
  return (

    <div className={container} onMouseLeave={() => setMovieCardVisibility(true)}>
      {!viewInfoIsClicked
        ? (
          <div className={movieItem}>
            {movieCardVisibility ? (
              <img
                src={posterPath !== `${constants.postPathUrl}null` ? posterPath : constants.defaultBackgroundImage}
                alt={title}
                onMouseOver={() => setMovieCardVisibility(false)}
              />
            )
              : (
                <ModalOpener
                  handleViewInfoClick={() => setViewInfoIsClicked(true)}
                  backgroundImage={posterPath}
                  movieId={id}
                />
              )}
            <div className={movieInfo}>
              <div className={titleAndGenres}>
                <h3 data-testid="movieTitle">{title}</h3>
                {allgenre.entities.length > 0 ? movieGenre.map((eachGenre:Genre) => (
                  <h4 key={eachGenre.id}>
                    {eachGenre.name}
                    {' '}
                  </h4>
                )) : null}
              </div>
              <div className={votesAverage}>
                <p>{voteAverage}</p>
              </div>
            </div>
          </div>
        )
        : (
          <MovieCardMouseOver
            key={id}
            id={id}
            title={title}
            voteAverage={voteAverage}
            overview={overview}
            posterPath={posterPath !== `${constants.postPathUrl}null` ? posterPath : constants.defaultBackgroundImage}
            handleClicks={() => {
              setViewInfoIsClicked(false);
              setMovieCardVisibility(true);
            }}
          />
        )}
    </div>
  );
}
export default MovieCard;
