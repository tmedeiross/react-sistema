import Input from '../index'

describe('<Input />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(
      <Input
        type='text'
        name=''
        id=''
        value=''
        label=''
        handleChange={() => {}}
        error=''
      />
    ))
  })

  it('mount the component structure correctly', () => {
    const wrapper = mount(
      <Input
        type='text'
        name='input_name'
        id='input_id'
        value='default'
        label='input_label'
        handleChange={() => {}}
        error='teste'
        showMsgError
      />
    )
    expect(wrapper.find('.form-group').length).toBe(1)
    expect(wrapper.find('label').length).toBe(1)
    expect(wrapper.find('input').length).toBe(1)
    expect(wrapper.find('.invalid-feedback').length).toBe(1)
  })

  it('mount the attributes of the component correctly', () => {
    const wrapper = mount(
      <Input
        type='text'
        name='input_name'
        id='input_id'
        value='default'
        label='input_label'
        placeholder='placeholder'
        maxLength='50'
        handleChange={() => {}}
        error=''
      />
    )
    expect(wrapper.props().type).toBe('text')
    expect(wrapper.props().name).toBe('input_name')
    expect(wrapper.props().id).toBe('input_id')
    expect(wrapper.props().value).toBe('default')
    expect(wrapper.props().placeholder).toBe('placeholder')
    expect(wrapper.props().maxLength).toBe('50')
    expect(wrapper.props().label).toBe('input_label')
  })

  it('calls handleChange on input change', () => {
    const handleChange = jest.fn()
    const wrapper = mount(
      <Input
        type='text'
        name=''
        id=''
        value=''
        label=''
        handleChange={handleChange}
        error=''
      />
    )
    wrapper.find('input').simulate('change')
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('shows the error correctly', () => {
    const errorMessage = 'error message'
    const wrapper = mount(
      <Input
        type='text'
        name=''
        id=''
        value=''
        label=''
        handleChange={() => {}}
        error={errorMessage}
        showMsgError
      />
    )

    expect(wrapper.find('input').hasClass('is-invalid')).toBe(true)
    expect(wrapper.find('.invalid-feedback').text(errorMessage)).toBe(errorMessage)
  })
})
