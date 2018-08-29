import moxios from 'moxios'
import { MemoryRouter } from 'react-router-dom'

import http from '../../../services/http'
import { API_URL } from '../../../config'
import { ClientsSummary } from '../index'

const func = () => {}

const match = {
  params: ''
}

describe('<ClientsSummary />', () => {
  beforeEach(function () {
    moxios.install(http)
  })

  afterEach(function () {
    moxios.uninstall(http)
  })

  it('shallow renders correctly', () => {
    expect(shallow(<ClientsSummary loadingOn={func} match={match} />))
  })

  it('mount correctly', () => {
    expect(mount(
      <MemoryRouter>
        <ClientsSummary loadingOn={func} match={match} />
      </MemoryRouter>
    ))
  })

  it('should receive and assign the mock data to component correctly', done => {
    const loadingOn = jest.fn()
    const loadingOff = jest.fn()
    const match = {
      params: {
        summaryType: 'birthdays'
      }
    }
    const wrapper = shallow(
      <ClientsSummary loadingOn={loadingOn} loadingOff={loadingOff} match={match} />
    )

    const expected = {
      clients: [{ clientId: 1 }],
      pagination: { pageCount: 2 }
    }

    moxios.stubRequest(`${API_URL}/customer/birthday/week`, {
      status: 200,
      response: {
        content: [{clientId: 1}],
        totalPages: 2
      }
    })

    moxios.wait(() => {
      expect(wrapper.state().clients).toEqual(expected.clients)
      expect(wrapper.state().pagination).toEqual(expected.pagination)
      expect(loadingOn).toHaveBeenCalledTimes(1)
      expect(loadingOff).toHaveBeenCalledTimes(1)
      done()
    })
  })
})
