import { all, call, put, takeLatest } from "redux-saga/effects";
import productService from "./productService";
import { productActions } from './productSlice';

function* getProductsSaga({ payload: { product, onSuccess, onFailure } }) {
    try {
        const { data, status } = yield call(productService.getProducts, product);
        if (status !== 200 || data.message !== "OK") throw new Error('Something went wrong');


        yield put(productActions.getProductsRequest({
            key: product,
            data: data.data
        }))


        if (onSuccess) onSuccess();
    } catch (e) {
        if (onFailure) onFailure(e);
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(productActions.getProductsRequest.type, getProductsSaga),
    ]);
}