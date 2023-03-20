import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb, Carousel, Image } from "antd";
import {
  AiOutlineArrowRight,
  AiOutlineComment,
  AiOutlineHeart,
  AiFillShopping,
} from "react-icons/ai";

import {
  addToCart,
  addToWishList,
  removeFromWishList,
  toggleCart
} from "../../store/cartReducer/reducer";

import "./Product.scss";
import { SelectSize } from "../../components";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

export const Product = () => {
  const { id } = useParams();
  const product = useSelector((state) => state.cart.allProducts).find(
    (item) => item.id === id
  );
  const inWishList =
    useSelector((state) => state.cart.wishList).findIndex(
      (item) => item.id === id
    ) >= 0;
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizeError, setShowSizeError] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [insideWishList, setInsideWishList] = useState(inWishList);
  const dispatch = useDispatch();
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    setShowSizeError(false);
  }, [selectedSize]);

  const toggleAddToWishList = () => {
    setInsideWishList(!insideWishList);
    if (insideWishList) {
      dispatch(removeFromWishList(id));
    } else {
      dispatch(addToWishList(product));
    }
  };
  return (
    <div>
      <div className="detail">
        <div className="row1">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/">Clothing</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span>Shirts For Men & Women</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span className="breadcrumbItem">{product.productName}</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="main">
          {width > 800 ? <div className="images">
            {product.images.map((image, index) => {
              return (
                <div
                  key={index}
                  className="image"
                >
                  <Image src={image} className="imageTag" alt="" />
                </div>
              );
            })}
          </div> : 
            <Carousel>
              {product.images.map((image, index) => {
              return (
                <div
                  key={index}
                >
                  <Image src={image} className="imageTag" alt="" />
                </div>
              );
            })}
            </Carousel>
          }
          <div className="content">
            <div className="name">
              <h1>{product.brandName}</h1>
              <h2>{product.productName}</h2>
            </div>
            <button className="reviews">
              <AiOutlineComment />
              {product.numberOfReviews} Reviews
            </button>
            <div className="border"></div>
            <div className="contentPrice">
              <div className="row1">
                <p className="price">RS. {product.price}</p>
                <p className="originalPrice">{product.originalPrice}</p>
                <p className="discount">{`(${product.discountPercent}% OFF)`}</p>
              </div>
              <div className="row2">inclusive of all taxes</div>
            </div>
            <SelectSize
              sizes={[38, 40, 42, 44, 46]}
              selectedSize={(size) => setSelectedSize(size)}
              showSizeError={showSizeError}
            />
            <div className="buttons">
              {addedToCart ? (
                <button className="bag bag2" onClick={() => dispatch(toggleCart(true))}>
                  Go to Bag <AiOutlineArrowRight />
                </button>
              ) : (
                <button
                  className="bag"
                  onClick={() => {
                    if (!selectedSize) setShowSizeError(true);
                    else {
                      setAddedToCart(true);
                      dispatch(
                        addToCart({
                          ...product,
                          quantity: 1,
                          selectedSize,
                        })
                      );
                    }
                  }}
                >
                  <AiFillShopping /> Add To Bag
                </button>
              )}

              <button
                className={insideWishList ? "wishlist-active" : "wishlist"}
                onClick={toggleAddToWishList}
              >
                <AiOutlineHeart /> Wishlist
              </button>
            </div>
            <div className="border"></div>
            <div className="contentPrice contentPriceAlt">
              <div className="row1">
                <p className="price">RS. {product.price}</p>
                <p className="originalPrice">{product.originalPrice}</p>
                <p className="discount">{`(${product.discountPercent}% OFF)`}</p>
              </div>
              <div className="row2">
                Seller: <span>Myntra Retail</span>
                <br />
                Shipped By: <span>Go Comet</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
