import * as actions from '../actions'
import * as actionCreators from '../action-creators'

describe('reducers/shops/action-creators', () => {
  it('addShops should dispatch a ADD_SHOPS action', () => {
    const data = [{ id: 1, name: 'shop1' }]
    expect(actionCreators.addShops(data))
      .toEqual({
        type: actions.ADD_SHOPS,
        payload: data
      })
  })

  it('addShop should dispatch a ADD_SHOP action', () => {
    const data = { id: 1, name: 'shop1' }
    expect(actionCreators.addShop(data))
      .toEqual({
        type: actions.ADD_SHOP,
        payload: data
      })
  })
})
