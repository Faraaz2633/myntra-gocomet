import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineDown } from "react-icons/ai";

import styles from "./SortMenu.module.scss";

import { setSortType } from "../../store/sortReducer/reducer";

export const SortMenu = () => {
  const [current, setCurrent] = useState({
    key: "recommended",
    value: "Recommended",
  });

  const dispatch = useDispatch();

  const onCurrentChange = (e) => {
    setCurrent({
      key: e.target.value,
      value: e.target.textContent,
    });

    dispatch(setSortType(e.target.value));
  };

  return (
    <div className={styles.sortMenu}>
      Sort By: <span className={styles.label}>{current.value}</span>
      <span className={styles.icon}>
        <AiOutlineDown />
      </span>
      <ul>
        <button value="NEW" onClick={onCurrentChange}>
          What's New
        </button>
        <button value="POPULAR" onClick={onCurrentChange}>
          Popularity
        </button>
        <button value="BETTER_DISCOUNT" onClick={onCurrentChange}>
          Better Discount
        </button>
        <button value="PRICE_HIGH_TO_LOW" onClick={onCurrentChange}>
          Price High to Low
        </button>
        <button value="PRICE_LOW_TO_HIGH" onClick={onCurrentChange}>
          Price Low to High
        </button>
      </ul>
    </div>
  );
};
