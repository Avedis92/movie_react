import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { MovieDispatch } from './store/store';
import { getGenres } from './store/slices/genre';
import Routes from './routes/routes';

function App() {
  const useMovieDispatch = () => useDispatch<MovieDispatch>();
  const dispatch = useMovieDispatch();
  useEffect(() => {
    dispatch(getGenres()).unwrap();
  }, [dispatch]);

  return (
    <Router>
      <Routes />
    </Router>
  );
}
export default App;
