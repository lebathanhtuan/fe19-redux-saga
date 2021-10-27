import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import {
  commonReducer,
  productReducer,
  userReducer,
  taskReducer,
  categoryReducer,
} from './redux/reducers'
import rootSaga from './redux/sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    commonReducer,
    productReducer,
    userReducer,
    taskReducer,
    categoryReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
})

sagaMiddleware.run(rootSaga);
