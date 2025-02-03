import { all } from "redux-saga/effects";
import authWatcherSaga from "./authSaga";
import productSaga from "./productSaga";

export default function* rootSaga() {
  yield all([authWatcherSaga(), productSaga()]);
}
