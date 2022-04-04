import { useState } from 'react';
import ModalVideo from 'react-modal-video';
import 'react-modal-video/scss/modal-video.scss';
import TrailerPlayer from '../TrailerPlayer/trailerplayer';
import styles from './modalopener.module.scss';

interface Modal {
  movieId:number,
  backgroundImage:string,
  handleViewInfoClick():void
}

function ModalOpener({ movieId, handleViewInfoClick, backgroundImage }:Modal) {
  const [isOpen, setIsOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState('');
  const {
    modalOpenerContainer, infoItem, watchNow, viewInfoButton,
  } = styles;
  return (
    <div className={modalOpenerContainer} style={{ backgroundImage: `url(${backgroundImage})` }}>
      {isOpen ? (
        <ModalVideo
          channel="youtube"
          isOpen={isOpen}
          videoId={trailerKey}
          onClose={() => setIsOpen(false)}
        />
      ) : null}
      <div className={infoItem}>
        <div className={watchNow}>
          <TrailerPlayer
            movieId={movieId}
            buttonType="playIcon"
            openMovieTrailers={(key) => {
              setTrailerKey(key);
              setIsOpen(true);
            }}
          />
          <p>Watch Now</p>
        </div>
        <button className={viewInfoButton} type="button" onClick={() => handleViewInfoClick()}>View Info</button>
      </div>
    </div>
  );
}
export default ModalOpener;
