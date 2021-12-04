import axios from 'axios'

export const requestGetReport = (id) => axios.get(`/countries?sport_id=${id}`)
export const requestGetReports = () => axios.get('/sports')
