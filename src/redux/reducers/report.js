import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    report: {},
    reports: []
}

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        getReport: () => { },
        setReport: (state, action) => {
            const { payload: { report } } = action
            state.report = report
        },
        getReports: () => { },
        setReports: (state, action) => {
            const { payload: { reports } } = action
            state.reports = reports
        }
    }
})

export const { getReport, setReport, getReports, setReports } = reportSlice.actions
export default reportSlice.reducer
