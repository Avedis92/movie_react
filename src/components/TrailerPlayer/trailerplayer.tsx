import WatchNowButton from '../WatchNowButton/watchnowbutton';
import PlayCircle from '../reacticons/movieplaycircle';
import { getTrailer } from '../../helpers/movieapi';

interface TrailerInfo {
    buttonType?:string,
    movieId:number,
    openMovieTrailers(key:string):void,
}

function TrailerPlayer({ buttonType, movieId, openMovieTrailers }:TrailerInfo) {
  const dispatchMovieTrailer = (ids:number) => {
    getTrailer(ids).then((result) => {
      if (result && result.results.length > 0) {
        let movieTrailer = { key: '' };
        movieTrailer = result.results.find((trailer:{[index:string]:string}) => trailer.name.includes('Official Trailer'))
          ? result.results.find((trailer:{[index:string]:string}) => trailer.name.includes('Official Trailer')) : result.results[0];
        openMovieTrailers(movieTrailer.key);
      } else if (result && result.results.length === 0) openMovieTrailers('-1');
    });
  };
  return (
    <>
      {buttonType === 'playIcon' ? (
        <PlayCircle
          id={movieId}
          openMovieTrailer={dispatchMovieTrailer}
        />
      ) : (
        <WatchNowButton
          idMovie={movieId}
          openMovieTrailer={dispatchMovieTrailer}
        />
      )}
    </>
  );
}
export default TrailerPlayer;
