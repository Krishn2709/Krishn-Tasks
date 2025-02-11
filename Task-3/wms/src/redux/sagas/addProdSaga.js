import { call, put, takeLatest } from "redux-saga/effects";
import {
  postProductRequest,
  postProductSuccess,
  postProductFailure,
  fetchB2CProducts,
  fetchB2CProductsSuccess,
  fetchB2CProductsFailure,
} from "../slices/addProdSlice";
import { apiMethods } from "@/utils/endpoints";

function* postProductSaga(action) {
  try {
    yield call(apiMethods.products.create, action.payload);
    yield put(postProductSuccess());
  } catch (error) {
    yield put(
      postProductFailure(error.response?.data || "Something went wrong")
    );
  }
}

function* fetchB2CProductsSaga() {
  try {
    console.log(apiMethods.b2cProducts.list);

    const response = yield call(apiMethods.b2cProducts.list);
    // console.log("response", response.data.b2cPricing);

    yield put(fetchB2CProductsSuccess(response.data.b2cPricing));
  } catch (error) {
    yield put(
      fetchB2CProductsFailure(error.response?.data?.message || "Network error")
    );
  }
}

export default function* watchPostProduct() {
  yield takeLatest(postProductRequest.type, postProductSaga);
  yield takeLatest(fetchB2CProducts.type, fetchB2CProductsSaga);
}
