import React, { useState } from 'react'

import Nav from '../../components/Dashboard/Nav'
import Status from '../../components/Dashboard/Status'
import SideBar from '../../components/Dashboard/SideBar'
import Search from '../../components/Dashboard/Search'
import Table from '../../components/Dashboard/Table'
import { useParams } from 'react-router-dom'

export default function Dashboard() {
    const [sideBarOpen, setSideBarOpen] = useState(false)
    console.log(useParams())

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
                        pending='4'
                        approved='3'
                        rejected='2' />
                    <Search />
                    <Table />
                </main>
            </div>

        </div >
    )
} 
