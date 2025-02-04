import { takeLatest, put, call, select } from "redux-saga/effects";
import api from "@/utils/api";
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchManufacturersSuccess,
  searchManufacturers,
  fetchMoleculesSuccess,
  searchMolecules,
} from "../slices/productSlice";

// Helper to build URL with filters
const buildFilterUrl = (state) => {
  const { filters, sorting, pagination } = state.products;
  let url = `/api/v1/master/products/unpublished?sort_by=${sorting.field},${sorting.direction}&page=${pagination.currentPage}`;

  if (filters.searchText) {
    url += `&search=${filters.searchText},${filters.searchField}`;
  }
  if (filters.isAssured) {
    url += `&is_assured=${filters.isAssured}`;
  }
  if (filters.isRefrigerated) {
    url += `&is_refrigerated=${filters.isRefrigerated}`;
  }
  if (filters.status) {
    url += `&publish_status=${filters.status}`;
  }
  if (filters.manufacturer) {
    url += `&manufacturer=${filters.manufacturer}`;
  }
  if (filters.combination) {
    url += `&combination=${filters.combination}`;
  }

  return url;
};

function* fetchProductsSaga() {
  try {
    const state = yield select();
    const url = buildFilterUrl(state);
    const response = yield call(api.get, url);

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
  try {
    const response = yield call(
      api.get,
      `/api/v1/master/manufacturers?search=${action.payload},name`
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
      api.get,
      `/api/v1/master/molecules?search=${action.payload},name`
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
