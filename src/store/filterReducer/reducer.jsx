import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gender: null,
  brand: [],
  price: [],
  color: [],
  discount: null,
  text: "",
  categories: [],
};

const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setDiscount: (state, action) => {
      state.discount = action.payload;
    },
    setText: (state, action) => {
      state.text = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    clearFilter: (state) => {
      state = initialState;
    },
  },
});

export const {
  setGender,
  setBrand,
  setPrice,
  setDiscount,
  setText,
  setCategories,
  clearFilter,
} = FilterSlice.actions;

export default FilterSlice.reducer;
