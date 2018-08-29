import SelectSimple from '../index'

const options = [
  { value: 1, text: 'option text' },
  { value: 2, text: 'option text 2' }
]

describe('<SelectSimple />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(
      <SelectSimple
        type='text'
        name=''
        id=''
        value=''
        options={options}
        handleChange={() => {}}
      />
    ))
  })

  it('mount correctly', () => {
    expect(mount(
      <SelectSimple
        type='text'
        name=''
        id=''
        value=''
        options={options}
        handleChange={() => {}}
      />
    ))
  })

  it('mount the attributes of the component correctly', () => {
    const wrapper = mount(
      <SelectSimple
        name='select_name'
        id='select_id'
        value='default'
        options={options}
        handleChange={() => {}}
      />
    )
    expect(wrapper.props().name).toBe('select_name')
    expect(wrapper.props().id).toBe('select_id')
    expect(wrapper.props().value).toBe('default')
    expect(wrapper.find('option').length).toBe(3)
  })

  it('calls handleChange on select change', () => {
    const handleChange = jest.fn()
    const wrapper = mount(
      <SelectSimple
        name='select_name'
        id='select_id'
        value='default'
        options={options}
        handleChange={handleChange}
      />
    )
    wrapper.find('select').simulate('change')
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
