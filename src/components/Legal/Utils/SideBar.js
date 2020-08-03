import React from 'react'
import { NavLink } from 'react-router-dom'
import Cookies from 'js-cookie'

import police_officer_dashboard from '../../../assets/police_officer_dashboard.png'

export default function SideBar({ sideBarOpen, setSideBarOpen }) {

    const onLogout = () => {
        Cookies.remove('user')
        Cookies.remove('token')
        Cookies.remove('role')
    }

    let roleLabel = 'Legal Officer'


    return (
        <div
            className={`fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0 ${sideBarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'}`}
        >
            <div className="flex items-center justify-center mt-8">
                <div className="items-center flex flex-col">
                    <img src={police_officer_dashboard} className="w-26 h-32" alt="" />
                    <div className="my-2 text-white text-xl text-center border-2 border-white p-2">{roleLabel}</div>
                </div>
            </div>

            <nav className="mt-10">
                <NavLink
                    activeClassName="flex items-center mt-4 py-2 px-6 block border-l-4 bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100"
                    to={`/legal`}
                    className="flex items-center mt-4 py-2 px-6 block text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M2 10C2 5.58172 5.58172 2 10 2V10H18C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
                            fill="currentColor" />
                        <path d="M12 2.25195C14.8113 2.97552 17.0245 5.18877 17.748 8.00004H12V2.25195Z"
                            fill="currentColor" />
                    </svg>

                    <div className="mx-4 uppercase">
                        Dashboard
                    </div>
                </NavLink>





                <NavLink
                    onClick={onLogout}
                    exact
                    activeClassName="flex items-center mt-4 py-2 px-6 block border-l-4 bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100"
                    to=""
                    className="flex items-center mt-4 py-2 px-6 block text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
                >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z">
                        </path>
                        <path fillRule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clipRule="evenodd"></path>
                    </svg>

                    <span className="mx-4">LOGOUT</span>
                </NavLink>
            </nav>
        </div>
    )
}
