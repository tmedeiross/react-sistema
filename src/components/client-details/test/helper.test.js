import * as Helper from '../helper'
import { ROUTE_PREFIX as PREFIX } from '../../../config'

describe('ClientDetails.Helper', () => {
  it('getBreadcrumbData should return the breadcrumb data correctly', () => {
    const expected = [
      { active: false, link: `${PREFIX}`, name: 'Home' },
      { active: true, link: '', name: 'Detalhes do Cliente' }
    ]

    expect(Helper.getBreadcrumbData()).toEqual(expected)
  })

  it('getInitialState should return a initialState correctly', () => {
    const expected = {
      errors: {},
      zipCode: '',
      address: '',
      number: '',
      neighborhood: '',
      city: '',
      complement: '',
      state: '',
      socialName: '',
      personalCpf: '',
      email: '',
      phone1: '',
      dateBirth: '',

      rightFarSpherePower: '',
      rightFarCylinderPower: '',
      rightFarAxis: '',
      rightAddition: '',
      rightNearSpherePower: '',
      rightNearCylinderPower: '',
      rightNearAxis: '',
      rightFarMonocularCentrantionDistance: '',
      rightFittingHeight: '',
      leftFarSpherePower: '',
      leftFarCylinderPower: '',
      leftFarAxis: '',
      leftAddition: '',
      leftNearSpherePower: '',
      leftNearCylinderPower: '',
      leftNearAxis: '',
      leftFarMonocularCentrantionDistance: '',
      leftFittingHeight: '',
      rightPrism1: '',
      rightPrism1Axis: '',
      rightPrism2: '',
      rightPrism2Axis: '',
      leftPrism1: '',
      leftPrism1Axis: '',
      leftPrism2: '',
      leftPrism2Axis: '',
      rightVertexDistance: '',
      pantoscopicAngle: '',
      curvatureAngle: '',
      readingDistance: '',
      leftVertexDistance: '',

      image: '',
      formInvalid: false
    }
    expect(Helper.getInitialState()).toEqual(expected)
  })
})
