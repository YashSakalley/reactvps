import React from 'react'

import pendingImg from '../../../assets/pending.webp'
import approvedImg from '../../../assets/approved.webp'
import rejectedImg from '../../../assets/rejected.webp'

const Status = ({ pending, approved, rejected }) => {
    return (
        <>
            <div className="container mx-auto px-6 py-8">
                <h3 className="text-gray-700 text-3xl font-medium">Dashboard</h3>

                <div className="mt-4">
                    <div className="flex flex-wrap -mx-6">
                        <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-yellow-400">
                                <img src={pendingImg}
                                    className="h-16 w-22 text-white" alt="" />
                                <div className="mx-5">
                                    <h4 className="text-2xl text-black font-black">{pending}</h4>
                                    <div className="text-gray-600 text-2xl">PENDING</div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-green-300">
                                <img src={approvedImg}
                                    className="h-16 w-22 text-white" alt="" />
                                <div className="mx-5">
                                    <h4 className="text-2xl text-black font-black">{approved}</h4>
                                    <div className="text-gray-600 text-2xl">APPROVED FIR</div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-red-400">
                                <img src={rejectedImg}
                                    className="h-16 w-22 text-white" alt="" />
                                <div className="mx-5">
                                    <h4 className="text-2xl text-black font-black">{rejected}</h4>
                                    <div className="text-white text-2xl">REJECTED FIR</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Status