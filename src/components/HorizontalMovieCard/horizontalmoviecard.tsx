import { useState } from 'react';
import { useSelector } from 'react-redux';
import ModalVideo from 'react-modal-video';
import { RootState } from '../../store/store';
import TrailerPlayer from '../TrailerPlayer/trailerplayer';
import styles from './horizontalmoviecard.module.scss';
import * as constants from '../../constants/constants';

function HorizontalMovieCard({
  id, genreIds, title, voteAverage, overview, posterPath,
}:Card) {
  const [trailerKey, setTrailerKey] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const allgenre = useSelector((state:RootState) => state.genre);
  const movieGenre:Array<Genre> = allgenre.entities.length > 0 ? genreIds.map(
    (myid:number) => allgenre.entities.find((genre:Genre) => genre.id === myid),
  ) : [];
  const {
    container, posterContainer, movieInfoContainer, header, headerTitleAndGenre, voteAverages, movieInfoBody, buttonSection,
  } = styles;
  return (
    <div className={container}>
      {isOpen ? (
        <ModalVideo
          channel="youtube"
          isOpen={isOpen}
          videoId={trailerKey}
          onClose={() => setIsOpen(false)}
        />
      )
        : null}
      <div className={posterContainer}>
        <img src={posterPath !== `${constants.postPathUrl}null` ? posterPath : constants.defaultBackgroundImage} alt={title} />
      </div>
      <div className={movieInfoContainer}>
        <div className={header}>
          <div className={headerTitleAndGenre}>
            <h1>{title}</h1>
            {allgenre.entities.length > 0 ? movieGenre.map((eachGenre:Genre) => (
              <h2 key={eachGenre.id}>
                {eachGenre.name}
                {' '}
                {' '}
              </h2>
            )) : null}
          </div>
          <div className={voteAverages}>
            <p>{voteAverage}</p>
          </div>
        </div>
        <div className={movieInfoBody}>
          <h2>Overview</h2>
          <p>{overview}</p>
          <div className={buttonSection}>
            <TrailerPlayer
              movieId={id}
              buttonType="watchNowButton"
              openMovieTrailers={(key) => {
                setTrailerKey(key);
                setIsOpen(true);
              }}
            />
          </div>
        </div>
      </div>

    </div>
  );
}

export default HorizontalMovieCard;
