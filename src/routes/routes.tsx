import { Switch, Route } from 'react-router-dom';
import Homepage from '../pages/homepage/homepage';
import MovieDetailPage from '../pages/moviedetailpage/moviedetailpage';
import SearchPage from '../pages/searchpage/searchpage';

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route exact path="/search">
        <SearchPage />
      </Route>
      <Route exact path="/moviedetailpage">
        <MovieDetailPage />
      </Route>
    </Switch>
  );
}

export default Routes;
