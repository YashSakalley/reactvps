import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'

export default function EditReport() {
    const { reportId } = useParams()
    const [report, setReport] = useState({
        crime: '',
        image_id: '',
        reason: '',
        signature: '',
        status: '',
        time: '',
        answers: ['', '', '', '', '', '', '']
    })

    const [msg, setMsg] = useState(null)

    useEffect(() => {
        Axios.get(`/reports/${reportId}`)
            .then((res) => {
                console.log(res);
                setReport(res.data.report)
            })
            .catch((err) => {
                console.log(err);
            })

    }, [reportId])

    const onChangeHandler = (e) => {
        setReport({
            ...report,
            [e.target.id]: e.target.value
        })
    }

    const onChangeAnswer = (e) => {
        let updatedAns = [...report.answers]
        updatedAns[e.target.id] = e.target.value
        setReport({
            ...report,
            answers: updatedAns
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        setMsg('Updating...')
        Axios.put(`/reports/complete/${reportId}`, report)
            .then((res) => {
                if (res.data.status === 'success') {
                    console.log(res);
                    setMsg('Updated Successfully')
                    // history.push('/')
                }
            })
            .catch((err) => {
                setMsg('Error updating report')
                console.log(err);
            })
    }

    return (
        <div>
            <h1 className="m-4 text-2xl">
                Edit Report
            </h1>
            <div className="m-4 text-xl">
                <h2>Your report status is: <span className="text-red-500">{report.status}</span></h2>
                <h2>Reason: {report.reason}</h2>
            </div>
            <form onSubmit={onFormSubmit} className="p-8 bg-white text-lg shadow-xl rounded-lg">
                <table>
                    <tbody className="m-4">
                        <tr className="m-4 p-4">
                            <td>
                                <label htmlFor="crime">
                                    Select crime
                                </label>
                            </td>
                            <td>
                                <select
                                    value={report.crime}
                                    id="crime"
                                    onChange={onChangeHandler}
                                    className="m-4 p-4 rounded border-gray-300 border">
                                    <option value="">SELECT</option>
                                    <option value="CYBER BULLYING">CYBER BULLYING</option>
                                    <option value="HACKING OR PHISHING">HACKING OR PHISHING</option>
                                    <option value="THEFT">THEFT</option>
                                    <option value="MURDER">MURDER</option>
                                    <option value="VIOLENCE">VIOLENCE</option>
                                    <option value="OTHER">OTHER</option>
                                </select>
                            </td>
                        </tr>

                        <tr className="m-4 p-4">
                            <td>
                                <label htmlFor="sub">
                                    Enter subject for your report
                                </label>
                            </td>
                            <td>
                                <input
                                    onChange={onChangeAnswer}
                                    value={report.answers[0]}
                                    className="m-4 p-4 w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    id="0"
                                    placeholder="Report Subject" />
                            </td>
                        </tr>

                        <tr className="m-4 p-4">
                            <td>
                                <label htmlFor="place">
                                    Enter place of crime
                                </label>
                            </td>
                            <td>
                                <input
                                    onChange={onChangeAnswer}
                                    value={report.answers[1]}
                                    className="m-4 p-4 w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    id="1"
                                    placeholder="Place of crime" />
                            </td>
                        </tr>

                        <tr className="m-4 p-4">
                            <td>
                                <label htmlFor="time">
                                    Enter time and date of incident
                                </label>
                            </td>
                            <td>
                                <input
                                    onChange={onChangeAnswer}
                                    value={report.answers[2].split(' ')[0]}
                                    className="m-4 p-4 rounded border-gray-300 border"
                                    type="time"
                                    id="2"
                                    placeholder="Report Subject" />
                                <input
                                    onChange={onChangeHandler}
                                    value={report.answers[2].split(' ')[1]}
                                    className="m-4 p-4 rounded border-gray-300 border"
                                    type="date"
                                    id="date"
                                    placeholder="Report Subject" />
                            </td>
                        </tr>

                        <tr className="m-4 p-4">
                            <td>
                                <label htmlFor="property">
                                    Was there any property damaged or stolen
                                </label>
                            </td>
                            <td>
                                <input
                                    onChange={onChangeAnswer}
                                    value={report.answers[3]}
                                    className="m-4 p-4 w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    id="3"
                                    placeholder="Property information" />
                            </td>
                        </tr>

                        <tr className="m-4 p-4">
                            <td>
                                <label htmlFor="description_of_accussed">
                                    What did the accused look like in his/her appearance
                                </label>
                            </td>
                            <td>
                                <input
                                    onChange={onChangeAnswer}
                                    value={report.answers[4]}
                                    className="m-4 p-4 w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    id="4"
                                    placeholder="Description of accused" />
                            </td>
                        </tr>

                        <tr className="m-4 p-4">
                            <td>
                                <label htmlFor="witness_details">
                                    Were there any witness for the crime
                                </label>
                            </td>
                            <td>
                                <input
                                    onChange={onChangeAnswer}
                                    value={report.answers[5]}
                                    className="m-4 p-4 w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    id="5"
                                    placeholder="Witness Details" />
                            </td>
                        </tr>

                        <tr className="m-4 p-4">
                            <td>
                                <label htmlFor="complaint">
                                    Brief description
                                </label>
                            </td>
                            <td>
                                <input
                                    onChange={onChangeAnswer}
                                    value={report.answers[6]}
                                    className="m-4 p-4 w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    id="6"
                                    placeholder="Description" />
                            </td>
                        </tr>


                    </tbody>
                </table>
                <button
                    onClick={onFormSubmit}
                    className="bg-green-500 p-4 px-8 text-xl mt-4 text-white hover:bg-green-600">
                    UPDATE
                </button>
                <div className="text-red-500">
                    {msg}
                </div>
            </form>
        </div>
    )
}
