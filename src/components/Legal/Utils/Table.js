import React, { useEffect, useState } from 'react'
import Axios from 'axios'

import TableCell from './TableCell'
import Loading from '../../Loading/Loading'

export default function Table() {

    const [reports, setReports] = useState([])

    useEffect(() => {
        Axios.get('/reports')
            .then((res) => {
                let data;
                if (res.data.status === 'success') {
                    data = res.data.reports.filter((report) => (
                        report.status !== 'Pending'
                    ))
                }
                data.reverse()
                setReports(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

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
