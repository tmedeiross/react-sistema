import RecipeFields from '../index'

const props = {
  eyeLabel: 'OD',
  farSphereName: 'farSphereName',
  farSphereValue: '100',
  farCylinderName: 'farCylinderName',
  farCylinderValue: '125',
  farAxisName: 'farAxisName',
  farAxisValue: '150',
  additionName: 'additionName',
  additionValue: '175',
  nearSphereName: 'nearSphereName',
  nearSphereValue: '200',
  nearCylinderName: 'nearCylinderName',
  nearCylinderValue: '225',
  nearAxisName: 'nearAxisName',
  nearAxisValue: '250',
  dnpName: 'dnpName',
  dnpValue: '31',
  heightName: 'heightName',
  heightValue: '18',
  handleChange: () => {}
}

describe('<RecipeFields />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(<RecipeFields {...props} />))
  })

  it('mount correctly', () => {
    expect(mount(
      <table>
        <tbody>
          <RecipeFields {...props} />
        </tbody>
      </table>
    ))
  })

  it('should renders the child components correctly', () => {
    const wrapper = shallow(<RecipeFields {...props} />)

    expect(wrapper.find('button').first().text()).toBe('OD')
    expect(wrapper.find('InputSimple[name="farSphereName"]').prop('value')).toBe('100')
    expect(wrapper.find('InputSimple[name="farCylinderName"]').prop('value')).toBe('125')
    expect(wrapper.find('InputSimple[name="farAxisName"]').prop('value')).toBe('150')
    expect(wrapper.find('SelectSimple[name="additionName"]').prop('value')).toBe('175')
    expect(wrapper.find('InputSimple[name="nearSphereName"]').prop('value')).toBe('200')
    expect(wrapper.find('InputSimple[name="nearCylinderName"]').prop('value')).toBe('225')
    expect(wrapper.find('InputSimple[name="nearAxisName"]').prop('value')).toBe('250')
    expect(wrapper.find('InputSimple[name="dnpName"]').prop('value')).toBe('31')
    expect(wrapper.find('InputSimple[name="heightName"]').prop('value')).toBe('18')
  })

  it('should calls handleChange when some input change', () => {
    const handleChange = jest.fn()
    props.handleChange = handleChange
    const wrapper = shallow(<RecipeFields {...props} />)

    wrapper.find('InputSimple[name="farSphereName"]').dive().simulate('change')
    wrapper.find('InputSimple[name="farCylinderName"]').dive().simulate('change')
    wrapper.find('InputSimple[name="farAxisName"]').dive().simulate('change')
    wrapper.find('SelectSimple[name="additionName"]').dive().simulate('change')
    wrapper.find('InputSimple[name="nearSphereName"]').dive().simulate('change')
    wrapper.find('InputSimple[name="nearCylinderName"]').dive().simulate('change')
    wrapper.find('InputSimple[name="nearAxisName"]').dive().simulate('change')
    wrapper.find('InputSimple[name="dnpName"]').dive().simulate('change')
    wrapper.find('InputSimple[name="heightName"]').dive().simulate('change')

    expect(handleChange).toHaveBeenCalledTimes(9)
  })
})
