import { takeLatest } from 'redux-saga/effects'

import { getReport, getReports } from 'redux/reducers/report'

import { handleGetReport, handleGetReports } from 'redux/saga/handlers/report'

export default function* watcherSaga() {
    yield takeLatest(getReport.type, handleGetReport)
    yield takeLatest(getReports.type, handleGetReports)
}
