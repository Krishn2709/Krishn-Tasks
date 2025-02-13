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
  fetchMolecules,
  fetchManufacturers,
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

function* fetchManufacturersSaga() {
  try {
    const response = yield call(apiMethods.manufacturers.list);
    if (response.data.code === 200) {
      yield put(fetchManufacturersSuccess(response.data.manufacturers));
    }
  } catch (error) {
    console.error("Failed to search manufacturers:", error);
  }
}

function* searchManufacturersSaga(action) {
  try {
    const response = yield call(
      apiMethods.manufacturers.search,
      action.payload
    );
    if (response.data.code === 200) {
      yield put(fetchManufacturersSuccess(response.data.manufacturers));
    }
  } catch (error) {
    console.error("Failed to search manufacturers:", error);
  }
}

function* fetchMoleculesSaga() {
  try {
    const response = yield call(apiMethods.molecules.list);
    if (response.data.code === 200) {
      yield put(fetchMoleculesSuccess(response.data.molecules));
    }
  } catch (error) {
    console.error("Failed to search molecules:", error);
  }
}

function* searchMoleculesSaga(action) {
  try {
    const response = yield call(apiMethods.molecules.search, action.payload);
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
  yield takeLatest(fetchManufacturers.type, fetchManufacturersSaga);
  yield takeLatest(fetchMolecules.type, fetchMoleculesSaga);
}
