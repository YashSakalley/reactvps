import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'

import ContentCell from './ContentCell'
import Modal from '../../UI/Modal'
import Canvas from '../../Canvas'

import back from '../../../assets/back.png'
import pdfImg from '../../../assets/pdf.png'

export default function Content({ id }) {

    const [content, setContent] = useState({
        report: {
            answers: ['', '', '', '', '', '', ''],
            questions: ['', '', '', '', '', '', ''],
            status: ''
        },
        user: {}
    })
    const [msg, setMsg] = useState('')
    const [showDetails, setShowDetails] = useState(false)

    let history = useHistory()
    let role = useParams().role

    let d = new Date(content.report.time)
    d = d.toString()
    d = d.split(' ')
    let Time = d[4]
    let date = `${d[2]} ${d[1]} ${d[3]}`

    useEffect(() => {

        axios.get(`/reports/${id}`)
            .then((res) => {
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

    const onBackHandler = () => {
        history.goBack()
    }

    const [showCanvas, setShowCanvas] = useState(false)
    const [showAcceptModal, setShowAcceptModal] = useState(false)
    const onAcceptHandler = () => {
        setShowAcceptModal(true)
    }

    const [signature, setSignature] = useState(null)
    const onSignatureChanged = (event) => {
        console.clear()
        console.log(event.target.files[0])
        setSignature(event.target.files[0])
    }

    const onFinishHandler = () => {
        setMsg('Uploading Signature . . .');
        console.log('Changing Status');

        const { user, report } = content
        const officer = Cookies.getJSON('user').user

        let officerRole
        if (role === 'sho') {
            officerRole = 'Station Head Officer'
        } else if (role === 'sp') {
            officerRole = 'Superintendent Of Police'
        } else {
            officerRole = 'Investigation Officer'
        }

        let body = {
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

        let signatureData = new FormData()
        signatureData.append('file', signature)
        axios.post('/upload', signatureData)
            .then((res) => {
                if (res.data.status === 'success') {
                    console.log('Signature Uploaded');
                    setMsg('Signature Uploaded. Changing Status to approved . . .')
                    let infoSignature = res.data.file.filename
                    body.info.reciever_sign = infoSignature
                    axios.put(`/reports/${content.report._id}`, { status: `Approved by ${role.toUpperCase()}` })
                        .then((res) => {
                            if (res.data.status === 'success') {
                                setMsg('Status updated. Generating pdf...')
                                console.log('Generating pdf');
                                axios.post('/firs', body)
                                    .then((res) => {
                                        if (res.data.status === 'success') {
                                            setMsg('Pdf Generated. Redirecting...')
                                            onBackHandler()
                                        }
                                    })
                            }
                        })
                }
            })
            .catch((err) => {
                setMsg('Error occurred. Please try later')
                console.log(err)
            })

    }

    const [showTextBox, setshowTextBox] = useState(false)
    const [rejectedReason, setRejectedReason] = useState('')

    const onDeclineHandler = () => {
        axios.put(`/reports/${content.report._id}`, { status: `Rejected by ${role.toUpperCase()}`, reason: rejectedReason })
            .then((res) => {
                console.log(res)
                history.goBack()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const controls =
        <>
            {
                showTextBox
                    ?
                    <div>
                        <input
                            type="text"
                            className="w-full"
                            value={rejectedReason}
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
                        ? <Canvas submit={(file) => { setSignature(file); setShowCanvas(false) }} />
                        : null
                }

            </Modal>
            <div className="container px-6 pt-8 bg-gray-200">
                {
                    showAcceptModal
                        ?
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
                        : null
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
                <div className="flex p-2">
                    {content.report.status === 'Pending'
                        ?
                        controls
                        :
                        content.report.status === 'Rejected by SHO'
                            ?
                            role === 'sp'
                                ? controls
                                : null
                            : null
                    }
                </div>
            </div>
        </main>
    )
}
