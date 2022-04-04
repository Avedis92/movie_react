import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import MovieDetailPage from '../moviedetailpage';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockImplementation(() => ({
    pathname: `/moviedetailpage?movieId=${550}`,
  })),
  useHistory: jest.fn().mockImplementation(() => ({
    pathname: '/',
  })),
}));

test('Make a snapshot test', () => {
  const {asFragment} = render(
    <Provider store={store}>
      <MovieDetailPage />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});
