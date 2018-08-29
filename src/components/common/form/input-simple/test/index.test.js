import InputSimple from '../index'

describe('<InputSimple />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(
      <InputSimple
        type='text'
        name=''
        id=''
        value=''
        handleChange={() => {}}
      />
    ))
  })

  it('mount correctly', () => {
    const wrapper = mount(
      <InputSimple
        type='text'
        name=''
        id=''
        value=''
        handleChange={() => {}}
      />
    )
    expect(wrapper.find('input[type="text"]').length).toBe(1)
  })

  it('mount the attributes of the component correctly', () => {
    const wrapper = mount(
      <InputSimple
        type='text'
        name='input_name'
        id='input_id'
        value='default'
        handleChange={() => {}}
      />
    )
    expect(wrapper.props().type).toBe('text')
    expect(wrapper.props().name).toBe('input_name')
    expect(wrapper.props().id).toBe('input_id')
    expect(wrapper.props().value).toBe('default')
  })

  it('calls handleChange on input change', () => {
    const handleChange = jest.fn()
    const wrapper = mount(
      <InputSimple
        type='text'
        name=''
        id=''
        value=''
        handleChange={handleChange}
      />
    )
    wrapper.find('input').simulate('change')
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
