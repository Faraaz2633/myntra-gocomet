import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sortType: "POPULAR"
}

const SortSlice = createSlice({
    name: "sort",
    initialState,
    reducers: {
        setSortType: (state, action) => {
            state.sortType = action.payload;
        }
    }
})

export const { setSortType } = SortSlice.actions;

export default SortSlice.reducer;