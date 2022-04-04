import { render } from '@testing-library/react';
import WatchNowButton from '../watchnowbutton';

test('Create a snapshot test', () => {
  const {asFragment} = render(<WatchNowButton
    idMovie={550}
    openMovieTrailer={() => null}
  />);
  expect(asFragment()).toMatchSnapshot();
});
