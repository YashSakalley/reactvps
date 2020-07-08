import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'

export default function Content({ id }) {

    const [content, setContent] = useState({
        report: {},
        user: {}
    })
    const [msg, setMsg] = useState(false)
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
        history.push(`/dashboard/${role}`)
    }

    const onAcceptHandler = () => {
        setMsg('Changing report status to approved...');
        const { user, report } = content
        const officer = Cookies.getJSON('user').user
        console.log(officer);

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
                complaint: report.answers[6]
            }
        }



        axios.put(`/reports/${content.report._id}`, { status: 'approved' })
            .then((res) => {
                setMsg('Status updated. Generating pdf...')
            })
            .then(() => {
                axios.post('/firs', body)
            })
            .then(() => {
                setMsg('Pdf generated. Redirecting...')
                onBackHandler()
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const [showTextBox, setshowTextBox] = useState(false)
    const [rejectedReason, setRejectedReason] = useState('')

    const onDeclineHandler = () => {
        axios.put(`/reports/${content.report._id}`, { status: 'rejected by sho', reason: rejectedReason })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container px-6 pt-8 bg-gray-200">
                <div
                    className={`fixed z-20 inset-0 text-white bg-black opacity-50 transition-opacity ${msg ? 'block' : 'hidden'}`}>
                    {msg}
                </div>
                <div className="flex">
                    <button onClick={onBackHandler} className="text-white h-full"><img className=""
                        src="https://img.icons8.com/fluent/48/000000/back.png" alt="" /></button>
                    <h1 className="text-3xl">DETAILED REPORT</h1>
                </div>
                <table className="text-left w-full mt-4 bg-white text-lg shadow-xl">
                    <tbody className="bg-grey-light flex flex-col items-center justify-between w-full">
                        <tr className="flex w-full mb-4">
                            <td className="p-4 w-1/3">AADHAAR NUMBER :</td>
                            <td className="p-4 w-1/3">{content.user.uid}</td>
                        </tr>
                        <tr className="flex w-full mb-4">
                            <td className="p-4 w-1/3">FULLNAME :</td>
                            <td className="p-4 w-1/3">{content.user.first_name} {content.user.last_name}</td>
                        </tr>
                        <tr className="flex w-full mb-4">
                            <td className="p-4 w-1/3">SUBMITTED ON (DATE AND TIME):</td>
                            <td className="p-4 w-1/3">{date} {Time}</td>
                        </tr>
                        <tr className="flex w-full mb-4">
                            <td className="p-4 w-1/3">CRIME RELATED:</td>
                            <td className="p-4 w-1/3">{content.report.crime}</td>
                        </tr>
                        <tr className="flex w-full mb-4">
                            <td className="p-4 w-1/3">PLACE:</td>
                            <td className="p-4 w-1/3">BHOPAL</td>
                        </tr>
                        <tr className="flex w-full mb-4">
                            <td className="p-4 w-1/3">DESCRIPTION GIVEN:</td>
                            <td className="p-4 w-1/3">Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                            Quisquam adipisci eaque odio, ut dignissimos ipsum culpa id! Nisi id maxime
                            reiciendis ipsa illo a, corporis mollitia quod, molestias consequatur ipsum.
                                    </td>
                        </tr>
                        <tr className="flex w-full mb-4">
                            <td className="p-4 w-1/3">WITNESS:</td>
                            <td className="p-4 w-1/3">2</td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex p-2">
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
                </div>
            </div>
        </main>
    )
}
