import moxios from 'moxios'
import Chance from 'chance'
import { MemoryRouter } from 'react-router-dom'

import http from '../../../services/http'
import { ClientDetails } from '../index'
import { API_URL } from '../../../config'

const loadingOn = () => {}

const match = {
  params: {
    id: ''
  }
}

const location = {
  search: {
    params: {}
  }
}

function generateResponseData () {
  const chance = new Chance()

  return {
    errors: {},
    zipCode: chance.zip({plusfour: true}),
    address: chance.address(),
    number: chance.natural({ min: 1, max: 8000 }),
    neighborhood: chance.word({length: 12}),
    city: chance.city(),
    complement: chance.word({length: 12}),
    state: chance.state({ full: true }),
    socialName: chance.name(),
    personalCpf: chance.cpf(),
    email: chance.email(),
    phone1: chance.phone(),
    dateBirth: chance.date().toString,
    prescription: [{
      rightFarSpherePower: '100',
      rightFarCylinderPower: '100',
      rightFarAxis: '180',
      rightAddition: '100',
      rightNearSpherePower: '100',
      rightNearCylinderPower: '100',
      rightNearAxis: '180',
      rightFarMonocularCentrantionDistance: '31',
      rightFittingHeight: '18',
      leftFarSpherePower: '100',
      leftFarCylinderPower: '100',
      leftFarAxis: '180',
      leftAddition: '100',
      leftNearSpherePower: '100',
      leftNearCylinderPower: '100',
      leftNearAxis: '100',
      leftFarMonocularCentrantionDistance: '31',
      leftFittingHeight: '18',

      rightPrism1: '100',
      rightPrism1Axis: '100',
      rightPrism2: '100',
      rightPrism2Axis: '100',
      leftPrism1: '100',
      leftPrism1Axis: '100',
      leftPrism2: '100',
      leftPrism2Axis: '100',

      rightVertexDistance: '100',
      pantoscopicAngle: '100',
      curvatureAngle: '100',
      readingDistance: '100',
      leftVertexDistance: '100'
    }],
    images: [{
      image: 'sample'
    }]
  }
}

describe('<ClientDetails />', () => {
  beforeEach(function () {
    moxios.install(http)
  })

  afterEach(function () {
    moxios.uninstall(http)
  })

  it('shallow renders correctly', () => {
    expect(shallow(
      <ClientDetails
        loadingOn={loadingOn}
        match={match}
        location={location}
      />
    ))
  })

  it('mount correctly', () => {
    expect(mount(
      <MemoryRouter>
        <ClientDetails
          loadingOn={loadingOn}
          match={match}
          location={location}
        />
      </MemoryRouter>
    ))
  })

  it('should calls an ajax request and set the client data correctly', done => {
    const loadingOn = jest.fn()
    const loadingOff = jest.fn()
    const match = {
      params: {
        id: '100'
      }
    }

    const wrapper = shallow(
      <ClientDetails
        loadingOn={loadingOn}
        loadingOff={loadingOff}
        match={match}
        location={location}
      />
    )

    const responseData = generateResponseData()

    moxios.stubRequest(`${API_URL}/customer/100`, {
      status: 200,
      response: responseData
    })

    const expected = {
      errors: {},
      zipCode: responseData.zipCode,
      address: responseData.address,
      number: responseData.number,
      neighborhood: responseData.neighborhood,
      city: responseData.city,
      complement: responseData.complement,
      state: responseData.state,
      socialName: responseData.socialName,
      personalCpf: responseData.personalCpf,
      email: responseData.email,
      phone1: responseData.phone1,
      dateBirth: responseData.dateBirth,

      rightFarSpherePower: '100',
      rightFarCylinderPower: '100',
      rightFarAxis: '180',
      rightAddition: '100',
      rightNearSpherePower: '100',
      rightNearCylinderPower: '100',
      rightNearAxis: '180',
      rightFarMonocularCentrantionDistance: '31',
      rightFittingHeight: '18',
      leftFarSpherePower: '100',
      leftFarCylinderPower: '100',
      leftFarAxis: '180',
      leftAddition: '100',
      leftNearSpherePower: '100',
      leftNearCylinderPower: '100',
      leftNearAxis: '100',
      leftFarMonocularCentrantionDistance: '31',
      leftFittingHeight: '18',

      rightPrism1: '100',
      rightPrism1Axis: '100',
      rightPrism2: '100',
      rightPrism2Axis: '100',
      leftPrism1: '100',
      leftPrism1Axis: '100',
      leftPrism2: '100',
      leftPrism2Axis: '100',

      rightVertexDistance: '100',
      pantoscopicAngle: '100',
      curvatureAngle: '100',
      readingDistance: '100',
      leftVertexDistance: '100',

      image: 'sample',

      clientID: '100',
      formInvalid: false
    }

    moxios.wait(() => {
      expect(wrapper.state()).toEqual(expected)
      expect(loadingOn).toHaveBeenCalledTimes(1)
      expect(loadingOff).toHaveBeenCalledTimes(1)
      done()
    })
  })

  it('should catch an exeption when the response returns an error code', done => {
    const loadingOn = jest.fn()
    const loadingOff = jest.fn()
    const match = {
      params: {
        id: '100'
      }
    }

    const history = {
      push: () => {}
    }

    shallow(
      <ClientDetails
        loadingOn={loadingOn}
        loadingOff={loadingOff}
        match={match}
        history={history}
        location={location}
      />
    )

    moxios.stubRequest(`${API_URL}/customer/100`, {
      status: 404,
      response: {}
    })

    moxios.wait(() => {
      expect(loadingOn).toHaveBeenCalledTimes(1)
      expect(loadingOff).toHaveBeenCalledTimes(1)
      done()
    })
  })

  it('should calls handleChange method when a child component has a input change', () => {
    const wrapper = shallow(
      <ClientDetails
        loadingOn={loadingOn}
        match={match}
        location={location}
      />
    )

    const zipCode = '01211-000'

    wrapper.instance()
      .handleChange({
        target: {
          name: 'zipCode',
          value: zipCode
        }
      })

    expect(wrapper.state().zipCode).toBe(zipCode)
  })
})
