import React, { useEffect, useState } from 'react'
import axios from 'axios'
import IoMedia from './IoMedia'

export default function Content({ id }) {

    const initialContent = {
        report: {
            answers: ['', '', '', '', '', '', ''],
            questions: ['', '', '', '', '', '', '']
        },
        user: {}
    }
    const [content, setContent] = useState(initialContent)

    const [showDetails, setShowDetails] = useState(false)
    const [showAnalytics, setShowAnalytics] = useState(true)
    const [showNotes, setShowNotes] = useState(false)

    let d = new Date(content.report.time)
    d = d.toString()
    d = d.split(' ')
    let Time = d[4]
    let date = `${d[2]} ${d[1]} ${d[3]}`

    useEffect(() => {

        axios.get(`/reports/${id}`)
            .then((res) => {
                console.log(res)
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">

            {/* Notes Box Button*/}
            <div className="fixed bottom-0 right-0 w-16 h-16 mr-12 mb-8 cursor-pointer"
                onClick={() => setShowNotes(!showNotes)}>
                <img src="https://devrolabs.com/image/tabnote.png" alt="" />
            </div>

            {/* Notes Box */}
            <div
                className={`${showNotes ? 'block' : 'hidden'} rounded-lg bg-white shadow-xl fixed bottom-0 right-0 w-64 h-64 mr-12 mb-24`}>
                <div className="bg-gray-900 text-white text-xl p-2">NOTES</div>
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
                    <img src="https://media.keevervineyards.com/content/uploads/downButton.png" id="down_ico"
                            className={`${showDetails ? 'block' : 'hidden'} absolute right-0 mr-12 w-8`} alt="" />
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
                    <IoMedia index={1} />
                </div>
            </div>
        </main>
    )
}
