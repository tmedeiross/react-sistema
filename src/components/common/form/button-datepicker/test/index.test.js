import ButtonDatePicker from '../index'

describe('<ButtonDatePicker />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(
      <ButtonDatePicker
        placeholderText=''
        onDateChange={() => {}}
        dateValue=''
        name=''
      />
    ))
  })

  it('mount the component structure correctly', () => {
    const wrapper = mount(
      <ButtonDatePicker
        placeholderText='placeholder'
        onDateChange={() => {}}
        dateValue='01/01/01'
        name='datepicker'
      />
    )
    expect(wrapper.find('button').length).toBe(1)
  })

  it('mount the attributes of the component correctly', () => {
    const wrapper = mount(
      <ButtonDatePicker
        placeholderText='placeholder'
        onDateChange={() => {}}
        dateValue='01/01/01'
        name='datepicker'
      />
    )
    expect(wrapper.props().placeholderText).toBe('placeholder')
    expect(wrapper.props().dateValue).toBe('01/01/01')
    expect(wrapper.props().name).toBe('datepicker')
  })
})
