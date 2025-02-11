import { call, put, takeLatest } from "redux-saga/effects";
import { apiMethods } from "../../utils/endpoints";
import {
  fetchProductDetails,
  fetchProductDetailsSuccess,
  fetchProductDetailsFailure,
  updateProduct,
  updateProductSuccess,
  updateProductFailure,
} from "../slices/editProdSlice";

function* fetchProductDetailsSaga(action) {
  try {
    const productId = action.payload;
    const response = yield call(
      apiMethods.products.fetchEditUnpublished,
      productId
    );

    if (response.data.code === 200) {
      yield put(fetchProductDetailsSuccess(response.data.product));
    } else {
      throw new Error(
        response.data.message || "Failed to fetch product details"
      );
    }
  } catch (error) {
    yield put(fetchProductDetailsFailure(error.message));
  }
}

// Worker Saga: Update product
function* updateProductSaga(action) {
  try {
    const { id, data } = action.payload;
    const response = yield call(apiMethods.products.update, id, data);

    if (response.data.code === 200) {
      yield put(updateProductSuccess());
    } else {
      throw new Error(response.data.message || "Failed to update product");
    }
  } catch (error) {
    yield put(updateProductFailure(error.message));
  }
}

// Watcher Saga
export function* editProductSaga() {
  yield takeLatest(fetchProductDetails.type, fetchProductDetailsSaga);
  yield takeLatest(updateProduct.type, updateProductSaga);
}

export default editProductSaga;
