import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import Nav from 'components/Dashboard/Utils/Nav'
import SideBar from 'components/Dashboard/Utils/SideBar'
import Chart from 'components/Dashboard/Chart/Chart'

import Auth from 'middlewares/Auth'

const Dashboard = () => {
    const [sideBarOpen, setSideBarOpen] = useState(false)

    const [status, setStatus] = useState({})
    useEffect(() => {
        console.log('Mounting');
        Axios.get('/reports/info/count')
            .then((res) => {
                if (res.data.status === 'success') {
                    console.log(res.data);
                    setStatus(res.data.count)
                }
            })
            .catch((err) => {
                console.log(err)
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
                    <Chart status={status} />
                </main>
            </div>

        </div >
    )
}

export default Auth(Dashboard)