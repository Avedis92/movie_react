import { FaPlayCircle } from 'react-icons/fa';

function PlayCircle(props:{id:number, openMovieTrailer:(id:number)=>void}) {
  const handleClick = () => {
    props.openMovieTrailer(props.id);
  };
  return (
    <FaPlayCircle
      style={{
        color: 'rgb(27, 186, 235)', fontSize: '10vh',
      }}
      onClick={handleClick}
    />
  );
}

export default PlayCircle;
