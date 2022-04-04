import { render } from '@testing-library/react';
import MovieCardMouseOver from '../moviecardmouseover';
import { postPathUrl } from '../../../constants/constants';

test('Create a snapshot test', () => {
  const {asFragment} = render(<MovieCardMouseOver
    id={297761}
    title="Suicide Squad"
    voteAverage={5.91}
    overview="From DC Comics comes the Suicide Squad, an antihero team of incarcerated supervillains who act as deniable assets for the United States government, undertaking high-risk black ops missions in exchange for commuted prison sentences."
    posterPath={`${postPathUrl}/e1mjopzAS2KNsvpbpahQ1a6SkSn.jpg`}
    handleClicks={() => null}
  />);
  expect(asFragment()).toMatchSnapshot();
});
