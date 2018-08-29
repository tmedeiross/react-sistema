import FormInfo from '../index'

const props = {
  socialName: '',
  personalCpf: '',
  email: '',
  phone1: '',
  errors: {}
}

describe('<FormInfo />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(
      <FormInfo {...props} handleChange={() => {}} />
    ))
  })

  it('mount correctly', () => {
    expect(shallow(
      <FormInfo {...props} handleChange={() => {}} />
    ))
  })

  it('should render all fields correctly', () => {
    const wrapper = mount(<FormInfo {...props} handleChange={() => {}} />)

    expect(wrapper.find('Input[name="socialName"]').length).toBe(1)
    expect(wrapper.find('Input[name="personalCpf"]').length).toBe(1)
    expect(wrapper.find('Input[name="email"]').length).toBe(1)
    expect(wrapper.find('Input[name="phone1"]').length).toBe(1)
  })

  it('should calls handleChange on each event change of the inputs', () => {
    const handleChange = jest.fn()
    const wrapper = shallow(<FormInfo {...props} handleChange={handleChange} />)

    wrapper.find('Input[name="socialName"]').dive().find('input').simulate('change')
    wrapper.find('Input[name="personalCpf"]').dive().find('input').simulate('change')
    wrapper.find('Input[name="email"]').dive().find('input').simulate('change')
    wrapper.find('Input[name="phone1"]').dive().find('input').simulate('change')

    expect(handleChange).toHaveBeenCalledTimes(4)
  })
})
