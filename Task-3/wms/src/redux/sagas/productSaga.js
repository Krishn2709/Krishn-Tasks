import { takeLatest, put, call, select } from "redux-saga/effects";
import { apiMethods } from "../../utils/endpoints";
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchManufacturersSuccess,
  searchManufacturers,
  fetchMoleculesSuccess,
  searchMolecules,
} from "../slices/productSlice";

function* fetchProductsSaga() {
  try {
    const state = yield select();
    const { filters, sorting, pagination } = state.products;

    const response = yield call(
      apiMethods.products.fetchUnpublished,
      filters,
      sorting,
      pagination
    );

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
    yield put(
      fetchProductsFailure(error.response?.data?.message || error.message)
    );
  }
}

function* searchManufacturersSaga(action) {
  console.log(action.payload);
  console.log(apiMethods.manufacturers.search);

  try {
    const response = yield call(
      apiMethods.manufacturers.list
      // action.payload.searchText
    );
    if (response.data.code === 200) {
      yield put(fetchManufacturersSuccess(response.data.manufacturers));
    }
  } catch (error) {
    console.error("Failed to search manufacturers:", error);
  }
}

function* searchMoleculesSaga(action) {
  try {
    const response = yield call(
      apiMethods.molecules.list
      // action.payload.searchText
    );
    if (response.data.code === 200) {
      yield put(fetchMoleculesSuccess(response.data.molecules));
    }
  } catch (error) {
    console.error("Failed to search molecules:", error);
  }
}

export default function* productSaga() {
  yield takeLatest(fetchProductsRequest.type, fetchProductsSaga);
  yield takeLatest(searchManufacturers.type, searchManufacturersSaga);
  yield takeLatest(searchMolecules.type, searchMoleculesSaga);
}
