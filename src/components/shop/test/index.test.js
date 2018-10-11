import { MemoryRouter } from 'react-router-dom';

import http from '../../../services/http';
import { API_URL } from '../../../config';
import { Home } from '../index';

describe('<Home />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(<Home />));
  });

  it('mount correctly', () => {
    expect(
      mount(
        <MemoryRouter>
          <Home />
        </MemoryRouter>,
      ),
    );
  });
});
