import React, { useState } from 'react'

import Nav from 'components/Dashboard/Utils/Nav'
import SideBar from 'components/Dashboard/Utils/SideBar'
import { useParams } from 'react-router-dom'
import Content from 'components/Dashboard/Content/Content'
import IoContent from 'components/Dashboard/Io/IoContent'

import Auth from 'middlewares/Auth'

const Dashboard = () => {
    const reportId = useParams().reportId
    const role = useParams().role
    const [sideBarOpen, setSideBarOpen] = useState(false)
    return (
        <div className="flex h-screen bg-gray-200 font-roboto">

            <div
                onClick={() => { setSideBarOpen(false) }}
                className={`fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden ${sideBarOpen ? 'block' : 'hidden'}`}>
            </div>

            <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Nav sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
                {
                    role === 'io'
                        ?
                        <IoContent id={reportId} />
                        :
                        <Content id={reportId} />
                }
            </div>

        </div >
    )
}

export default Auth(Dashboard)