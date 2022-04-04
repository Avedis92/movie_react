import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import MovieCard from '../moviecard';
import * as constants from '../../../constants/constants';

describe('Make tests on MovieCard component', () => {
  test('Make a snapshot test', () => {
    const {asFragment} = render(
      <Provider store={store}>
        <MovieCard
          id={297761}
          genreIds={[14, 28, 80]}
          title="Suicide Squad"
          voteAverage={5.91}
          overview="From DC Comics comes the Suicide Squad, an antihero team of incarcerated supervillains who act as deniable assets for the United States government, undertaking high-risk black ops missions in exchange for commuted prison sentences."
          posterPath={`${constants.postPathUrl}/e1mjopzAS2KNsvpbpahQ1a6SkSn.jpg`}
        />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
