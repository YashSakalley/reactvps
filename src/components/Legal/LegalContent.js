import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Axios from 'axios'
import { useState } from 'react'
import SideBar from './Utils/SideBar'
import Nav from './Utils/Nav'

import back from '../../assets/back.png'
import pdfImg from '../../assets/pdf.png'
import ContentCell from '../Dashboard/Content/ContentCell'

export default function LegalContent() {

    const [sideBarOpen, setSideBarOpen] = useState(false)
    let reportId = useParams().reportId
    const [content, setContent] = useState({
        report: {
            _id: '',
            answers: ['', '', '', '', '', '', ''],
            questions: ['', '', '', '', '', '', ''],
            status: '',
            reason: '',
            work: []
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

    const onDeclineHandler = () => {
        Axios.put(`/reports/${content.report._id}`, { status: `Rejected by Legal Authority`, reason: rejectedReason })
            .then((res) => {
                console.log(res)
                history.goBack()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const onAcceptHandler = () => {
        Axios.put(`/reports/${content.report._id}`, { status: `Approved by Legal Authority` })
            .then((res) => {
                console.log(res)
                history.goBack()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const [showTextBox, setShowTextBox] = useState(false)
    const [rejectedReason, setRejectedReason] = useState('')
    const controls =
        <>
            {
                showTextBox
                    ?
                    <div className="w-full m-4">
                        <input
                            type="text"
                            className="text-xl outline-none w-full mt-4 p-4"
                            value={rejectedReason}
                            placeholder="Reason for declining the report"
                            onChange={(event) => setRejectedReason(event.target.value)}
                        ></input>
                        <br />
                        <button
                            onClick={() => { setShowTextBox(false) }}
                            className="mt-4 px-8 py-4 text-base leading-5 border font-medium shadow-sm transition ease-in-out duration-150 focus:outline-none focus:shadow-outline bg-blue-400 text-black-100 hover:bg-blue-600 hover:text-black-500">CANCEL
                            </button>
                        <button
                            onClick={onDeclineHandler}
                            className="mt-4 ml-4 px-8 py-4 text-base leading-5 border font-medium shadow-sm transition ease-in-out duration-150 focus:outline-none focus:shadow-outline bg-red-600 border-red-600 text-gray-100 hover:bg-red-500 hover:border-red-500 hover:text-gray-100">DECLINE
                        </button>
                    </div>
                    :
                    <>
                        <button
                            onClick={onAcceptHandler}
                            className="mt-4 px-8 py-4 text-base leading-5 border font-medium shadow-sm transition ease-in-out duration-150 focus:outline-none focus:shadow-outline bg-green-600 border-green-600 text-gray-100 hover:bg-green-500 hover:text-gray-100">ACCEPT
                        </button>
                        <button
                            onClick={() => { setShowTextBox(true) }}
                            className="mt-4 ml-4 px-8 py-4 text-base leading-5 border font-medium shadow-sm transition ease-in-out duration-150 focus:outline-none focus:shadow-outline bg-red-600 border-red-600 text-gray-100 hover:bg-red-500 hover:border-red-500 hover:text-gray-100">DECLINE
                        </button>
                    </>
            }
        </>

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
                            <div className="flex">
                                <button
                                    onClick={onBackHandler}
                                    className="text-white h-full">
                                    <img
                                        className=""
                                        src={back}
                                        alt="" />
                                </button>
                                {
                                    content.report.status.includes('Approved')
                                        ?
                                        <a
                                            title="Show Generated Pdf"
                                            className="hover:text-red-400"
                                            href={`${process.env.REACT_APP_API_URL}/getPdf/${content.report._id}`}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            {/* <i className="far fa-file-pdf text-3xl "></i> */}
                                            <img src={pdfImg}
                                                className="rounded duration-200 w-16 h-16 hover:bg-red-500"
                                                alt="" />
                                        </a>
                                        : null
                                }
                            </div>
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
                                {
                                    content.report.status.includes('Rejected')
                                        ?
                                        <ContentCell id="REASON FOR REJECTION" value={content.report.reason} />
                                        : null
                                }
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
            <div className="w-1/4 flex flex-col h-full justify-between">
                <div className="p-4">
                    <h1 className="text-2xl">Work Done</h1>
                    <h2 className="text-xl"> Work done during investigation of the report </h2>
                    <div>
                        {
                            content.report.work.map((w, i) => {
                                return <div className="m-4" key={i}>
                                    <span className="text-gray-600 mr-4">{i + 1}</span> <span className="text-xl">{w}</span>
                                </div>
                            })
                        }
                    </div>
                </div>
                {
                    (content.report.status === 'Rejected by Legal Authority' || content.report.status === 'Approved by Legal Authority')
                        ? null
                        :
                        <div className="m-16 ml-6">
                            <div className="w-full">
                                Here you can accept or reject the report, be careful though as this action is irreversible
                            </div>
                            {controls}
                        </div>
                }
            </div>
        </div>
    )
}
