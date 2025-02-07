import { all } from "redux-saga/effects";
import authWatcherSaga from "./authSaga";
import productSaga from "./productSaga";
import addProductWatcher from "./addProdSaga";
import editProductSaga from "./editProdSaga";

export default function* rootSaga() {
  yield all([
    authWatcherSaga(),
    productSaga(),
    addProductWatcher(),
    editProductSaga(),
  ]);
}
