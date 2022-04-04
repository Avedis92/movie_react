import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import Navbar from '../navbar';

test('Make a snapshot test', () => {
  const {asFragment} = render(
    <Provider store={store}>
      <Navbar
        handleNavigation={() => null}
        handleGenre={() => null}
        handleGridStyle={() => null}
      />
    </Provider>,
  );
  expect(asFragment()).toMatchSnapshot();
});
