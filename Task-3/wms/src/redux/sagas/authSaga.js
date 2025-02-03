import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../utils/api";
import { loginRequest, loginSuccess, loginFailure } from "../slices/authSlice";

function* loginSaga(action) {
  try {
    const { email, password } = action.payload;
    // console.log("Login Payload:", action.payload);

    const response = yield call(
      api.post,
      `/api/v1/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          macaddress: "F44EE3CE252F",
        },
      }
    );

    console.log("Login Response:", response.data.user.auth.token);
    yield put(loginSuccess(response.data.user));
  } catch (error) {
    console.error("Login Error:", error);
    console.error("Login Error Response:", error.response);
    yield put(loginFailure(error.response?.data?.message || "Login failed"));
  }
}

export default function* authWatcherSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
}
