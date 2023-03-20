import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux'

import "./index.scss";

import Router from "./router/Router";
import store from './store/store';
import { setAllProducts } from './store/cartReducer/reducer';
import { products } from './data/Products';

const root = ReactDOM.createRoot(document.getElementById("root"));
store.dispatch(setAllProducts(products));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);
