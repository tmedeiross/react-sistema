import * as actions from './actions';
import * as StoreAPI from '../../../api/store';

export const addShops = data => ({
  type: actions.ADD_SHOPS,
  payload: data,
});

export const fetchShops = () => (dispatch) => {
  StoreAPI.getShops().then((response) => {
    dispatch(addShops(response.data.content || []));
  });
};

export const addShop = data => ({
  type: actions.ADD_SHOP,
  payload: data,
});
