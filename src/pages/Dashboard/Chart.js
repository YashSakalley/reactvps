import React, { useState, useEffect } from 'react'

import Nav from '../../components/Dashboard/Utils/Nav'
import SideBar from '../../components/Dashboard/Utils/SideBar'
import Chart from '../../components/Dashboard/Chart/Chart'
import Axios from 'axios'

export default function Dashboard() {
    const [sideBarOpen, setSideBarOpen] = useState(false)

    let status = [0, 0, 0]

    const [statusProp, setStatusProp] = useState({
        'Approved': 0,
        'pending': 0,
        'rejected': 0
    })

    useEffect(() => {
        console.log('Mounting');
        Axios.get('/reports')
            .then((res) => {
                if (res.data.status === 'success') {
                    let reports = res.data.reports
                    reports.forEach(report => {
                        if (report.status.includes('Approved')) {
                            status[0] += 1
                        } else if (report.status.includes('Rejected')) {
                            status[1] += 1
                        } else {
                            status[2] += 1
                        }
                    });
                }
            })
            .catch((err) => {
                console.log(err)
            })
        console.log(status);
        setStatusProp({
            Approved: status[0],
            pending: status[1],
            rejected: status[2]
        })
    }, [])

    return (
        <div className="flex h-screen bg-gray-200 font-roboto">

            <div
                onClick={() => { setSideBarOpen(false) }}
                className={`fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden ${sideBarOpen ? 'block' : 'hidden'}`}>
            </div>

            <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Nav sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                    <Chart status={statusProp} />
                </main>
            </div>

        </div >
    )
} 
