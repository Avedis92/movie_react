import { render } from '@testing-library/react';
import ModalOpener from '../modalopener';
import { postPathUrl } from '../../../constants/constants';

test('Create a snapshot test', () => {
  const {asFragment} = render(<ModalOpener
    movieId={297761}
    handleViewInfoClick={() => null}
    backgroundImage={`${postPathUrl}/e1mjopzAS2KNsvpbpahQ1a6SkSn.jpg`}
  />);
  expect(asFragment()).toMatchSnapshot();
});
