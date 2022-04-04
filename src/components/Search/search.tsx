import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ModalVideo from 'react-modal-video';
import { RootState } from '../../store/store';
import 'react-modal-video/scss/modal-video.scss';
import './search.scss';
import RatingStars from '../Rating/rating';
import Loader from '../Loader/loader';
import TrailerPlayer from '../TrailerPlayer/trailerplayer';
import InfoButtons from '../InfoButtons/infobuttons';
import * as constants from '../../constants/constants';

interface SearchMovie{
  movieId?:number,
  originalTitle?:string,
  movieBackgroundImage?:string,
  genreList?:Array<number>,
  movieOverview?:string,
  movieVoteAverage?:number,
  searchMovieLoading:boolean;
}

function Search({
  movieId, originalTitle, movieBackgroundImage, genreList, movieOverview, movieVoteAverage, searchMovieLoading,
}:SearchMovie) {
  const history = useHistory();
  const allgenre = useSelector((state:RootState) => state.genre);
  const [isOpen, setIsOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState('');
  const getGenres = (genreId:number) => {
    if (allgenre) {
      return allgenre.entities.find((genre:Genre) => genre.id === genreId);
    }
    return [];
  };
  let myGenres:Array<Genre> = [];
  myGenres = genreList && genreList.length > 0 ? genreList.map(
    (myid) => getGenres(myid),
  ) : ['N/A'];
  return (
    <>
      {searchMovieLoading === false ? (
        <div
          className="searchElement"
          style={{
            backgroundImage:
      `url(${movieBackgroundImage !== `${constants.postPathUrl}null` ? movieBackgroundImage : constants.defaultBackgroundImage}`,
          }}
        >
          {isOpen ? (
            <ModalVideo
              channel="youtube"
              isOpen={isOpen}
              videoId={trailerKey}
              onClose={() => setIsOpen(false)}
            />
          ) : null}
          <div className="searchFooter">
            {movieId ? (
              <>
                <div className="titleAndGenresAndOverview">
                  <div className="headerandGenreList">
                    <h1 data-testid="searchedTitle">{originalTitle}</h1>
                    <div className="searchedMovieGenreList">
                      { myGenres ? myGenres.map((myMovieGenre, index) => (
                        <h2 key={index}>
                          {myMovieGenre && myMovieGenre.name}
                          {' '}
                          {' '}
                        </h2>
                      )) : null}
                    </div>
                  </div>
                  <div className="searchedMovieOverview">
                    <p>{movieOverview}</p>
                  </div>
                </div>
                <div className="searchedMovieExtraDetails">
                  <div className="searchedMovieRatings">
                    <RatingStars movieRating={movieVoteAverage} />
                    <div className="searchedMovieVoteAverage">
                      <p>{movieVoteAverage}</p>
                    </div>
                  </div>
                  <div className="searchedMovieExtraInfoButtons">
                    <TrailerPlayer
                      movieId={movieId}
                      buttonType="watchNowButton"
                      openMovieTrailers={(key) => {
                        setTrailerKey(key);
                        setIsOpen(true);
                      }}
                    />
                    <InfoButtons
                      moreInfo={() => history.push(`/moviedetailpage?movieId=${movieId}`)}
                    />
                  </div>
                </div>
              </>
            ) : null}

          </div>

        </div>
      ) : <Loader />}
    </>
  );
}
export default Search;
