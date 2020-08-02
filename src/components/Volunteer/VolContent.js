import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Axios from 'axios'

import Nav from './Utils/Nav'
import SideBar from './Utils/SideBar'
import ContentCell from '../Dashboard/Content/ContentCell'
import Modal from '../UI/Modal'
import Canvas from '../Canvas'
import Webcam from '../Webcam'
// import Map from '../Home/Map'

export default function Volunteer() {
    const requestId = useParams().requestId
    const [sideBarOpen, setSideBarOpen] = useState(false)

    const [signature, setSignature] = useState(null)
    const [imageId, setImageId] = useState(null)

    const [signatureUploaded, setSignatureUploaded] = useState(false)
    const [imageIdUploaded, setImageIdUploaded] = useState(false)

    const [form, setForm] = useState({
        crime: '',
        sub: '',
        place: '',
        time: '',
        date: '',
        property: '',
        description_of_accussed: '',
        witness_details: '',
        complaint: '',
        signature: '',
        image_id: ''
    })

    const [content, setContent] = useState({
        phone: '',
        lat: '',
        lng: '',
        time: '',
        status: ''
    })

    useEffect(() => {
        Axios.get(`/volunteer/request/${requestId}`)
            .then((res) => {
                if (res.data.status === 'success') {
                    setContent(res.data.request)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const [showCanvas, setShowCanvas] = useState(false)
    const [webcamModal, setWebcamModal] = useState(false)

    const onAcceptHandler = () => {
        Axios.put(`/volunteer/request/${requestId}`, { status: 'In Progress' })
            .then((res) => {
                console.log(res);
                setContent({
                    ...content,
                    status: 'In Progress'
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
    }

    const onUploadSignature = () => {
        let data = new FormData()
        data.append('file', signature)
        Axios.post('/upload', data)
            .then((res) => {
                if (res.data.status === 'success') {
                    setForm({
                        ...form,
                        signature: res.data.file.filename
                    })
                    setSignatureUploaded(true)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const onUploadImageId = () => {
        let data = new FormData()
        data.append('file', imageId)
        Axios.post('/upload', data)
            .then((res) => {
                if (res.data.status === 'success') {
                    setForm({
                        ...form,
                        image_id: res.data.file.filename
                    })
                    setImageIdUploaded(true)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const onFormSubmit = (e) => {
        e.preventDefault()
        let { sub, place, time, date, crime, property, description_of_accussed, witness_details, complaint, signature, image_id } = form
        let formData = {
            crime: crime,
            answers: [sub, place, time + ' ' + date, property, description_of_accussed, witness_details, complaint],
            questions: ['sub', 'place', 'time', 'property', 'description_of_accussed', 'witness_details', 'complaint'],
            user_id: '5f252325103d153fdc20c99b',
            signature: signature,
            image_id: image_id,
            is_facilitator_filled: true
        }
        Axios.post('/reports', formData)
            .then((res) => {
                console.log(res);
                setContent({
                    ...content,
                    status: 'Completed'
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    let boxContent
    if (content.status === 'In Progress') {
        boxContent =
            <div className="bg-blue-500 text-white font-bold text-xl p-5 italic">
                This request has been approved. Please fill the following form as a witness to file a complaint
            </div>
    } else if (content.status === 'Completed') {
        boxContent =
            <div>
                The report was submitted to the Station House Officer
        </div>
    } else {
        boxContent =
            <div className="bg-white flex p-5 shadow-xl rounded-lg">
                <span className="text-2xl mt-6 italic">Click accept to proceed</span> <br />
                <button
                    onClick={onAcceptHandler}
                    className="bg-green-500 p-4 px-8 text-xl m-4 text-white hover:bg-green-700">
                    ACCEPT
                </button>
            </div>
    }

    return (
        <div className="flex h-screen bg-gray-200 font-roboto">

            <Modal
                style={{
                    transform: webcamModal || showCanvas ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: webcamModal || showCanvas ? '1' : '0'
                }}
                close={() => { setWebcamModal(false); setShowCanvas(false) }}>

                {/* Signature Modal */}
                {
                    showCanvas
                        ? <Canvas submit={(file) => { setSignature(file); setShowCanvas(false) }} />
                        : null
                }

                {/* Webcam Modal */}
                {
                    webcamModal
                        ?
                        <Webcam submit={(file) => { setImageId(file); setWebcamModal(false) }} />
                        : null
                }
            </Modal>

            <div
                onClick={() => { setSideBarOpen(false) }}
                className={`fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden ${sideBarOpen ? 'block' : 'hidden'}`}>
            </div>

            <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Nav sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                    <div className="bg-gray-300 p-5">
                        <table className="w-full mt-4 text-lg shadow-xl bg-white">
                            <tbody className="bg-grey-light w-full">
                                <ContentCell id="Phone" value={content.phone} />
                                <ContentCell id="Location" value="Bhopal" />
                                <ContentCell id="Status" value={content.status} />
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center">

                        <div>
                            {boxContent}
                        </div>

                    </div>
                    {
                        content.status === 'In Progress'
                            ?
                            <div className="sm:p-8">
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
                                                        onChange={onChangeHandler}
                                                        className="m-4 p-4 w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                                                        type="text"
                                                        id="sub"
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
                                                        onChange={onChangeHandler}
                                                        className="m-4 p-4 w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                                                        type="text"
                                                        id="place"
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
                                                        onChange={onChangeHandler}
                                                        className="m-4 p-4 rounded border-gray-300 border"
                                                        type="time"
                                                        id="time"
                                                        placeholder="Report Subject" />
                                                    <input
                                                        onChange={onChangeHandler}
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
                                                        onChange={onChangeHandler}
                                                        className="m-4 p-4 w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                                                        type="text"
                                                        id="property"
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
                                                        onChange={onChangeHandler}
                                                        className="m-4 p-4 w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                                                        type="text"
                                                        id="description_of_accussed"
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
                                                        onChange={onChangeHandler}
                                                        className="m-4 p-4 w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                                                        type="text"
                                                        id="witness_details"
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
                                                        onChange={onChangeHandler}
                                                        className="m-4 p-4 w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                                                        type="text"
                                                        id="complaint"
                                                        placeholder="Description" />
                                                </td>
                                            </tr>

                                            <tr className="">
                                                <td>
                                                    Complainant's signature
                                            </td>
                                                <td className="flex items-center">

                                                    {signatureUploaded
                                                        ? <div><i className="m-4 text-green-600 fas fa-check-circle"></i></div>
                                                        :
                                                        <>
                                                            <div
                                                                className="m-4 bg-indigo-500 text-xl text-white p-4 cursor-pointer hover:bg-indigo-700 italic"
                                                                onClick={(e) => { e.preventDefault(); setShowCanvas(true); }}>
                                                                Draw signature
                                                        </div>
                                                            {signature ? <div
                                                                className="m-4 bg-teal-500 text-white p-4 cursor-pointer"
                                                                onClick={onUploadSignature}>
                                                                UPLOAD
                                                        </div> : null}
                                                        </>
                                                    }
                                                </td>
                                            </tr>

                                            <tr className="mt-4 p-4">
                                                <td>
                                                    Complainant's image id
                                            </td>
                                                <td className="flex items-center">

                                                    {imageIdUploaded
                                                        ? <div><i className="m-4 text-green-600 fas fa-check-circle"></i></div>
                                                        :
                                                        <>
                                                            <div
                                                                className="italic m-4 bg-purple-500  text-xl text-white p-4 cursor-pointer hover:bg-purple-700"
                                                                onClick={(e) => { e.preventDefault(); setWebcamModal(true); }}>
                                                                Take photo
                                                        </div>
                                                            {imageId ? <div
                                                                className="m-4 bg-teal-500 text-white p-4 cursor-pointer"
                                                                onClick={onUploadImageId}>
                                                                UPLOAD
                                                    </div> : null}
                                                        </>
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button
                                        onClick={onFormSubmit}
                                        className="bg-green-500 p-4 px-8 text-xl mt-4 text-white hover:bg-green-600">
                                        SUBMIT
                                </button>

                                </form>
                            </div>
                            : null
                    }

                </main>
            </div>

        </div >
    )
}