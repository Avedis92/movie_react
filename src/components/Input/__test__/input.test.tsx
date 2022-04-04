import { render } from '@testing-library/react';
import Input from '../input';

test('Create a snapshot test', () => {
  const {asFragment} = render(<Input setupMoviePage={() => null} />);
  expect(asFragment()).toMatchSnapshot();
});
