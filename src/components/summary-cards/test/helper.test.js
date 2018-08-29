import { expect as expectChai } from 'chai'
import { fillData } from '../helper'
import { ROUTE_PREFIX as PREFIX } from '../../../config'

describe('SummaryCards.Helper.fillData', () => {
  it('should be a function', () => {
    expectChai(fillData).to.be.a('function')
  })

  it('fillData(data) should returns the cards data correctly', () => {
    const expected = [
      {
        title: 'Receitas Expirando em 30 dias',
        total: 10,
        color: 'bg-light-green-500',
        route: `${PREFIX}/clients/recipes-expiring`,
        icon: 'fa fa-calendar'
      },
      {
        title: 'Aniversariantes nesta semana',
        total: 20,
        color: 'bg-indigo-300',
        route: `${PREFIX}/clients/birthdays`,
        icon: 'fa fa-birthday-cake'
      },
      {
        title: 'Novos Clientes hoje',
        total: 30,
        color: 'bg-amber-500',
        route: `${PREFIX}/clients/new-registers`,
        icon: 'fa fa-address-card'
      },
      {
        title: 'Novas Vendas hoje',
        total: 40,
        color: 'bg-deep-purple-300',
        route: `${PREFIX}/clients/new-sales`,
        icon: 'fa fa-paste'
      }
    ]

    const data = {
      expiringRecipes: 10,
      birthdayOnDayOrWeek: 20,
      registeredOnDay: 30,
      salesOnDay: 40
    }

    expect(fillData(data)).toEqual(expected)
  })

  it('fillData() should returns the cards data correctly', () => {
    const expected = [
      {
        title: 'Receitas Expirando em 30 dias',
        total: 0,
        color: 'bg-light-green-500',
        route: `${PREFIX}/clients/recipes-expiring`,
        icon: 'fa fa-calendar'
      },
      {
        title: 'Aniversariantes nesta semana',
        total: 0,
        color: 'bg-indigo-300',
        route: `${PREFIX}/clients/birthdays`,
        icon: 'fa fa-birthday-cake'
      },
      {
        title: 'Novos Clientes hoje',
        total: 0,
        color: 'bg-amber-500',
        route: `${PREFIX}/clients/new-registers`,
        icon: 'fa fa-address-card'
      },
      {
        title: 'Novas Vendas hoje',
        total: 0,
        color: 'bg-deep-purple-300',
        route: `${PREFIX}/clients/new-sales`,
        icon: 'fa fa-paste'
      }
    ]

    expect(fillData()).toEqual(expected)
  })
})
