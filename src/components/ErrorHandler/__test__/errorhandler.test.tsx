import { render } from '@testing-library/react';
import ErrorHandler from '../errorhandler';

test('Check if ErrorHandler displays as it should be', () => {
  const {asFragment} = render(<ErrorHandler message="Error Detected!" />);
  expect(asFragment()).toMatchSnapshot();
});
