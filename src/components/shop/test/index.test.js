import moxios from 'moxios'

import { Login } from '../index'
import http from '../../../../services/http'

describe('<Login />', () => {
  beforeEach(function () {
    moxios.install(http)
  })

  afterEach(function () {
    moxios.uninstall(http)
  })

  it('should shallow correctly', () => {
    expect(shallow(<Login />))
  })

  it('should mount correctly', () => {
    expect(mount(<Login />))
  })
})
