import React from "react";
import { CartItem } from "../";
import "./CartList.scss"

export const CartList = ({ products }) => {
  return (
    <div className="list">
      {products.map((item) => {
        return <CartItem product={item} key={item.id} />;
      })}
    </div>
  );
};
