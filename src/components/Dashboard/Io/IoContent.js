import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

import IoMedia from './IoMedia'

import down from '../../../assets/down.png'
import left from '../../../assets/left.png'

const Content = ({ id }) => {
    const initialContent = useMemo(() => ({
        report: {
            _id: '',
            answers: ['', '', '', '', '', '', ''],
            questions: ['', '', '', '', '', '', ''],
            media_files: [],
            work: [],
            private_work: [],
            status: ''
        },
        user: {}
    }), [])
    const [content, setContent] = useState(initialContent)
    const [showDetails, setShowDetails] = useState(false)
    const [showAnalytics, setShowAnalytics] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [showPrivateUpdate, setShowPrivateUpdate] = useState(false)
    const [showNotes, setShowNotes] = useState(false)
    const [work, setWork] = useState('')
    const [msg, setMsg] = useState(null)
    const [publishMsg, setPublishMsg] = useState(null)
    const [showTextBox, setShowTextBox] = useState(false)
    const [rejectedReason, setRejectedReason] = useState('')
    const history = useHistory()
    const { role } = useParams()
    
    const onSubmitWork = async (vis) => {
        if (work === '') 
            return
        setMsg('Saving')
        try {
            const res = await axios.put(`/reports/work/${content.report._id}/${vis === 'public' ? 'public' : 'private'}`, {work: work})
            console.log(res);
            setMsg('Saved')
            window.location.reload()
        } catch (err) {
            console.log(err);
            setMsg('Error saving')
        }
    }

    const onPublishWork = async () => {
        try {
            await axios.put(`/reports/show_work/${content.report._id}`)
            setPublishMsg('Published Successfully')
        } catch (err) {
            console.log(err);
            setPublishMsg('Error occurred')
        }
    }

    const onHideWork = async () => {
        try {
            await axios.put(`/reports/hide_work/${content.report._id}`)
            setPublishMsg('Hidden Successfully')
        } catch (err) {
            console.log(err);
            setPublishMsg('Error occurred')
        }
    }

    let d = new Date(content.report.time)
    d = d.toString()
    d = d.split(' ')
    let Time = d[4]
    let date = `${d[2]} ${d[1]} ${d[3]}`

    const fetchReport = useCallback(
        async (id) => {
            try {
                const { data } = await axios.get(`/reports/${id}`)
                if (data.status !== 'success') throw new Error("Error: Success not found")
                const { report, user } = data
                setContent({
                    report,
                    user
                })
            } catch (err) {
                console.log(err)
            }
        },
        []
    )

    useEffect(() => {
        fetchReport(id)
    }, [fetchReport, id])

    const onDeclineHandler = async () => {
        try {
            const res = await axios.put(`/reports/${content.report._id}`, { status: `Rejected by ${role.toUpperCase()}`, reason: rejectedReason })
            console.log(res);
            history.goBack()
        } catch (err) {
            console.log(err)
        }
    }

    const onAcceptHandler = async () => {
        try {
            const res = await axios.put(`/reports/${content.report._id}`, { status: `Approved by ${role.toUpperCase()}` })
            console.log(res)
            history.goBack()
        } catch (err) {
            console.log(err)
        }
    }

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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">

            {/* Notes Box Button*/}
            <div className="fixed bottom-0 z-20 right-0 w-16 h-16 mr-12 mb-8 cursor-pointer"
                onClick={() => setShowNotes(!showNotes)}>
                <img src="https://devrolabs.com/image/tabnote.png" alt="" />
            </div>

            {/* Notes Box */}
            <div
                className={`${showNotes ? 'block' : 'hidden'} z-20 rounded-lg bg-white shadow-xl fixed bottom-0 right-0 w-64 h-64 mr-12 mb-32`}>
                <div className="bg-gray-900 text-white text-xl p-2 rounded-lg">NOTES</div>
                <div className="p-2">
                    <textarea className="bg-gray-100 w-full h-32 p-2 focus:outline-none"
                        placeholder="Write here !"></textarea>
                </div>
                <button className="bg-teal-500 text-white p-2 mx-2 absolute right-0">SAVE</button>
            </div>

            <div className="container mx-auto px-6 py-8">

                {/* Content Header */}
                <div className="flex shadow-lg text-2xl font-bold bg-white p-5">
                    IO DASHBOARD CONTENT
                </div>

                <div className="relative">
                    {/* Report Details Header */}
                    <div
                        onClick={() => setShowDetails(!showDetails)}
                        className={`${showDetails ? 'bg-gray-900' : ''} mt-16 border-l-8 border-black bg-gray-600 text-white text-2xl p-4 px-8 cursor-pointer accordion_1 flex`}>
                        REPORT DETAILS
                    <img src={showDetails ? left : down} id="down_ico"
                            className={`absolute right-0 mr-8 w-8`} alt="" />
                    </div>

                    {/* Report Details Content */}
                    <div className={`${showDetails ? 'block' : 'hidden'} bg-white p-5`} id="panel_1">
                        <table className="text-left w-full mt-4 bg-white text-lg shadow-xl">
                            <tbody className="bg-grey-light flex flex-col items-center justify-between w-full">
                                <tr className="flex w-full mb-4">
                                    <td className="p-4 w-1/3">AADHAAR NUMBER :</td>
                                    <td className="p-4 w-1/3">{content.user.uid}</td>
                                    <td className="w-1/3">
                                        <div className="shadow-xl">
                                            <table className="text-left w-full mx-2">
                                                <tbody className="flex flex-col">
                                                    <tr className="flex w-full mb-4">
                                                        <td className="w-1/2"> STATUS:</td>
                                                        <td className="w-1/2"> {content.report.status}</td>
                                                    </tr>
                                                    <tr className="flex w-full mb-4">
                                                        <td className="w-1/2"> CRIME:</td>
                                                        <td className="w-1/2"> {content.report.crime}</td>
                                                    </tr>
                                                    <tr className="flex w-full mb-4">
                                                        <td className="w-1/2"> SUBMITTED ON:</td>
                                                        <td className="w-1/2"> {date}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                                <tr className="flex w-full mb-4">
                                    <td className="p-4 w-1/3">FULLNAME :</td>
                                    <td className="p-4 w-1/3">{content.user.first_name} {content.user.last_name}</td>
                                </tr>
                                <tr className="flex w-full mb-4">
                                    <td className="p-4 w-1/3">SUBMITTED ON (DATE AND TIME):</td>
                                    <td className="p-4 w-1/3">{Time} {date}</td>
                                </tr>
                                <tr className="flex w-full mb-4">
                                    <td className="p-4 w-1/3">CRIME RELATED:</td>
                                    <td className="p-4 w-1/3">{content.report.crime}</td>
                                </tr>
                                <tr className="flex w-full mb-4">
                                    <td className="p-4 w-1/3">PLACE:</td>
                                    <td className="p-4 w-1/3">{content.report.answers[1]}</td>
                                </tr>
                                <tr className="flex w-full mb-4">
                                    <td className="p-4 w-1/3">DESCRIPTION GIVEN:</td>
                                    <td className="p-4 w-1/3">{content.report.answers[6]}</td>
                                </tr>
                                <tr className="flex w-full mb-4">
                                    <td className="p-4 w-1/3">WITNESS:</td>
                                    <td className="p-4 w-1/3">{content.report.answers[5]}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="relative">
                    {/* Resource Analysis Header */}
                    <div
                        onClick={() => setShowAnalytics(!showAnalytics)}
                        className={`${showAnalytics ? 'bg-gray-900' : ''} border-l-8 border-black mt-4 bg-gray-600 text-white text-2xl p-4 px-8 cursor-pointer accordion_2`}>
                        RESOURCE ANALYZE
                    
                    </div>

                    {/* Resource Analysis Content */}
                    <div className={`${showAnalytics ? 'block' : 'hidden'} p-5 bg-white`} id="panel_2">
                        <h1 className="text-xl">
                            Here you can use our various analytics tools
                        </h1>
                        {
                            content.report.media_files ?
                                content.report.media_files.map((media, i) => {
                                    return <IoMedia key={i} index={1} src={media} />
                                })
                                :
                                <div className="mt-4 text-xl text-gray-600">
                                    No evidence media uploaded by the complainant
                            </div>
                        }
                    </div>
                </div>

                {/* Update Status Header */}
                <div
                    onClick={() => setShowUpdate(!showUpdate)}
                    className={`${showUpdate ? 'bg-gray-900' : ''} mt-16 border-l-8 border-black bg-gray-600 text-white text-2xl p-4 px-8 cursor-pointer accordion_1 flex`}>
                    UPDATE STATUS (PUBLIC)
                    <img src={showUpdate ? left : down} id="down_ico"
                        className={`absolute right-0 mr-12 w-8`} alt="" />
                </div>

                {/* Update Status Content */}
                <div className={`${showUpdate ? 'block' : 'hidden'} p-5 bg-white`} id="panel_2">
                    <h1 className="text-xl">
                        Enter the work done on the report here. This information can be made public upon clicking publish. Do not enter any sensitive information here. It will be available for the legal entity even without publishing
                    </h1>
                    <div className="mt-8">
                        <input 
                        className="border border-gray-600 m-2 mt-4 p-2 rounded"
                        onChange={(e) => setWork(e.target.value)} 
                        type="text" 
                        placeholder="Work"/>
                        <button 
                        className="bg-green-400 rounded p-2 px-4 m-2"
                        onClick={() => onSubmitWork('public')}>Submit</button>
                        <p className="text-red-600 m-4 text-xl">{msg}</p>
                    </div>
                    <h2 className="m-2 text-2xl">Previous Work</h2>
                    <div className="m-4">
                        {content.report.work.map((w, i) => (
                            <div className="m-4" key={i}>
                                <span className="text-gray-600 mr-4">{i + 1}</span> 
                                <span className="text-xl">{w}</span>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="flex">
                            <button onClick={onPublishWork} className="p-2 px-4 rounded text-white bg-teal-600 m-2">PUBLISH</button>
                            <button onClick={onHideWork} className="p-2 px-4 rounded text-white bg-teal-600 m-2">HIDE</button>
                        </div>
                        <p className="text-red-600 m-2">{publishMsg}</p>
                    </div>
                </div>

                {/* Update Status Header (Private)*/}
                <div
                    onClick={() => setShowPrivateUpdate(!showPrivateUpdate)}
                    className={`${showPrivateUpdate ? 'bg-gray-900' : ''} mt-16 border-l-8 border-black bg-gray-600 text-white text-2xl p-4 px-8 cursor-pointer accordion_1 flex`}>
                    UPDATE STATUS (PRIVATE)
                    <img src={showPrivateUpdate ? left : down} id="down_ico"
                        className={`absolute right-0 mr-12 w-8`} alt="" />
                </div>

                {/* Update Status Content (Private)*/}
                <div className={`${showPrivateUpdate ? 'block' : 'hidden'} p-5 bg-white`} id="panel_2">
                    <h1 className="text-xl">
                        Enter the work done on the report and click submit
                    </h1>
                    <div className="mt-8">
                        <input 
                            className="border border-gray-600 m-2 mt-4 p-2 rounded"
                            onChange={(e) => setWork(e.target.value)} 
                            type="text" 
                            placeholder="Work"/>
                        <button 
                            className="bg-green-400 rounded p-2 px-4 m-2"
                            onClick={onSubmitWork}>Submit</button>
                        <p className="text-red-600 m-4 text-xl">{msg}</p>
                    </div>
                    <h2 className="m-2 text-2xl">Previous Work</h2>
                    <div className="m-4">
                        {content.report.private_work.map((w, i) => (
                            <div className="m-4" key={i}>
                                <span className="text-gray-600 mr-4">{i + 1}</span>
                                <span className="text-xl">{w}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {
                (content.report.status !== 'Approved by IO' && content.report.status !== 'Rejected by IO')
                &&
                <div className="m-16 ml-6">
                    {controls}
                </div>
            }
        </main>
    )
}

export default Content