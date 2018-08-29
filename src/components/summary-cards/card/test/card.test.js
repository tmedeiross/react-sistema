import { MemoryRouter } from 'react-router-dom';
import Card from '../index';

const data = {
  title: 'title',
  total: 50,
  color: 'bg-primary',
  description: 'description',
  route: '/route',
  icon: 'fa fa-calendar',
};

describe('<Card />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(<Card data={data} />));
  });

  it('mount correctly', () => {
    expect(
      mount(
        <MemoryRouter>
          <Card data={data} />
        </MemoryRouter>,
      ),
    );
  });

  it('should has the class passed in prop data.color in component', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Card data={data} />
      </MemoryRouter>,
    );
    expect(wrapper.find('.card').hasClass(data.color)).toBe(true);
  });

  it('should has h5 tag with the value of data.total in card body', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Card data={data} />
      </MemoryRouter>,
    );
    const expectedString = `${data.total.toString()} ${data.title}`;
    expect(wrapper.find('.card-body > h5').text()).toBe(expectedString);
  });
});
