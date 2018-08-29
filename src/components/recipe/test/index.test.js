import Recipe from '../index'

describe('<Recipe />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(<Recipe />))
  })

  it('mount correctly', () => {
    expect(shallow(<Recipe />))
  })

  it('should asssign the name of inputs correctly', () => {
    const wrapper = shallow(<Recipe />)

    const recipeFieldsOD = wrapper.find('RecipeFields[eyeLabel="OD"]')
    const recipeFieldsOE = wrapper.find('RecipeFields[eyeLabel="OE"]')

    expect(recipeFieldsOD.prop('farSphereName')).toBe('rightFarSpherePower')
    expect(recipeFieldsOD.prop('farCylinderName')).toBe('rightFarCylinderPower')
    expect(recipeFieldsOD.prop('farAxisName')).toBe('rightFarAxis')
    expect(recipeFieldsOD.prop('nearCylinderName')).toBe('rightNearCylinderPower')
    expect(recipeFieldsOD.prop('dnpName')).toBe('rightFarMonocularCentrantionDistance')
    expect(recipeFieldsOD.prop('heightName')).toBe('rightFittingHeight')

    expect(recipeFieldsOE.prop('farSphereName')).toBe('leftFarSpherePower')
    expect(recipeFieldsOE.prop('farCylinderName')).toBe('leftFarCylinderPower')
    expect(recipeFieldsOE.prop('farAxisName')).toBe('leftFarAxis')
    expect(recipeFieldsOE.prop('nearCylinderName')).toBe('leftNearCylinderPower')
    expect(recipeFieldsOE.prop('dnpName')).toBe('leftFarMonocularCentrantionDistance')
    expect(recipeFieldsOE.prop('heightName')).toBe('leftFittingHeight')
  })
})
