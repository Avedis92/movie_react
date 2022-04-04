import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ModalVideo from 'react-modal-video';
import InfoButtons from '../InfoButtons/infobuttons';
import TrailerPlayer from '../TrailerPlayer/trailerplayer';
import 'react-modal-video/scss/modal-video.scss';
import styles from './moviecardmouseover.module.scss';

interface CardInfo extends Omit<Card, 'genreIds'>{
  handleClicks:()=>void
}

function MovieCardMouseOver({
  id, title, voteAverage, overview, posterPath, handleClicks,
}:CardInfo) {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState('');
  const {
    movieDetailsContainer, movieDetails, closingButton, titleAndVoteAverage, titleAndGenre, vote, buttonSection,
  } = styles;
  return (
    <div className={movieDetailsContainer} style={{ backgroundImage: `url(${posterPath})` }}>
      {isOpen ? (
        <ModalVideo
          channel="youtube"
          isOpen={isOpen}
          videoId={trailerKey}
          onClose={() => setIsOpen(false)}
        />
      )
        : null}
      <div className={movieDetails}>
        <div className={closingButton}>
          <p onClick={() => handleClicks()}>X</p>
        </div>
        <div className={titleAndVoteAverage}>
          <div className={titleAndGenre}>
            <h2>
              {title.length > 16 ? `${title.slice(0, 17)}...` : title}
            </h2>
          </div>
          <div className={vote}>
            <p>{voteAverage}</p>
          </div>
        </div>
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
          <InfoButtons
            moreInfo={() => history.push(`/moviedetailpage?movieId=${id}`)}
          />
        </div>
      </div>
    </div>
  );
}

export default MovieCardMouseOver;
