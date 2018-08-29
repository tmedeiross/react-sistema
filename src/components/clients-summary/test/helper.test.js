import { expect as expectChai } from 'chai'
import { getDataByPage } from '../helper'

describe('ClientsSummary.Helper.getDataByPage', () => {
  it('should be a function', () => {
    expectChai(getDataByPage).to.be.a('function')
  })

  it('getDataByPage("birthdays") should returns the page birthday data correctly', () => {
    const expected = {
      pageName: 'Aniversariantes nesta semana',
      searchMethod: new Promise(() => {}),
      description: 'Clientes aniversariantes do dia ou semana.',
      color: 'bg-indigo-300',
      showBirthday: true
    }

    const result = getDataByPage('birthdays')

    expect(result.pageName).toBe(expected.pageName)
    expectChai(result.searchMethod()).to.be.a('promise')
    expect(result.description).toBe(expected.description)
    expect(result.color).toBe(expected.color)
    expect(result.showBirthday).toBe(expected.showBirthday)
  })

  it('getDataByPage("recipes-expiring") should returns the page recipes-expiring data correctly', () => {
    const expected = {
      pageName: 'Receitas Expirando em 30 dias',
      searchMethod: new Promise(() => {}),
      description: 'Clientes com receitas expirando',
      color: 'bg-light-green-500',
      showBirthday: false
    }

    const result = getDataByPage('recipes-expiring')

    expect(result.pageName).toBe(expected.pageName)
    expectChai(result.searchMethod()).to.be.a('promise')
    expect(result.description).toBe(expected.description)
    expect(result.color).toBe(expected.color)
    expect(result.showBirthday).toBe(expected.showBirthday)
  })

  it('getDataByPage("new-registers") should returns the page new-registers data correctly', () => {
    const expected = {
      pageName: 'Novos Clientes hoje',
      searchMethod: new Promise(() => {}),
      description: 'Clientes cadastrados no dia.',
      color: 'bg-amber-500',
      showBirthday: false
    }

    const result = getDataByPage('new-registers')

    expect(result.pageName).toBe(expected.pageName)
    expectChai(result.searchMethod()).to.be.a('promise')
    expect(result.description).toBe(expected.description)
    expect(result.color).toBe(expected.color)
    expect(result.showBirthday).toBe(expected.showBirthday)
  })

  it('getDataByPage("new-sales") should returns the page new-registers data correctly', () => {
    const expected = {
      pageName: 'Novos Pedidos hoje',
      searchMethod: new Promise(() => {}),
      description: 'Clientes com novas vendas no dia.',
      color: 'bg-deep-purple-300',
      showBirthday: false
    }

    const result = getDataByPage('new-sales')

    expect(result.pageName).toBe(expected.pageName)
    expectChai(result.searchMethod()).to.be.a('promise')
    expect(result.description).toBe(expected.description)
    expect(result.color).toBe(expected.color)
    expect(result.showBirthday).toBe(expected.showBirthday)
  })

  it('returns null when the page is not given', () => {
    expectChai(getDataByPage()).to.be.a('null')
  })

  it('returns null when the page is not valid', () => {
    expectChai(getDataByPage('abc')).to.be.a('null')
  })
})
