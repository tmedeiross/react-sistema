import * as Helper from '../helper'

describe('ClientsGrid.Helper', () => {
  it('getDueDate should add 1 year to registration date.', () => {
    const client = {
      prescription: {
        registrationDate: '01/01/2018'
      }
    }
    expect(Helper.getDueDate(client)).toEqual('01/01/2019')
  })

  it('getDueDate should returns void when the date is not passed', () => {
    expect(Helper.getDueDate()).toEqual('')
  })

  it('getBirthdate should return the day and month of a date', () => {
    expect(Helper.getBirthdate('01/01/2019')).toEqual('01/01')
  })

  it('getBirthdate should return the day and month of a date', () => {
    expect(Helper.getBirthdate()).toBe('')
  })
})
