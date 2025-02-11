import { all } from "redux-saga/effects";
import authWatcherSaga from "./authSaga";
import productSaga from "./productSaga";
import addProductWatcher from "./prodMasterSaga";
import editProductSaga from "./editProdSaga";
import watchPostProduct from "./addProdSaga";

export default function* rootSaga() {
  yield all([
    authWatcherSaga(),
    productSaga(),
    addProductWatcher(),
    editProductSaga(),
    watchPostProduct(),
  ]);
}
