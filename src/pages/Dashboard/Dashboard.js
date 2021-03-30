import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import Nav from 'components/Dashboard/Utils/Nav'
import Status from 'components/Dashboard/Utils/Status'
import SideBar from 'components/Dashboard/Utils/SideBar'
import Search from 'components/Dashboard/Utils/Search'
import Table from 'components/Dashboard/Utils/Table'

import Auth from 'middlewares/Auth'

const Dashboard = () => {
    const [sideBarOpen, setSideBarOpen] = useState(false)
    const [count, setCount] = useState({
        approved: 0,
        rejected: 0,
        pending: 0
    })

    useEffect(() => {
        Axios.get('/reports/info/count')
            .then(res => {
                if (res.data.status === 'success') {
                    let { approved, pending, rejected } = res.data.count
                    console.log(approved, pending, rejected);
                    setCount({
                        approved: approved,
                        rejected: rejected,
                        pending: pending
                    })
                }
            })
            .catch(err => {
                console.log(err);
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
                    <Status
                        pending={count.pending}
                        approved={count.approved}
                        rejected={count.rejected} />
                    <Search />
                    <Table />
                </main>
            </div>

        </div >
    )
}

export default Auth(Dashboard)