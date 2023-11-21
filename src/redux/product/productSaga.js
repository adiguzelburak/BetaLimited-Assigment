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

function* addToChartSaga(payload) {
    try {
        const response = yield call(productService.addToChart, payload.payload);
        if (response.status !== 200) throw new Error('Something went wrong check endpoint.');
    } catch (e) {
        console.log('error:', e)
    }
}

function* productsOnChartSaga() {
    try {
        const response = yield call(productService.getProductsOnChart);
        if (response.status !== 200) throw new Error('Something went wrong check endpoint.');

        yield put(productActions.setProductsOnChart({
            data: response.data
        }))
    } catch (e) {
        console.log('error:', e)
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(productActions.getProductsRequest.type, getProductsSaga),
        takeLatest(productActions.getSearchedProductsRequest.type, getSearchedProductsSaga),
        takeLatest(productActions.addToCartRequest.type, addToChartSaga),
        takeLatest(productActions.getProductsOnChartRequest.type, productsOnChartSaga),
    ]);
}