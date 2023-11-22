import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    productsWithQuantities: [],
    searchParam: "",
    isSearched: false,
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProductsWithQuantities(state, action) {
            state.productsWithQuantities = action.payload.productsWithQuantities;
        },
        setSearchParam(state, action) {
            state.searchParam = action.payload
        },
        setIsSearched(state, action) {
            state.isSearched = action.payload
        },

        getProductsWithQuantitiesRequest() { },
        addToCartRequest() { },
        substractFromCartRequest() { },
    },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;