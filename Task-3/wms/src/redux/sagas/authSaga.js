import { call, put, takeLatest } from "redux-saga/effects";
import { apiMethods } from "../../utils/endpoints";
import { loginRequest, loginSuccess, loginFailure } from "../slices/authSlice";

function* loginSaga(action) {
  const { email, password } = action.payload;
  try {
    const response = yield call(apiMethods.auth.login, email, password);

    console.log("Login Response:", response.data.user.auth.token);
    yield put(loginSuccess(response.data.user));
  } catch (error) {
    yield put(loginFailure(error.response?.data?.message || "Login failed"));
  }
}

export default function* authWatcherSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
}
