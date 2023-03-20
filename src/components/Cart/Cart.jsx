import React from "react";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";

import "./Cart.scss";

import { clearCart } from "../../store/cartReducer/reducer";
import { EmptyPage, CartList } from "../";

export const Cart = () => {
  const cartProducts = useSelector((state) => state.cart.cart);
  let totalAmount = 0;
  const dispatch = useDispatch();
  cartProducts.forEach((item) => {
    const quantity = typeof item.quantity === "number" ? item.quantity : 1;
    totalAmount += item.price * quantity;
  });
  return (
    <div>
      {cartProducts.length > 0 ? (
        <div className="cartPage">
          <div className="cart-list">
            <h1 className="pageTitle">Cart</h1>
            <CartList products={cartProducts} />
          </div>
          <div className="summary">
            <h1>
              Total Amount: <span>{totalAmount}</span>
            </h1>
            <button
              onClick={() => {
                message.success("Successfully Purchased");
                dispatch(clearCart());
              }}
            >
              Buy
            </button>
          </div>
        </div>
      ) : (
        <EmptyPage name="Your cart is empty, please add something into it!"/>
      )}
    </div>
  );
};
