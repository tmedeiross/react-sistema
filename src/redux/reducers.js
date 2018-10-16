import { combineReducers } from "redux";
import authUser from "./auth/reducer";
import shops from "./shops/reducer";
import shopUser from "./shop-user/reducer";
import settings from "./settings/reducer";
import menu from "./menu/reducer";

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  shops,
  shopUser
});

export default reducers;
