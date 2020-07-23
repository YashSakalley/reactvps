import React, { useState } from 'react'

import axios from 'axios'
import StatusResult from './StatusResult'

export default function Status() {

    const [form, setform] = useState({
        reportId: ''
    })

    const [msg, setMsg] = useState(false)
    const [result, setResult] = useState(false)

    const changeHandler = (e) => {
        setform({ reportId: e.target.value })
    }

    const submitHandler = () => {
        setMsg('Checking. Please Wait')

        axios.get(`/reports/${form.reportId}`)
            .then((response) => {
                if (response.data.status === 'success') {
                    setMsg('Found')
                    setResult(response.data.report.status)
                } else {
                    setMsg(response.data.msg)
                    console.log(response);
                }
            })
            .catch((error) => {
                setMsg('Invalid report id')
                setResult(false)
                console.log(error);
            })

    }

    return (
        <>
            <div style={{ backgroundImage: "url('https://i.imgur.com/aB4Om3L.png')", backgroundSize: 'cover' }}>
                <div id="status-section"
                    style={{ background: 'linear-gradient(45deg, #0f121b, #223996)' }}
                    className="bg-black font-black text-white text-2xl mx-12 p-5 border-l-8 border-purple-500">
                    <div>
                        CHECK STATUS
                    </div>
                </div>
                <div className="py-6">
                    <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx- 2 sm:mx-24 ">
                        <div className="hidden lg:block lg:w-1/2 bg-cover" style={{ backgroundImage: "url('https://svitla.com/uploads/0/2135-database_management_software.jpg')" }}></div>
                        <div className="w-full p-8 lg:w-1/2">
                            <div className="flex justify-center">
                                <img src="https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/512/Docs-icon.png" className="w-34 h-32" alt="Check Status" />
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="border-b w-1/5 lg:w-1/4"></span>
                                <a href="/" className="text-xl text-center text-gray-500 uppercase">CHECK YOUR report STATUS</a>
                                <span className="border-b w-1/5 lg:w-1/4"></span>
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2"></label>
                                <input
                                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                    type="text"
                                    name="reportId"
                                    onChange={changeHandler}
                                    value={form.reportId} />
                            </div>
                            <div className="mt-4">
                                <button
                                    className="bg-gray-700 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
                                    onClick={submitHandler}>
                                    SUBMIT
                                </button>
                            </div>
                            <div style={{ textAlign: 'center', color: 'red' }}>{msg ? msg : null}</div>
                        </div>
                    </div>
                    {
                        result
                            ?
                            <StatusResult result={result} reportId={form.reportId} />
                            : null
                    }
                </div>
            </div>
        </>
    );
};