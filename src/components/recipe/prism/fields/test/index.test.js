import PrismFields from '../index'

const props = {
  eyeLabel: 'OD',
  prism1Name: 'rightPrism1',
  prism1Value: '100',
  prism1AxisName: 'rightPrism1Axis',
  prism1AxisValue: '125',
  prism2Name: 'rightPrism2',
  prism2Value: '150',
  prism2AxisName: 'rightPrism2Axis',
  prism2AxisValue: '200',
  handleChange: () => {}
}

describe('<PrismFields />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(<PrismFields {...props} />))
  })

  it('mount correctly', () => {
    expect(mount(
      <table>
        <tbody>
          <PrismFields {...props} />
        </tbody>
      </table>
    ))
  })

  it('should renders the child components correctly', () => {
    const wrapper = shallow(<PrismFields {...props} />)

    expect(wrapper.find('button').text()).toBe('OD')
    expect(wrapper.find('#rightPrism1').props().value).toBe('100')
    expect(wrapper.find('SelectSimple[name="rightPrism1Axis"]').length).toBe(1)
    expect(wrapper.find('SelectSimple[name="rightPrism1Axis"]').props().value).toBe('125')
    expect(wrapper.find('#rightPrism2').props().value).toBe('150')
    expect(wrapper.find('SelectSimple[name="rightPrism2Axis"]').length).toBe(1)
    expect(wrapper.find('SelectSimple[name="rightPrism2Axis"]').props().value).toBe('200')
  })

  it('should calls handleChange when some input change', () => {
    const handleChange = jest.fn()
    props.handleChange = handleChange
    const wrapper = shallow(<PrismFields {...props} />)

    wrapper.find('#rightPrism1').dive().simulate('change')
    wrapper.find('SelectSimple[name="rightPrism1Axis"]').dive().simulate('change')
    wrapper.find('#rightPrism2').dive().simulate('change')
    wrapper.find('SelectSimple[name="rightPrism2Axis"]').dive().simulate('change')

    expect(handleChange).toHaveBeenCalledTimes(4)
  })
})
