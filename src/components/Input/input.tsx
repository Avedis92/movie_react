import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './input.module.scss';

function Input({ setupMoviePage }:{setupMoviePage?:()=>void}) {
  const history = useHistory();
  const inputElem = useRef<HTMLInputElement>(null);
  const { searchHeader } = styles;
  const PressEnter = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputElem.current !== null) {
      if (setupMoviePage) {
        setupMoviePage();
      }
      history.push(`/search?searchedMovie=${inputElem.current.value}`);
    }
  };
  return (
    <div className={searchHeader}>
      <h1 onClick={() => history.push('/')}>Movies</h1>
      <input
        list="movieTitle"
        type="text"
        name="movieSearch"
        onKeyPress={PressEnter}
        placeholder="Search"
        ref={inputElem}
      />
    </div>
  );
}

export default Input;
