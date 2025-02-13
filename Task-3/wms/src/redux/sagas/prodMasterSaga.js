import { call, put, takeLatest, debounce } from "redux-saga/effects";
import { apiMethods } from "../../utils/endpoints";
import {
  fetchProductMasterData,
  fetchProductMasterDataSuccess,
  fetchProductMasterDataFailure,
  fetchManufacturers,
  fetchManufacturersSuccess,
  fetchManufacturersFailure,
  searchManufacturersMaster,
  fetchMolecules,
  fetchMoleculesSuccess,
  fetchMoleculesFailure,
  searchMoleculesMaster,
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

// Watcher saga
export default function* addProductWatcher() {
  yield takeLatest(fetchProductMasterData.type, fetchProductMasterDataSaga);
  yield takeLatest(fetchManufacturers.type, fetchManufacturersSaga);
  yield takeLatest(searchManufacturersMaster.type, searchManufacturersSaga);
  yield takeLatest(fetchMolecules.type, fetchMoleculesSaga);
  yield takeLatest(searchMoleculesMaster.type, searchMoleculesSaga);
}
