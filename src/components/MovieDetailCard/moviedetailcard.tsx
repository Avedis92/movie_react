import { useState } from 'react';
import ModalVideo from 'react-modal-video';
import TrailerPlayer from '../TrailerPlayer/trailerplayer';
import styles from './moviedetailcard.module.scss';

function MovieDetailCard({
  backdropPath, posterPath, id, movieGenre, title, tagline, runtime, releaseDate, overview,
}:MovieDetails) {
  const [trailerKey, setTrailerKey] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const {
    container, InnerContainer, Infos, posterContainer, movieGenres, movieInfoContainer, movieHeaders, movieOverview, trailerWatch,
  } = styles;

  return (
    <>
      <div className={container} style={{ backgroundImage: `url(${backdropPath})` }}>
        {isOpen
          ? (
            <ModalVideo
              channel="youtube"
              isOpen={isOpen}
              videoId={trailerKey}
              onClose={() => setIsOpen(false)}
            />
          )
          : null}
        <div className={InnerContainer}>
          <div className={Infos}>
            <div className={posterContainer}>
              <img src={posterPath!} alt={title!} />
            </div>
            <div className={movieInfoContainer}>
              <div className={movieHeaders}>
                <h1>{title}</h1>
                {tagline ? <h2>{tagline}</h2> : null}
                <div className={movieGenres}>
                  {movieGenre.map((myMovieGenre:Genre) => (
                    <h2 key={myMovieGenre.id}>
                      {myMovieGenre.name}
                      {'  '}
                      {'  '}
                    </h2>
                  ))}
                </div>
                <p>
                  {runtime}
                  min
                </p>
                <p>
                  {releaseDate}
                </p>
              </div>
              <p className={movieOverview}>{overview}</p>
              <div className={trailerWatch}>
                <TrailerPlayer
                  movieId={id}
                  buttonType="watchNowButton"
                  openMovieTrailers={(key) => {
                    if (key !== '-1') {
                      setTrailerKey(key);
                      setIsOpen(true);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
export default MovieDetailCard;
