import { MemoryRouter } from 'react-router-dom'
import { shallowToJson } from 'enzyme-to-json'
import Breadcrumb from '../index'

const crumbs = [
  { active: false, link: '', name: 'Home' }
]

describe('<Breadcrumb />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(<Breadcrumb crumbs={crumbs} />))
  })

  it('mount correctly', () => {
    expect(mount(
      <MemoryRouter>
        <Breadcrumb crumbs={crumbs} />
      </MemoryRouter>
    ))
  })

  it('should match its snapshot with items', () => {
    const crumbs = [
      { active: false, link: '/', name: 'Home' },
      { active: true, link: '/clients', name: 'Clients' }
    ]
    const wrapper = mount(
      <MemoryRouter>
        <Breadcrumb crumbs={crumbs} />
      </MemoryRouter>
    )
    expect(shallowToJson(wrapper.find('Breadcrumb'))).toMatchSnapshot()
  })
})
