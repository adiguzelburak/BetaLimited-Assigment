import { all, call, put, takeLatest, fork, select } from "redux-saga/effects";
import productService from "./productService";
import { productActions } from './productSlice';

function* getProductsSaga(params) {
    try {
        const searchParam = yield select(state => state.product.searchParam);

        const productsResponse = searchParam ? yield call(productService.getProductsByName, searchParam) : yield call(productService.getProducts);
        const productsCartsResponse = yield call(productService.getProductsOnCart)
        if (productsResponse.status !== 200 || productsCartsResponse.status !== 200) throw new Error('Something went wrong');

        const products = productsResponse.data;
        const productsOnCart = productsCartsResponse.data

        const productsWithQuantities = products.map(product => {
            if (Array.isArray(productsOnCart)) {
                const cart = productsOnCart.find(productCart => productCart.productId === product.id);

                if (cart) {
                    return { ...product, productQuantity: cart.quantity };
                } else {
                    return { ...product, productQuantity: 0 };
                }

            } else {
                return { ...product, productQuantity: 0 };
            }
        });

        yield put(productActions.setProductsWithQuantities({
            productsWithQuantities,
        }))

        if (params?.payload?.onSuccess) params?.payload?.onSuccess();
    } catch (e) {
        if (params?.payload?.onFailure) params?.payload?.onFailure();
        console.log('error:', e)
    }
}

function* addToCartSaga({ payload: { id, onSuccess, onFailure } }) {
    try {
        const response = yield call(productService.addToCart, id);
        if (response.status !== 200) throw new Error('Something went wrong check endpoint.');

        yield fork(getProductsSaga)

        if (onSuccess) onSuccess();
    } catch (e) {
        if (onFailure) onFailure(e);
        console.log('error:', e);
    }
}

function* substractFromCartSaga({ payload: { id, onSuccess, onFailure } }) {
    try {
        const response = yield call(productService.substractFromCart, id);
        if (response.status !== 200) throw new Error('Something went wrong check endpoint.');

        yield fork(getProductsSaga)

        if (onSuccess) onSuccess();
    } catch (e) {
        if (onFailure) onFailure(e);
        console.log('error:', e)
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(productActions.getProductsWithQuantitiesRequest.type, getProductsSaga),
        takeLatest(productActions.addToCartRequest.type, addToCartSaga),
        takeLatest(productActions.substractFromCartRequest.type, substractFromCartSaga),
    ]);
}