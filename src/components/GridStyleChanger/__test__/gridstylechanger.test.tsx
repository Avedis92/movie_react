import { render } from '@testing-library/react';
import GridStyleChanger from '../gridstylechanger';

describe('Make tests on GridStyle component', () => {
  test('Make a snapshot test', () => {
    const {asFragment} = render(<GridStyleChanger changeGridStyle={() => null} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
