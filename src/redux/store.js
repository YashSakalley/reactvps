import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from '@redux-saga/core'

import reportReducer from 'redux/reducers/report'

import watcherSaga from './saga/rootSaga'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        report: reportReducer
    },
    middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]
})
sagaMiddleware.run(watcherSaga)

export default store
