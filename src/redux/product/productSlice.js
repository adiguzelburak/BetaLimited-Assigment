import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    products: {},
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        getProductsRequest() { },
        setProducts(state, action) {
            state.products[action.payload.key] = action.payload.data
        }
    },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;