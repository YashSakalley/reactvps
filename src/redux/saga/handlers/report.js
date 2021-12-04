import { put, call } from "@redux-saga/effects"

import { requestGetReport, requestGetReports } from 'redux/saga/requests/report'

import { setReport, setReports } from "redux/reducers/report"

export function* handleGetReport(action) {
    try {
        const { payload: { id } } = action
        const { data } = yield call(requestGetReport, id)
        yield put(setReport({ ...data }));
    } catch (error) {
        yield
    }
}

export function* handleGetReports() {
    try {
        const { data } = yield call(requestGetReports)
        yield put(setReports({ ...data }));
    } catch (error) {
        yield
    }
}
