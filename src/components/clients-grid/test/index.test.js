import { shallowToJson } from 'enzyme-to-json'
import { MemoryRouter } from 'react-router-dom'
import ClientsGrid from '../index'

describe('<ClientsGrid />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(
      <ClientsGrid clients={[]} />
    ))
  })

  it('mount correctly', () => {
    expect(mount(
      <MemoryRouter>
        <ClientsGrid clients={[]} />
      </MemoryRouter>
    ))
  })

  it('expects to show a message when clients array is empty', () => {
    const wrapper = mount(
      <MemoryRouter>
        <ClientsGrid clients={[]} />
      </MemoryRouter>
    )
    expect(wrapper.find('td[data-js="line-no-records"]').length).toBe(0)
  })

  it('should match its snapshot with items', () => {
    const clients = [
      { clientID: 200, socialName: 'Razao social', phone1: 'phpne number', personalCpf: '123.321.213.22' },
      { clientID: 100, socialName: 'Razao social 2', phone1: 'phpne number 2', personalCpf: '321.234.773.23' }
    ]
    const wrapper = shallow(<ClientsGrid clients={clients} />)
    expect(shallowToJson(wrapper.find('ClientsGrid'))).toMatchSnapshot()
  })
})
