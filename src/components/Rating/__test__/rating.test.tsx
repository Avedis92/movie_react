import { render } from '@testing-library/react';
import RatingStars from '../rating';

test('Create a snapshot test', () => {
  const {asFragment} = render(<RatingStars movieRating={6.4} />);
  expect(asFragment()).toMatchSnapshot();
});
