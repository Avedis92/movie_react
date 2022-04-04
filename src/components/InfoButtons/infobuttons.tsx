import styles from './infobuttons.module.scss';

function InfoButtons({ moreInfo }:{moreInfo:()=>void}) {
  const { movieInfoButtons } = styles;

  return (
    <div className={movieInfoButtons}>
      <button name="moreinfo" type="button" onClick={() => moreInfo()}>More Info</button>
    </div>
  );
}
export default InfoButtons;
