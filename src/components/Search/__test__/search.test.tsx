import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import Search from '../search';
import * as constants from '../../../constants/constants';
import '@testing-library/jest-dom/extend-expect';

const genres = {
  entities: [
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 16,
      name: 'Animation',
    },
    {
      id: 35,
      name: 'Comedy',
    },
    {
      id: 80,
      name: 'Crime',
    },
    {
      id: 99,
      name: 'Documentary',
    },
    {
      id: 18,
      name: 'Drama',
    },
    {
      id: 10751,
      name: 'Family',
    },
    {
      id: 14,
      name: 'Fantasy',
    },
    {
      id: 36,
      name: 'History',
    },
    {
      id: 27,
      name: 'Horror',
    },
    {
      id: 10402,
      name: 'Music',
    },
    {
      id: 9648,
      name: 'Mystery',
    },
    {
      id: 10749,
      name: 'Romance',
    },
    {
      id: 878,
      name: 'Science Fiction',
    },
    {
      id: 10770,
      name: 'TV Movie',
    },
    {
      id: 53,
      name: 'Thriller',
    },
    {
      id: 10752,
      name: 'War',
    },
    {
      id: 37,
      name: 'Western',
    },
  ],
};

describe('Create tests on Search component', () => {
  jest.mock('react-redux', () => ({
    useSelector: jest.fn().mockReturnValue(genres),
  }));
  test('Make a snapshot test', () => {
    const {asFragment} = render(
      <Provider store={store}>
        <Search
          movieId={297761}
          genreList={[14, 28, 80]}
          originalTitle="Suicide Squad"
          movieVoteAverage={5.91}
          movieOverview="From DC Comics comes the Suicide Squad, an antihero team of incarcerated supervillains who act as deniable assets for the United States government, undertaking high-risk black ops missions in exchange for commuted prison sentences."
          movieBackgroundImage={`${constants.postPathUrl}/ndlQ2Cuc3cjTL7lTynw6I4boP4S.jpg`}
          searchMovieLoading={false}
        />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
