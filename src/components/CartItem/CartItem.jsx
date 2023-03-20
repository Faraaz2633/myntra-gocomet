import React, { useEffect } from "react";
import { Button, Dropdown } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineCaretDown, AiOutlineCheck } from "react-icons/ai";

import "./CartItem.scss";

import { setTotalAmount } from "../../store/commonReducer/reducer";
import {
  addToWishList,
  removeFromCart,
  updateCart,
} from "../../store/cartReducer/reducer";

export const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const { quantity = 1 } = useSelector((state) => state.cart.cart).find(
    (item) => item.id === product.id
  );
  const selectedSizeString = product.selectedSize?.toString();

  useEffect(() => {
    dispatch(setTotalAmount(quantity * product.price));
  }, [quantity]);

  const menu = [
    {
      key: "38",
      label: <button>38</button>,
    },
    {
      key: "40",
      label: <button>40</button>,
    },
    {
      key: "42",
      label: <button>42</button>,
    },
    {
      key: "44",
      label: <button>44</button>,
    },
  ];

  const quantityItems = [
    {
      key: "1",
      label: (
        <button>
          1
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button>
          2
        </button>
      ),
    },
    {
      key: "3",
      label: (
        <button>
          3
        </button>
      ),
    },
    {
      key: "4",
      label: (
        <button>4</button>
      ),
    },
  ];

  const updateSizeMenu = (e) => {
    dispatch(
      updateCart({
        ...product,
        selectedSize: parseInt(e.key),
      })
    );
  };

  const updateQuantityMenu = (e) => {
    dispatch(
      updateCart({
        ...product,
        quantity: parseInt(e.key),
      })
    );
  };

  return !!product.brandName ? (
    <div className="listItem">
      <div className="main">
        <Link to={`/shirts/${product.id}`} className="image">
          <img src={product.images[0]} alt={product.productName} />
        </Link>
        <div className="info">
          <div className="columns">
            <div className="column1">
              <h1 className="brandName">{product.brandName}</h1>
              <p className="productName">{product.productName}</p>
              <p className="soldBy">Sold By: Myntra</p>
            </div>
            <div className="column2">
              <div className="price">Rs. {quantity * product.price}</div>
              <div className="discount">
                <p className="orignalPrice">
                  {quantity * product.originalPrice}
                </p>
                <p className="discountRange"> {product.discountPercent}% OFF</p>
              </div>
            </div>
          </div>
          <div className="dropdowns">
            <div>
              <Dropdown
                menu={{
                  items: menu,
                  defaultSelectedKeys: [selectedSizeString],
                  onClick: updateSizeMenu,
                }}
                placement="bottomLeft"
              >
                <Button>
                  <span style={{ fontWeight: "bolder", paddingRight: "4px" }}>
                    Size:{" "}
                  </span>{" "}
                  {product.selectedSize} <AiOutlineCaretDown />
                </Button>
              </Dropdown>
            </div>
            <div>
              <Dropdown
                menu={{
                  items: quantityItems,
                  onClick: updateQuantityMenu,
                  defaultSelectedKeys: [toString(quantity)],
                }}
                placement="bottomLeft"
              >
                <Button>
                  <div>

                  <span style={{ fontWeight: "bolder", paddingRight: "4px" }}>
                    Qty:{" "}
                  </span>{" "}
                  {quantity} <AiOutlineCaretDown />
                  </div>
                </Button>
              </Dropdown>
            </div>
          </div>

          <div className="checks">
            <div>
              <AiOutlineCheck /> Delivery by tomorrow
            </div>
            <div>
              <AiOutlineCheck /> Eligible for Try & Buy
            </div>
          </div>
        </div>
      </div>
      <div className="buttons">
        <button
          className="remove"
          onClick={() => dispatch(removeFromCart(product.id))}
        >
          remove
        </button>
        <button
          className="add-wishlist"
          onClick={() => {
            dispatch(removeFromCart(product.id));
            dispatch(addToWishList(product));
          }}
        >
          Move to Wishlist
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};
