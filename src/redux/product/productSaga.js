import { all, call, put, takeLatest } from "redux-saga/effects";
import productService from "./productService";
import { productActions } from './productSlice';

function* getProductsSaga() {
    try {
        const response = yield call(productService.getProducts);
        if (response.status !== 200) throw new Error('Something went wrong');

        yield put(productActions.setProducts({
            data: response.data
        }))
    } catch (e) {
        console.log('error:', e)
    }
}

function* productsOnCartSaga() {
    try {
        const response = yield call(productService.getProductsOnCart);
        if (response.status !== 200) throw new Error('Something went wrong check endpoint.');

        yield put(productActions.setProductsOnCart({
            data: response.data
        }))

        yield put(productActions.setProdutcsAddQuantities())

    } catch (e) {
        console.log('error:', e)
    }
}

function* getSearchedProductsSaga({ payload }) {
    try {
        const response = yield call(productService.getProductsByName, payload);
        if (response.status !== 200) throw new Error('Something went wrong check endpoint.');

        yield put(productActions.setSearchedProducts({
            data: response.data
        }))
    } catch (e) {
        console.log('error:', e)
    }
}

function* addToCartSaga({ payload: { id, onSuccess, onFailure } }) {
    try {
        const response = yield call(productService.addToCart, id);
        if (response.status !== 200) throw new Error('Something went wrong check endpoint.');

        yield put(productActions.setProdutcsAddQuantities())

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

        yield put(productActions.setProdutcsAddQuantities())

        if (onSuccess) onSuccess();
    } catch (e) {
        if (onFailure) onFailure(e);
        console.log('error:', e)
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(productActions.getProductsRequest.type, getProductsSaga),
        takeLatest(productActions.getSearchedProductsRequest.type, getSearchedProductsSaga),
        takeLatest(productActions.addToCartRequest.type, addToCartSaga),
        takeLatest(productActions.getProductsOnCartRequest.type, productsOnCartSaga),
        takeLatest(productActions.substractFromCartRequest.type, substractFromCartSaga),
    ]);
}