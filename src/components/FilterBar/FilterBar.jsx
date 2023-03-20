import React, { useState } from "react";
import { Radio, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import styles from "./FilterBar.module.scss";

import {
  setGender,
  setDiscount,
  setPrice,
  setBrand,
} from "../../store/filterReducer/reducer";

import { brands } from "../../data/Products";

export const FilterBar = () => {
  const filters = useSelector((state) => state.filter);
  const [genderValue, setGenderValue] = useState(filters.gender);
  const [discountValue, setDiscountValue] = useState(filters.discount);
  const [priceValue, setPriceValue] = useState(filters.price);
  const [brandValue, setBrandValue] = useState(filters.brand);

  const dispatch = useDispatch();

  const onGenderChange = (e) => {
    setGenderValue(e.target.value);
    dispatch(setGender(e.target.value));
  };

  const onDiscountChange = (e) => {
    setDiscountValue(e.target.value);
    dispatch(setDiscount(e.target.value));
  };

  const onPriceChange = (checkedValues) => {
    setPriceValue(checkedValues);
    dispatch(setPrice(checkedValues));
  };

  const onBrandChange = (checkedValues) => {
    setBrandValue(checkedValues);
    dispatch(setBrand(checkedValues))
  }
  return (
    <div className={styles.filterBar}>
      <div
        className={`${styles.gender} ${styles.padding} ${styles.borderBottom}`}
      >
        <Radio.Group
          onChange={onGenderChange}
          value={genderValue}
          size="small"
          className={styles.gender}
        >
          <Radio value={null}>All</Radio>
          <Radio value={"MALE"}>Men</Radio>
          <Radio value={"FEMALE"}>Women</Radio>
          <Radio value={"BOYS"}>Boys</Radio>
          <Radio value={"GIRLS"}>Girls</Radio>
        </Radio.Group>
      </div>
      <div
        className={`${styles.gender} ${styles.padding} ${styles.borderBottom}`}
      >
        <h2>Price</h2>
        <Checkbox.Group
          onChange={onPriceChange}
          value={priceValue}
          className={styles.gender}
        >
          <Checkbox value={"374-1531"} className={`${styles.noMargin}`}>Rs. 374 to Rs. 1531</Checkbox>
          <Checkbox value={"1531-2688"} className={`${styles.noMargin}`}>Rs. 1531 to Rs. 2688</Checkbox>
          <Checkbox value={"2688-3845"} className={`${styles.noMargin}`}>Rs. 2688 to Rs. 3845</Checkbox>
          <Checkbox value={"3845-5002"} className={`${styles.noMargin}`}>Rs. 3845 to Rs. 5002</Checkbox>
        </Checkbox.Group>
      </div>
      <div
        className={`${styles.gender} ${styles.padding} ${styles.borderBottom}`}
      >
        <h2>Discount Range</h2>
        <Radio.Group
          onChange={onDiscountChange}
          value={discountValue}
          size="small"
          className={styles.gender}
        >
          <Radio value={null}>All</Radio>
          <Radio value={10}>10% and above</Radio>
          <Radio value={20}>20% and above</Radio>
          <Radio value={30}>30% and above</Radio>
          <Radio value={40}>40% and above</Radio>
          <Radio value={50}>50% and above</Radio>
          <Radio value={60}>60% and above</Radio>
        </Radio.Group>
      </div>
      <div
        className={`${styles.gender} ${styles.padding} ${styles.borderBottom} ${styles.textuppercase}`}
      >
        <h2>Brands</h2>
        <Checkbox.Group
          onChange={onBrandChange}
          value={brandValue}
          className={styles.gender}
        >
          {brands.map((brand, i) => (
          <Checkbox value={brand.name} key={i} className={`${styles.noMargin}`}>{brand.name}</Checkbox>
          ))}
        </Checkbox.Group>
      </div>
    </div>
  );
};
