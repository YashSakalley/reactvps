import React, { useState } from 'react'
import axios from 'axios'

import StatusResult from './StatusResult'

import wallpaper from '../../../assets/landing_wallpaper.jpg'
import circuit from '../../../assets/circuit.jpg'
import doc from '../../../assets/doc.png'
import { Link } from 'react-router-dom'

export default function Status() {

    const [form, setform] = useState({
        reportId: ''
    })

    const [msg, setMsg] = useState(false)
    const [result, setResult] = useState('')
    const [work, setWork] = useState([])

    const changeHandler = (e) => {
        setform({ reportId: e.target.value })
    }

    const submitHandler = () => {
        setMsg('Checking. Please Wait')

        axios.get(`/reports/${form.reportId}`)
            .then((response) => {
                console.log(response);
                if (response.data.status === 'success') {
                    setMsg('Found')
                    setResult(response.data.report.status)
                    setWork(response.data.report.work)
                } else {
                    setMsg('Invalid report id')
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
            <div
                style={{
                    backgroundImage: `url(${wallpaper})`,
                    backgroundSize: 'cover'
                }}>
                <div id="status-section"
                    style={{ background: 'linear-gradient(45deg, #0f121b, #223996)' }}
                    className="bg-black font-black text-white text-2xl mx-12 p-5 border-l-8 border-purple-500">
                    <div>
                        CHECK STATUS
                    </div>
                </div>
                <div className="py-6">
                    <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx- 2 sm:mx-24 ">
                        <div className="hidden lg:block lg:w-1/2 bg-cover"
                            style={{
                                backgroundImage: `url(${circuit})`
                            }}></div>
                        <div className="w-full p-8 lg:w-1/2">
                            <div className="flex justify-center">
                                <img src={doc}
                                    className="w-34 h-32" alt="Check Status" />
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
                            <div className="h-4" style={{ textAlign: 'center', color: 'red' }}>{msg ? msg : null}</div>
                        </div>
                    </div>
                    {
                        result.includes('Rejected')
                            ?
                            <div className="bg-white flex-col lg:flex-row flex justify-between items-center rounded-lg shadow-lg overflow-hidden m-2 p-5 sm:mx-24">
                                <div>
                                    As your report is Rejected, you can review the report you provided, before it reaches the Superintendant of Police for review, to update the contents of the report
                                </div>
                                <Link
                                    className="uppercase mt-4 lg:m-2 bg-orange-400 px-4 p-2 rounded"
                                    to={`/editReport/${form.reportId}`}>
                                    Update
                                </Link>
                            </div>
                            :
                            <div>
                                Heloo
                            </div>
                    }
                    {console.log(result)}
                    {
                        result !== ''
                            ?
                            <StatusResult
                                work={work}
                                result={result}
                                reportId={form.reportId} />
                            : null
                    }

                </div>
            </div>
        </>
    );
};