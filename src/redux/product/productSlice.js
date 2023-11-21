import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    products: [],
    searchedProducts: [],
    productsOnChart: [],
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        getProductsRequest() { },
        setProducts(state, action) {
            state.products = action.payload.data
        },

        getSearchedProductsRequest() { },
        setSearchedProducts(state, action) {
            state.searchedProducts = action.payload.data
        },

        addToCartRequest() { },

        getProductsOnChartRequest() { },
        setProductsOnChart(state, action) {
            state.productsOnChart = action.payload.data
        },
    },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;