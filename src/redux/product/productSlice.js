import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    products: [],
    productsOnCart: [],
    searchedProducts: [],
    productsFiltred: [],
    searchedProductsFiltred: [],
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        getProductsRequest() { },
        setProducts(state, action) {
            state.products = action.payload.data
        },
        setProdutcsAddQuantities(state) {
            const filteredArray = state.products.map(product => {
                const isExist = state.productsOnCart.find(productCart => productCart.productId === product.id);

                if (isExist) {
                    return { ...product, productQuantity: isExist.quantity };
                } else {
                    return { ...product, productQuantity: 0 };
                }
            });

            state.productsFiltred = filteredArray
        },

        getSearchedProductsRequest() { },
        setSearchedProducts(state, action) {
            state.searchedProducts = action.payload.data
        },
        setSearchedProductsQuantities(state) {
            const filteredArray = state.searchedProducts.map(product => {
                const isExist = state.productsOnCart.find(productCart => productCart.productId === product.id);

                if (isExist) {
                    return { ...product, productQuantity: isExist.quantity };
                } else {
                    return { ...product, productQuantity: 0 };
                }
            });
            state.searchedProductsFiltred = filteredArray
        },


        addToCartRequest() { },
        substractFromCartRequest() { },

        getProductsOnCartRequest() { },
        setProductsOnCart(state, action) {
            state.productsOnCart = action.payload.data
        },
    },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;