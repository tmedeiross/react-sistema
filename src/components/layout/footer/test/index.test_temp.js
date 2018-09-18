import { MemoryRouter } from 'react-router-dom';
import NavBar from '../index';

describe('<NavBar />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(<NavBar />));
  });

  it('mount correctly', () => {
    expect(
      mount(
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>,
      ),
    );
  });
});
