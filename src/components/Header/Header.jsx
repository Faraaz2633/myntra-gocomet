import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineShopping,
  AiOutlineSearch,
  AiOutlineHeart,
} from "react-icons/ai";
import { Drawer } from "antd";

import { Cart, Cards } from "../";
import { setText } from "../../store/filterReducer/reducer";
import { toggleCart, toggleWishList } from "../../store/cartReducer/reducer";

import { useWindowDimensions } from "../../hooks/useWindowDimensions";

import styles from "./Header.module.scss";

export const Header = () => {
  const dispatch = useDispatch();
  const text = useSelector((state) => state.filter.text);
  const history = useNavigate();
  const [value, setValue] = useState(text);
  const { pathname } = useLocation();
  const showCart = useSelector((state) => state.cart.toggleCart);
  const showWishList = useSelector((state) => state.cart.toggleWishList);
  const wishListData = useSelector((state) => state.cart.wishList);
  const { height, width } = useWindowDimensions();

  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        Myntra
      </Link>
      <div className={styles.links}>
        <Link to="/">MEN</Link>
        <Link to="/">WOMEN</Link>
        <Link to="/">KIDS</Link>
        <Link to="/">HOME & LIVING</Link>
        <Link to="/">OFFERS</Link>
      </div>
      <div className={styles.searchbar}>
        <div className={styles.searchbarIcon}>
          <AiOutlineSearch />
        </div>
        <input
          type="text"
          className={styles.input}
          placeholder="Search for products, brands and more"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              dispatch(setText(value));
              if (pathname !== "/") history("/");
            }
          }}
        />
      </div>

      <div className={styles.buttons}>
        <button
          className={styles.buttonItems}
          onClick={() => dispatch(toggleWishList(true))}
        >
          <AiOutlineHeart />
          <p>Wishlist</p>
        </button>
        <button
          className={styles.buttonItems}
          onClick={() => dispatch(toggleCart(true))}
        >
          <AiOutlineShopping />
          <p>Cart</p>
        </button>
      </div>
      <Drawer
        title="Cart 🛒"
        placement="right"
        closable={true}
        onClose={() => dispatch(toggleCart(false))}
        open={showCart}
        width={width > 800 ? 550 : width > 600 ? "60%" : "84%"}
      >
        <Cart />
      </Drawer>
      <Drawer
        title="Wishlist ❤️"
        placement="left"
        closable={true}
        onClose={() => dispatch(toggleWishList(false))}
        open={showWishList}
        width={324}
      >
        <Cards forWishlist={true} data={wishListData} />
      </Drawer>
    </div>
  );
};

// export default Header;
