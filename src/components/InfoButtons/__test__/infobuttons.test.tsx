import { render } from '@testing-library/react';
import InfoButtons from '../infobuttons';

test('Make a snapshot test', () => {
  const {asFragment} = render(<InfoButtons moreInfo={() => null} />);
  expect(asFragment()).toMatchSnapshot();
});
