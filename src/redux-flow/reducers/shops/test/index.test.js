import deepFreeze from 'deep-freeze'
import shops from '../index'
import * as actions from '../actions'

describe('reducers/shops', () => {
  it('should add the shops array correctly', () => {
    const before = deepFreeze({
      shops: [],
      selectedShop: {}
    })
    const shopsArray = [
      { id: 1, name: 'shop1' },
      { id: 2, name: 'shop2' }
    ]
    const action = deepFreeze({
      type: actions.ADD_SHOPS,
      payload: shopsArray
    })

    const expected = {
      shops: shopsArray,
      selectedShop: {}
    }

    expect(shops(before, action)).toEqual(expected)
  })

  it('should overwrite the shops array when already exists shops in state', () => {
    const before = deepFreeze({
      shops: [
        { id: 3, name: 'shop3' },
        { id: 4, name: 'shop4' }
      ],
      selectedShop: {}
    })

    const shopsArray = [
      { id: 1, name: 'shop1' },
      { id: 2, name: 'shop2' }
    ]
    const action = deepFreeze({
      type: actions.ADD_SHOPS,
      payload: shopsArray
    })

    const expected = {
      shops: shopsArray,
      selectedShop: {}
    }

    expect(shops(before, action)).toEqual(expected)
  })

  it('should add the selected shop correctly', () => {
    const before = deepFreeze({
      shops: [],
      selectedShop: {}
    })

    const shop = { id: 1, name: 'shop1' }

    const action = deepFreeze({
      type: actions.ADD_SHOP,
      payload: shop
    })

    const expected = {
      shops: [],
      selectedShop: shop
    }

    expect(shops(before, action)).toEqual(expected)
  })
})
