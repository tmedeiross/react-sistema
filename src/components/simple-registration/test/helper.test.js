import * as Helper from '../helper'
import { ROUTE_PREFIX as PREFIX } from '../../../config'

describe('SimpleRegistration.Helper', () => {
  it('getBreadcrumbData should return the breadcrumb data correctly', () => {
    const expected = [
      { active: false, link: `${PREFIX}`, name: 'Home' },
      { active: true, link: '', name: 'Novo Cadastro' }
    ]

    expect(Helper.getBreadcrumbData()).toEqual(expected)
  })
})
