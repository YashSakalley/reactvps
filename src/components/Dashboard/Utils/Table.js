import React, { useEffect, useState, useCallback } from 'react'
import Axios from 'axios'

import TableCell from './TableCell'
import { useParams } from 'react-router-dom'
import Loading from '../../Loading/Loading'

export default function Table() {

    const [reports, setReports] = useState([])
    const { role } = useParams();

    const fetchReports = useCallback(
        async () => {
            try {
                const { data: { status, reports } } = await Axios.get('/reports')
                let data;
                if (status === 'success') {
                    if (role === 'sp') {
                        data = reports.filter(({ status }) => (
                            status === 'Rejected by SHO' ||
                            status === 'Rejected by SP' ||
                            status === "Approved by SP"
                        ))
                    } else if (role === 'io') {
                        data = reports.filter(({ status }) => (
                            status === 'Approved' ||
                            status === 'Approved by SHO' ||
                            status === 'Approved by SP' ||
                            status === 'Approved by IO' ||
                            status === 'Rejected by IO' ||
                            status === 'Accepted by IO'
                        ))
                    } else if (role === 'sho') {
                        data = reports
                    } else {
                        data = [{
                            crime: 'Invalid URL: ' + role
                        }]
                    }
                }
                data.reverse()
                setReports(data)
            } catch (err) {
                console.log(err)
            }
        },
        [role]
    )

    useEffect(() => {
        fetchReports()
    }, [fetchReports])

    return (
        <div className="container px-8 ">
            {reports === []
                ?
                <Loading />
                : null}
            <div className="py-8 w-full">
                <div className="shadow-xl overflow-auto rounded border-b border-gray-200">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="w-1/5 text-left py-3 px-4 font-semibold text-sm">CRIME</th>
                                <th className="w-1/5 text-left py-3 px-4 font-semibold text-sm">DATE</th>
                                <th className="w-1/5 text-left py-3 px-4 font-semibold text-sm">TIME</th>
                                <th className="w-1/5 text-left py-3 px-4 font-semibold text-sm">STATUS</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {
                                reports.map((report, i) => (
                                    <TableCell
                                        crime={report.crime}
                                        time={report.time}
                                        status={report.status}
                                        bg={i % 2 !== 0 ? 'dark' : 'light'}
                                        id={report._id}
                                        key={i} />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
