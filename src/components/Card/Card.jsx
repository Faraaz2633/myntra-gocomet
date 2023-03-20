import React, { useState } from "react";
import { AiOutlineClose, AiOutlineCopy, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  addToWishList,
  removeFromWishList,
} from "../../store/cartReducer/reducer";
import { setShowSimilar } from "../../store/commonReducer/reducer";

import "./Card.scss";
import useInterval from "../../hooks/useInterval";
import { CustomModal } from "../CustomModal";

export const Card = ({
  images,
  color,
  brandName,
  productName,
  price,
  originalPrice,
  discountPercent,
  id,
  wishListed,
  forWishlist = false,
}) => {
  const dispatch = useDispatch();
  const [insideWishList, setInsideWishList] = useState(wishListed);
  const [showModal, setShowModal] = useState(false);
  const [slideShowIndex, setSlideShowIndex] = useState(0);
  const [isSlideShowActive, setSlideShowStatus] = useState(false);

  const stopSlideShow = () => {
    setSlideShowStatus(false);
    setSlideShowIndex(0);
  }

  useInterval(
    () => {
      let newIndex = slideShowIndex + 1 ? slideShowIndex + 1 : 0;
      if (slideShowIndex >= images.length - 1) newIndex = 0;
      setSlideShowIndex(newIndex);
    },
    isSlideShowActive ? 1500 : null,
  );

  const toggleAddToWishList = () => {
    setInsideWishList(!insideWishList);
    if (insideWishList) {
      dispatch(removeFromWishList(id));
    } else {
      dispatch(
        addToWishList({
          images,
          brandName,
          productName,
          price,
          originalPrice,
          discountPercent,
          id,
        })
      );
    }
  };

  return (
    <div
      className={forWishlist ? "card card-wishlist" : "card"}
      onMouseOver={() => setSlideShowStatus(true)}
      onMouseLeave={stopSlideShow}
    >
      <Link to={"/shirts/" + id} className="imageContainer">
        <img src={images[slideShowIndex]} alt={productName}/>
      </Link>
      <div
        className="similar"
        onClick={() => {
          dispatch(
            setShowSimilar({
              query: color.join(" "),
              id,
            })
          );
        }}
      >
        <button>
          <AiOutlineCopy /> View Similar
        </button>
      </div>
      {forWishlist && (
        <div
          className="removeFromWishlist"
          onClick={() => {
            dispatch(removeFromWishList(id));
          }}
        >
          <button>
            <AiOutlineClose />
          </button>
        </div>
      )}
      {!forWishlist && (
        <div className="wishlist">
          <button
            onClick={toggleAddToWishList}
            className={insideWishList ? "buttonActive" : ""}
          >
            <AiOutlineHeart /> Wishlist
          </button>
        </div>
      )}
      <Link to={"/shirts/" + id}>
        <div className="content">
          {!forWishlist && <p className="brand">{brandName}</p>}
          <p className="product">{productName}</p>
          <div className="priceContainer">
            <span className="price">Rs. {price}</span>
            <span className="originalPrice">Rs. {originalPrice}</span>
            <span className="discount">{discountPercent}%</span>
          </div>
        </div>
      </Link> 
      {forWishlist && (
        <div className="moveToBag">
          <button
            onClick={() => {
              setShowModal(true);
            }}
          >
            Move To bag
          </button>
        </div>
      )}
      <CustomModal
        handleModalVisible={setShowModal}
        isModalVisible={showModal}
        product={{ images, color, brandName, productName, price, originalPrice, discountPercent, id }}
      />
    </div>
  );
};
