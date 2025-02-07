// addProdSaga.js
import { call, put, takeLatest, debounce } from "redux-saga/effects";
import { apiMethods } from "../../utils/api";
import {
  fetchProductMasterData,
  fetchProductMasterDataSuccess,
  fetchProductMasterDataFailure,
  fetchManufacturers,
  fetchManufacturersSuccess,
  fetchManufacturersFailure,
  searchManufacturers,
  fetchMolecules,
  fetchMoleculesSuccess,
  fetchMoleculesFailure,
  searchMolecules,
  addProduct,
  addProductSuccess,
  addProductFailure,
} from "../slices/addProdSlice";

// Saga workers
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

function* fetchManufacturersSaga() {
  try {
    const response = yield call(apiMethods.manufacturers.list);
    yield put(fetchManufacturersSuccess(response.data.data));
  } catch (error) {
    yield put(
      fetchManufacturersFailure(
        error.response?.data?.message || "Network error"
      )
    );
  }
}

function* searchManufacturersSaga(action) {
  try {
    const response = yield call(
      apiMethods.manufacturers.search,
      action.payload
    );
    yield put(fetchManufacturersSuccess(response.data.data));
  } catch (error) {
    yield put(
      fetchManufacturersFailure(
        error.response?.data?.message || "Network error"
      )
    );
  }
}

function* fetchMoleculesSaga() {
  try {
    const response = yield call(apiMethods.molecules.list);
    yield put(fetchMoleculesSuccess(response.data.data));
  } catch (error) {
    yield put(
      fetchMoleculesFailure(error.response?.data?.message || "Network error")
    );
  }
}

function* searchMoleculesSaga(action) {
  try {
    const response = yield call(apiMethods.molecules.search, action.payload);
    yield put(fetchMoleculesSuccess(response.data.data));
  } catch (error) {
    yield put(
      fetchMoleculesFailure(error.response?.data?.message || "Network error")
    );
  }
}

function* addProductSaga(action) {
  try {
    const response = yield call(apiMethods.products.create, action.payload);
    if (response.data.code === 200) {
      yield put(addProductSuccess());
      // You might want to add a toast notification here
    } else {
      yield put(addProductFailure("Failed to add product"));
    }
  } catch (error) {
    yield put(
      addProductFailure(error.response?.data?.message || "Network error")
    );
  }
}

// Watcher saga
export default function* addProductWatcher() {
  yield takeLatest(fetchProductMasterData.type, fetchProductMasterDataSaga);
  yield takeLatest(fetchManufacturers.type, fetchManufacturersSaga);
  yield debounce(300, searchManufacturers.type, searchManufacturersSaga);
  yield takeLatest(fetchMolecules.type, fetchMoleculesSaga);
  yield debounce(300, searchMolecules.type, searchMoleculesSaga);
  yield takeLatest(addProduct.type, addProductSaga);
}
