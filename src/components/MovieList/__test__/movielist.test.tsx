import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import MovieList from '../movielist';

const movie = {
  id: 297761,
  genre_ids: [14, 28, 80],
  original_title: 'Suicide Squad',
  vote_average: 5.91,
  overview: 'From DC Comics comes the Suicide Squad, an antihero team of incarcerated supervillains who act as deniable assets for the United States government, undertaking high-risk black ops missions in exchange for commuted prison sentences.',
  poster_path: '/e1mjopzAS2KNsvpbpahQ1a6SkSn.jpg',
};
test('Make a snapshot test', () => {
  const {asFragment} = render(
    <Provider store={store}>
      <MovieList
        movieList={[movie]}
        gridStyle="Multi"
        gridTemplateColumn={4}
        errorMessage="Error detected"
        setMoviePage={() => null}
        listLoading={false}
        loadingMore={false}
      />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});
