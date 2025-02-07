import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import rootSaga from "./sagas/rootSaga";
import addProductReducer from "./slices/addProdSlice";
import editProductReducer from "./slices/editProdSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    productMasterData: addProductReducer,
    editProduct: editProductReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
