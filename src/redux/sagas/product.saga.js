import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { PRODUCT_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* getProductListSaga(action) {
  // Gọi API lấy danh sách sản phẩm từ server
  try {
    const { limit, page, categoryId, keyword, more } = action.payload;
    const result = yield axios.get(`http://localhost:4000/products`, {
      params: {
        _limit: limit,
        _page: page,
        _expand: "category",
        ...categoryId && { categoryId },
        ...keyword && { q: keyword },
      },
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        data: result.data,
        meta: {
          page,
          total: parseInt(result.headers["x-total-count"]),
        },
        more,
      },
    });
  } catch (e) {
    yield put({ type: FAIL(PRODUCT_ACTION.GET_PRODUCT_LIST), payload: { error: 'Lấy không được' } });
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/products/${id}`);
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: { data: result.data },
    });
  } catch (e) {
    yield put({ type: FAIL(PRODUCT_ACTION.GET_PRODUCT_DETAIL), payload: { error: 'Lấy không được' } });
  }
}

function* createProductSaga(action) {
  try {
    const { data, callback } = action.payload;
    yield axios.post("http://localhost:4000/products", data);
    yield put({
      type: SUCCESS(PRODUCT_ACTION.CREATE_PRODUCT),
    });
    yield callback.goBackList();
  } catch (e) {
    yield put({ type: FAIL(PRODUCT_ACTION.CREATE_PRODUCT), payload: { error: 'Lấy không được' } });
  }
}

function* updateProductSaga(action) {
  try {
    const { id, data, callback } = action.payload;
    yield axios.patch(`http://localhost:4000/products/${id}`, data);
    yield put({
      type: SUCCESS(PRODUCT_ACTION.UPDATE_PRODUCT),
    });
    yield callback.goBackList();
  } catch (e) {
    yield put({ type: FAIL(PRODUCT_ACTION.UPDATE_PRODUCT), payload: { error: 'Lấy không được' } });
  }
}

function* deleteProductSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`http://localhost:4000/products/${id}`);
    yield put({
      type: SUCCESS(PRODUCT_ACTION.DELETE_PRODUCT),
    });
    yield put({
      type: REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: { limit: 10, page: 1 }
    });
  } catch (e) {
    yield put({ type: FAIL(PRODUCT_ACTION.DELETE_PRODUCT), payload: { error: 'Lấy không được' } });
  }
}

export default function* productSaga() {
  yield takeEvery(REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST), getProductListSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL), getProductDetailSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.CREATE_PRODUCT), createProductSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.UPDATE_PRODUCT), updateProductSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.DELETE_PRODUCT), deleteProductSaga);
}
