import styles from './watchnowbutton.module.scss';

interface WatchNow {
    idMovie:number,
    openMovieTrailer(movieId:number):void
}

function WatchNowButton({ idMovie, openMovieTrailer }:WatchNow) {
  const { watchNowContainer } = styles;
  const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    openMovieTrailer(Number((e.target as HTMLButtonElement).id));
  };
  return (
    <div className={watchNowContainer}>
      <button id={String(idMovie)} name="watchNowButton" type="button" onClick={handleClick}>Watch Now</button>
    </div>
  );
}
export default WatchNowButton;
