import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filter from "./filterReducer/reducer";
import sort from "./sortReducer/reducer";
import common from "./commonReducer/reducer";
import cart from "./cartReducer/reducer";

const rootReducer = combineReducers({
  filter,
  cart,
  sort,
  common,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
