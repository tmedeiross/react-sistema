import FormAddress from '../index';

const props = {
  zipCode: 'zip_value',
  address: 'address_value',
  number: 'zip_value',
  neighborhood: 'zip_value',
  city: 'zip_value',
  complement: 'zip_value',
  state: 'zip_value',
  errors: {},
};

describe('<FormAddress />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(<FormAddress {...props} handleChange={() => {}} />));
  });

  it('shallow mount correctly', () => {
    expect(mount(<FormAddress {...props} handleChange={() => {}} />));
  });

  it('should render all fields correctly', () => {
    const wrapper = mount(<FormAddress {...props} handleChange={() => {}} />);

    expect(wrapper.find('Input[name="zipCode"]').length).toBe(1);
    expect(wrapper.find('Input[name="address"]').length).toBe(1);
    expect(wrapper.find('Input[name="number"]').length).toBe(1);
    expect(wrapper.find('Input[name="neighborhood"]').length).toBe(1);
    expect(wrapper.find('Input[name="city"]').length).toBe(1);
    expect(wrapper.find('Input[name="complement"]').length).toBe(1);
    expect(wrapper.find('Input[name="state"]').length).toBe(1);
  });

  it('should calls handleChange on each event change of the inputs', () => {
    const handleChange = jest.fn();
    const wrapper = shallow(<FormAddress {...props} handleChange={handleChange} />);

    wrapper
      .find('Input[name="zipCode"]')
      .dive()
      .find('input')
      .simulate('change');
    wrapper
      .find('Input[name="address"]')
      .dive()
      .find('input')
      .simulate('change');
    wrapper
      .find('Input[name="number"]')
      .dive()
      .find('input')
      .simulate('change');
    wrapper
      .find('Input[name="neighborhood"]')
      .dive()
      .find('input')
      .simulate('change');
    wrapper
      .find('Input[name="city"]')
      .dive()
      .find('input')
      .simulate('change');
    wrapper
      .find('Input[name="complement"]')
      .dive()
      .find('input')
      .simulate('change');
    wrapper
      .find('Input[name="state"]')
      .dive()
      .find('input')
      .simulate('change');

    expect(handleChange).toHaveBeenCalledTimes(7);
  });
});
