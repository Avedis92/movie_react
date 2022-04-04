import { render } from '@testing-library/react';
import Loader from '../loader';

test('Create a snapshot test', () => {
  const {asFragment} = render(<Loader />);
  expect(asFragment()).toMatchSnapshot();
});
