import { render } from '@testing-library/react';
import MovieDetailCard from '../moviedetailcard';
import { postPathUrl } from '../../../constants/constants';

test('Create a snapshot test', () => {
  const {asFragment} = render(<MovieDetailCard
    backdropPath={`${postPathUrl}/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg`}
    posterPath={`${postPathUrl}/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg`}
    id={550}
    movieGenre={[{ id: 18, name: 'Drama' }]}
    title="Fight Club"
    tagline={"How much can you know about yourself if you've never been in a fight?"}
    runtime={139}
    releaseDate="1999-10-12"
    overview={'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.'}
  />);
  expect(asFragment()).toMatchSnapshot();
});
