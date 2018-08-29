import InputSearch from '../index';

describe('<InputSearch />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(<InputSearch placeholder="" />));
  });

  it('mount the component structure correctly', () => {
    const wrapper = mount(<InputSearch placeholder="" />);
    expect(wrapper.find('.input-group').length).toBe(1);
    expect(wrapper.find('.input-group-prepend').length).toBe(1);
    expect(wrapper.find('.input-group-append').length).toBe(1);
    expect(wrapper.find('InputAutocomplete').length).toBe(1);
    expect(wrapper.find('SpeechToText').length).toBe(1);
  });
});
