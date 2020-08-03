import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Axios from 'axios'
import { useState } from 'react'
import SideBar from './Utils/SideBar'
import Nav from './Utils/Nav'

import back from '../../assets/back.png'
import ContentCell from '../Dashboard/Content/ContentCell'

export default function LegalContent() {

    const [sideBarOpen, setSideBarOpen] = useState(false)
    let reportId = useParams().reportId
    const [content, setContent] = useState({
        report: {
            answers: ['', '', '', '', '', '', ''],
            questions: ['', '', '', '', '', '', ''],
            status: ''
        },
        user: {}
    })
    const [showDetails, setShowDetails] = useState(false)

    let history = useHistory()
    const onBackHandler = () => {
        history.goBack()
    }

    let d = new Date(content.report.time)
    d = d.toString()
    d = d.split(' ')
    let Time = d[4]
    let date = `${d[2]} ${d[1]} ${d[3]}`

    useEffect(() => {
        Axios.get(`/reports/${reportId}`)
            .then((res) => {
                console.log('content', res);
                if (res.data.status === 'success') {
                    setContent({
                        report: res.data.report,
                        user: res.data.user
                    })
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
                    <div className="container px-6 pt-8 bg-gray-200">
                        <div className="flex justify-between items-center">
                            <button
                                onClick={onBackHandler}
                                className="text-white h-full">
                                <img
                                    className=""
                                    src={back}
                                    alt="" />
                            </button>
                            <h1 className="text-3xl">DETAILED REPORT</h1>
                        </div>
                        <table className="text-left w-full mt-4 bg-white text-lg shadow-xl">
                            <tbody className="bg-grey-light flex flex-col items-center justify-between w-full">
                                <ContentCell id="AADHAAR NUMBER" value={content.user.uid} />
                                <ContentCell id="FULLNAME" value={`${content.user.first_name} ${content.user.last_name}`} />
                                <ContentCell id="SUBMITTED ON (DATE AND TIME)" value={`${date} ${Time}`} />
                                <ContentCell id="CRIME RELATED" value={content.report.crime} />
                                <ContentCell id="PLACE" value="BHOPAL" />
                                <ContentCell id="STATUS" value={content.report.status} />
                            </tbody>
                        </table>
                        <h1
                            className="text-3xl mx-2 my-5"
                            onClick={() => setShowDetails(!showDetails)}>
                            Details
                    <span className="float-right text-base text-blue-400 cursor-pointer">
                                {showDetails ? 'HIDE' : 'SHOW'}
                            </span>
                        </h1>
                        {
                            showDetails
                                ?
                                <table className="text-left w-full mt-4 bg-white text-lg shadow-xl">
                                    <tbody className="bg-grey-light flex flex-col items-center justify-between w-full">
                                        {
                                            content.report.answers.map((answer, i) => (
                                                <ContentCell
                                                    key={i}
                                                    id={content.report.questions[i].toUpperCase()}
                                                    value={answer} />
                                            ))
                                        }
                                    </tbody>
                                </table>
                                : null
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}
