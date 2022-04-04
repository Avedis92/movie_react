import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import '@testing-library/jest-dom/extend-expect';
import SearchPage from '../searchpage';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockImplementation(() => ({
    pathname: '/search?searchedMovie=pirates',
  })),
  useHistory: jest.fn().mockImplementation(() => ({
    pathname: `/moviedetailpage?movieId=${550}` || '/',
  })),
}));

describe('Make tests on SearchPage component', () => {
  test('Make a snapshot test', () => {
    const {asFragment} = render(
      <Provider store={store}>
        <SearchPage />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
