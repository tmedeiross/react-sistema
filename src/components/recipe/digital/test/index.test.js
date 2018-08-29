import DigitalRecipe from '../index'

const props = {
  rightVertexDistance: '12',
  leftVertexDistance: '13',
  pantoscopicAngle: '14',
  curvatureAngle: '15',
  readingDistance: '16',
  handleChange: () => {}
}

describe('<DigitalRecipe />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(<DigitalRecipe />))
  })

  it('mount correctly', () => {
    expect(mount(<DigitalRecipe />))
  })

  it('should renders the child components correctly', () => {
    const wrapper = shallow(<DigitalRecipe {...props} />)

    expect(wrapper.find('button').first().text()).toBe('OD')
    expect(wrapper.find('button').last().text()).toBe('OE')
    expect(wrapper.find('InputSimple#rightVertexDistance').prop('value')).toBe('12')
    expect(wrapper.find('InputSimple#leftVertexDistance').prop('value')).toBe('13')
    expect(wrapper.find('InputSimple#pantoscopicAngle').prop('value')).toBe('14')
    expect(wrapper.find('InputSimple#curvatureAngle').prop('value')).toBe('15')
    expect(wrapper.find('InputSimple#readingDistance').prop('value')).toBe('16')
  })

  it('should calls handleChange when some input change', () => {
    const handleChange = jest.fn()
    props.handleChange = handleChange
    const wrapper = shallow(<DigitalRecipe {...props} />)

    wrapper.find('InputSimple#rightVertexDistance').dive().simulate('change')
    wrapper.find('InputSimple#leftVertexDistance').dive().simulate('change')
    wrapper.find('InputSimple#pantoscopicAngle').dive().simulate('change')
    wrapper.find('InputSimple#curvatureAngle').dive().simulate('change')
    wrapper.find('InputSimple#readingDistance').dive().simulate('change')

    expect(handleChange).toHaveBeenCalledTimes(5)
  })
})
