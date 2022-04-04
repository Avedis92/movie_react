import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import Homepage from '../homepage';
import '@testing-library/jest-dom/extend-expect';

const topRatedMovieList = [{
  id: 278,
  genre_ids: [18, 80],
  original_title: 'The Shawshank Redemption',
  vote_average: 8.32,
  overview: 'Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.',
  poster_path: '/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg',
}];

const globalRef:any = global;
globalRef.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({
    results: topRatedMovieList,
  }),
}));
describe('Make tests on HomePage component', () => {
  test('the Navbar clicking', async () => {
    render(
      <Provider store={store}>
        <Homepage />
      </Provider>,
    );
    const topratedNavLink = screen.getByText('Top Rated');
    userEvent.click(topratedNavLink);
    const header3 = await screen.findByTestId('movieTitle');
    expect(header3).toBeInTheDocument();
    expect(header3).toHaveTextContent('The Shawshank Redemption');
  });
  test('make a snapshot test', () => {
    const {asFragment} = render(
      <Provider store={store}>
        <Homepage />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
