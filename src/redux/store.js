import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";

import { productSlice } from "./product/productSlice";

const sagaMiddleware = createSagaMiddleware();

const makeStore = () => {
    const store = configureStore({
        reducer: {
            [productSlice.name]: productSlice.reducer,
        },
        devTools: true,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: true,
                serializableCheck: false,
            }).prepend(sagaMiddleware),
    });
    sagaMiddleware.run(rootSaga);
    return store;
};

export default makeStore;