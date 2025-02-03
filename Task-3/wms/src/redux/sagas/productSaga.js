import { takeLatest, put, call } from "redux-saga/effects";

import api from "@/utils/api";
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "../slices/productSlice";

function* fetchProductsSaga(action) {
  try {
    // console.log("Saga: Making API call for page:", action.payload);
    const response = yield call(
      api.get,
      `/api/v1/master/products/unpublished?sort_by=created,d&page=${action.payload}`
    );
    // console.log("Saga: API Response:", response.data);

    if (response.data.code === 200) {
      yield put(fetchProductsSuccess(response.data));
    } else {
      yield put(
        fetchProductsFailure(
          response.data.message || "Failed to fetch products"
        )
      );
    }
  } catch (error) {
    console.error("Saga: API Error:", error);
    yield put(
      fetchProductsFailure(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while fetching products"
      )
    );
  }
}

export default function* productSaga() {
  yield takeLatest(fetchProductsRequest.type, fetchProductsSaga);
}
