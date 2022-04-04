import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import GridStyleChanger from '../GridStyleChanger/gridstylechanger';
import styles from './navbar.module.scss';

enum NavType {
  Trending='trendings',
  TopRated='toprated',
  Upcoming='upcoming'
}

function Navbar({ handleNavigation, handleGenre, handleGridStyle }:{
  handleNavigation:(navtype:string)=>void,
  handleGenre:(genreId:number, genreName:string)=>void,
  handleGridStyle:(gridStyle:string, gridColumns:number)=>void
}) {
  const allgenre = useSelector((state:RootState) => state.genre);
  const [internalGenre, setInternalGenre] = useState('');
  const [activeNavType, setActiveNavType] = useState(NavType.Trending);
  const {
    navbar, movieType, activeNav, nonActiveNav,
  } = styles;
  const handleNavigationChange = (e: React.BaseSyntheticEvent) => {
    handleNavigation(e.target.dataset.navtype);
    setActiveNavType(e.target.dataset.navtype);
  };
  const handleGenreSelection = (e: React.BaseSyntheticEvent) => {
    setInternalGenre(e.target.value);
    setActiveNavType(e.target.value);
  };

  useEffect(() => {
    const id = Number(internalGenre);
    if (internalGenre) {
      handleGenre(id, 'Genre');
    }
  }, [internalGenre]);
  return (
    <div className={navbar}>
      <div className={movieType}>
        <nav>
          <div><p className={activeNavType === NavType.Trending ? activeNav : nonActiveNav} data-navtype={NavType.Trending} onClick={(e) => { handleNavigationChange(e); }}>Trending</p></div>
          <div><p className={activeNavType === NavType.TopRated ? activeNav : nonActiveNav} data-navtype={NavType.TopRated} onClick={(e) => { handleNavigationChange(e); }}>Top Rated</p></div>
          <div><p className={activeNavType === NavType.Upcoming ? activeNav : nonActiveNav} data-navtype={NavType.Upcoming} onClick={(e) => { handleNavigationChange(e); }}>Coming Soon</p></div>
          <div>
            <select
              value={internalGenre}
              onChange={handleGenreSelection}
              className={activeNavType === internalGenre ? activeNav : nonActiveNav}
            >
              <option value="Genre">Genre</option>
              { allgenre ? allgenre.entities.map((myGenre:Genre) => (
                <option id={myGenre.name} value={`${myGenre.id}`} key={myGenre.id}>{myGenre.name}</option>
              )) : null}
            </select>

          </div>
        </nav>
      </div>
      <GridStyleChanger
        changeGridStyle={(gridStyle:'Horizontal'|'Multi', gridColumns:number) => handleGridStyle(gridStyle, gridColumns)}
      />
    </div>
  );
}
export default Navbar;
