import { call, put, takeLatest } from "redux-saga/effects";
import { apiMethods } from "../../utils/endpoints";
import {
  fetchProductMasterData,
  fetchProductMasterDataSuccess,
  fetchProductMasterDataFailure,
} from "../slices/prodMasterSlice";

function* fetchProductMasterDataSaga() {
  try {
    const response = yield call(apiMethods.products.masterData);
    if (response.data.code === 200) {
      yield put(fetchProductMasterDataSuccess(response.data.productMasterData));
    } else {
      yield put(
        fetchProductMasterDataFailure("Failed to fetch product master data")
      );
    }
  } catch (error) {
    yield put(
      fetchProductMasterDataFailure(
        error.response?.data?.message || "Network error"
      )
    );
  }
}

export default function* addProductWatcher() {
  yield takeLatest(fetchProductMasterData.type, fetchProductMasterDataSaga);
}
