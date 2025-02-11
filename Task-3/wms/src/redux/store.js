import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import rootSaga from "./sagas/rootSaga";
import ProductMasterReducer from "./slices/prodMasterSlice";
import editProductReducer from "./slices/editProdSlice";
import addProductReducer from "./slices/addProdSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    productMasterData: ProductMasterReducer,
    editProduct: editProductReducer,
    addProduct: addProductReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
