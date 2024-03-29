import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import ReactHtmlParser from 'react-html-parser'

import ContentCell from './ContentCell'
import Modal from 'components/UI/Modal'
import Canvas from 'components/Canvas'

import back from 'assets/back.png'
import pdfImg from 'assets/pdf.png'

const Content = ({ id }) => {
    const [msg, setMsg] = useState('')
    const [showDetails, setShowDetails] = useState(false)
    const [showCanvas, setShowCanvas] = useState(false)
    const [showAcceptModal, setShowAcceptModal] = useState(false)
    const [signature, setSignature] = useState(null)
    const [showTextBox, setshowTextBox] = useState(false)
    const [rejectedReason, setRejectedReason] = useState('')
    const [msgEntity, setMsgEntity] = useState(null)
    const [entities, setEntities] = useState(null)
    const [content, setContent] = useState({
        report: {
            answers: ['', '', '', '', '', '', ''],
            questions: ['', '', '', '', '', '', ''],
            status: ''
        },
        user: {
            last_name: 'empty'
        }
    })
    const history = useHistory()
    const { role } = useParams()

    let d = new Date(content.report.time)
    d = d.toString()
    d = d.split(' ')
    let Time = d[4]
    let date = `${d[2]} ${d[1]} ${d[3]}`

    const fetchReport = useCallback(
        async () => {
            try {
                const { data: { status, report, user } } = await axios.get(`/reports/${id}`)
                if (status === 'success') {
                    setContent({
                        report,
                        user
                    })
                }
            } catch (err) {
                console.log(err)
            }

        },
        [id]
    )

    useEffect(() => {
        fetchReport()
    }, [fetchReport])

    const onBackHandler = () => {
        history.goBack()
    }

    const onAcceptHandler = () => {
        setShowAcceptModal(true)
    }

    const onSignatureChanged = (event) => {
        setSignature(event.target.files[0])
    }

    const onFinishHandler = async () => {
        setMsg('Uploading Signature . . .');
        const { user, report } = content
        const { user: officer } = Cookies.getJSON('user')
        let officerRole
        if (role === 'sho') {
            officerRole = 'Station House Officer'
        } else if (role === 'sp') {
            officerRole = 'Superintendent Of Police'
        } else {
            officerRole = 'Investigation Officer'
        }

        const body = {
            report_id: report._id,
            sender: {
                name: `${user.first_name} ${user.last_name}`,
                father_name: `${user.father_name}`,
                address: `${user.address}`,
                phone: `${user.phone}`,
                email: `yashsakalley98@gmail.com`,
                id_proof: 'https://www.drupal.org/files/project-images/idproof.png'
            },
            reciever: {
                name: `${officer.first_name} ${officer.last_name}`,
                role: `${officerRole}`,
                address: 'Anand Nagar'
            },
            info: {
                sub: report.answers[0],
                place: report.answers[1],
                time: report.answers[2],
                crime: report.crime,
                property: report.answers[3],
                description_of_accussed: report.answers[4],
                witness_details: report.answers[5],
                complaint: report.answers[6],
                sender_sign: report.signature,
                reciever_sign: ''
            }
        }

        const signatureData = new FormData()
        signatureData.append('file', signature)
        try {
            const { data } = await axios.post('/upload', signatureData)
            if (data.status === 'success') {
                setMsg('Signature Uploaded. Changing Status to approved . . .')
                const infoSignature = data.file.filename
                body.info.reciever_sign = infoSignature
                const { data: data1 } = await axios.put(`/reports/${content.report._id}`, { status: `Approved by ${role.toUpperCase()}` })
                if (data1.status === 'success') {
                    setMsg('Status updated. Generating pdf...')
                    const { data: data2 } = await axios.post('/firs', body)
                    if (data2.status === 'success') {
                        setMsg('Pdf Generated. Redirecting...')
                        onBackHandler()
                    }
                }
            }
        } catch (err) {
            setMsg('Error occurred. Please try later')
            console.log(err)
        }
    }

    const onDeclineHandler = async () => {
        try {
            await axios.put(`/reports/${content.report._id}`, { status: `Rejected by ${role.toUpperCase()}`, reason: rejectedReason })
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
                    <div className="w-full mb-4">
                        <input
                            type="text"
                            className="text-xl outline-none w-full mt-4 p-4"
                            value={rejectedReason}
                            placeholder="Reason for declining the report"
                            onChange={(event) => setRejectedReason(event.target.value)}
                        ></input>
                        <br />
                        <button
                            onClick={() => { setshowTextBox(false) }}
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
                            onClick={() => { setshowTextBox(true) }}
                            className="mt-4 ml-4 px-8 py-4 text-base leading-5 border font-medium shadow-sm transition ease-in-out duration-150 focus:outline-none focus:shadow-outline bg-red-600 border-red-600 text-gray-100 hover:bg-red-500 hover:border-red-500 hover:text-gray-100">DECLINE
                        </button>
                    </>
            }
        </>


    const onShowEntities = async () => {
        setMsgEntity('Please Wait')
        try {
            const { data } = await axios.post('/entity', { desc: content.report.answers[6] })
            setEntities(data.entity)
            setMsgEntity('')
        } catch (err) {
            console.log(err);
            setMsgEntity('Error Occurred')
        }
    }

    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <Modal
                style={{
                    transform: showCanvas ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: showCanvas ? '1' : '0'
                }}
                close={() => { setShowCanvas(false) }}>

                {/* Signature Modal */}
                {
                    showCanvas
                    && <Canvas submit={(file) => { setSignature(file); setShowCanvas(false) }} />
                }
            </Modal>
            <div className="container px-6 pt-8 bg-gray-200">
                {
                    showAcceptModal
                    &&
                    <div
                        style={{ backdropFilter: 'blur(3.8px)' }}
                        className={`fixed z-20 flex text-center justify-center items-center inset-0 text-white bg-black bg-opacity-75 transition-opacity ${showAcceptModal ? 'block' : 'hidden'}`}>
                        <div className="">
                            <h2 className="text-xl m-4"> Please submit your signature to accept this report </h2>
                            <input
                                type="file"
                                id="signature"
                                className="hidden"
                                onChange={onSignatureChanged} />
                            <label htmlFor="signature" className="bg-green-400 p-2 pl-4 pr-4 m-2 text-black cursor-pointer">UPLOAD</label>
                                    OR
                                <button
                                onClick={() => setShowCanvas(true)}
                                className="bg-blue-400 p-2 pl-4 pr-4 m-2 text-black">DRAW</button> <br /> <br />
                            {
                                signature
                                    ?
                                    <>
                                        Signature Uploaded: {signature.name} <br /> <br />
                                        <button onClick={onFinishHandler} className="p-2 text-xl w-full bg-blue-600">FINISH</button>
                                    </>
                                    : null
                            }
                            {
                                msg !== ''
                                    ?
                                    <>
                                        <br />
                                        {msg} <br />
                                        <i className="mt-4 text-4xl fas fa-circle-notch fa-spin"></i>
                                    </>
                                    : null
                            }
                        </div>
                    </div>
                }
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
                    <div>
                        {
                            content.report.status.includes('Approved')
                            &&
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
                        }
                    </div>
                </div>
                <table className="text-left w-full mt-4 bg-white text-lg shadow-xl">
                    <tbody className="bg-grey-light flex flex-col items-center justify-between w-full">
                        <ContentCell id="AADHAAR NUMBER" value={content.user.uid} />
                        <ContentCell id="FULLNAME" value={`${content.user.first_name} ${content.user.last_name || 'Sakalley'}`} />
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
                    &&
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
                }

                {/* Entities */}
                <div className="bg-white p-4 my-4">
                    <h1 className="text-xl">View Entities</h1>
                    <div className="m-2 text-red-600">{msgEntity}</div>
                    <button
                        onClick={onShowEntities}
                        className={`m-2 p-2 px-4 bg-teal-500 rounded ${entities ? 'hidden' : ''}`}>
                        Show
                    </button>
                    <div>{ReactHtmlParser(entities)}</div>
                </div>
                <div className="flex p-2">
                    {content.report.status === 'Pending'
                        ?
                        controls
                        :
                        content.report.status === 'Rejected by SHO'
                        &&
                        role === 'sp'
                        && controls
                    }
                </div>
            </div>
        </main>
    )
}

export default Content