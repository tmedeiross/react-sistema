import moxios from 'moxios'

import SummaryCards from '../index'
import { API_URL, ROUTE_PREFIX as PREFIX } from '../../../config'
import http from '../../../services/http'

describe('<SummaryCards />', () => {
  beforeEach(function () {
    moxios.install(http)
  })

  afterEach(function () {
    moxios.uninstall(http)
  })

  it('shallow renders correctly', () => {
    expect(shallow(<SummaryCards />))
  })

  it('mount correctly', () => {
    expect(mount(<SummaryCards />))
  })

  it('expects to map through an array of items and creates a Card component for each one of them', () => {
    const cards = [
      { title: 'title', total: 50, color: 'bg-primary', route: '/route', description: 'desc', icon: 'fa fa-calendar' },
      { title: 'title card 2', total: 100, color: 'bg-default', route: '/route2', description: 'desc2', icon: 'fa fa-calendar' }
    ]
    const wrapper = shallow(<SummaryCards />)

    wrapper.setState({ cards })
    expect(wrapper.find('Card').length).toBe(2)
  })

  it('should calls an ajax request and set the cards data correctly', done => {
    const wrapper = shallow(<SummaryCards />)

    const data = {
      expiringRecipes: 10,
      birthdayOnDayOrWeek: 20,
      registeredOnDay: 30,
      salesOnDay: 40
    }

    moxios.stubRequest(`${API_URL}/customer/dashboard`, {
      status: 200,
      response: data
    })

    const expected = [
      {
        title: 'Receitas Expirando em 30 dias',
        total: data.expiringRecipes,
        color: 'bg-light-green-500',
        route: `${PREFIX}/clients/recipes-expiring`,
        icon: 'fa fa-calendar'
      },
      {
        title: 'Aniversariantes nesta semana',
        total: data.birthdayOnDayOrWeek,
        color: 'bg-indigo-300',
        route: `${PREFIX}/clients/birthdays`,
        icon: 'fa fa-birthday-cake'
      },
      {
        title: 'Novos Clientes hoje',
        total: data.registeredOnDay,
        color: 'bg-amber-500',
        route: `${PREFIX}/clients/new-registers`,
        icon: 'fa fa-address-card'
      },
      {
        title: 'Novas Vendas hoje',
        total: data.salesOnDay,
        color: 'bg-deep-purple-300',
        route: `${PREFIX}/clients/new-sales`,
        icon: 'fa fa-paste'
      }
    ]

    moxios.wait(() => {
      expect(wrapper.state('cards')).toEqual(expected)
      done()
    })
  })
})
