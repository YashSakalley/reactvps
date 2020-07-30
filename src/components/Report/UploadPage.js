import React, { useState } from 'react'
import axios from 'axios'

import Canvas from '../Canvas'
import Modal from '../UI/Modal'
import Webcam from '../Webcam'

export default function UploadPage({ submit }) {
    const [evidence, setEvidence] = useState(null)
    const [signature, setSignature] = useState(null)
    const [imageId, setImageId] = useState(null)

    const [msg, setMsg] = useState(null)

    const [finalEvidence, setFinalEvidence] = useState(null)
    const [finalSignature, setFinalSignature] = useState(null)
    const [finalImageId, setFinalImageId] = useState(null)

    const [canSubmit, setCanSubmit] = useState(false)

    const [showCanvas, setShowCanvas] = useState(false)
    const [webcamModal, setWebcamModal] = useState(false)

    const onChangeHandler = (event) => {
        if (event.target.id === 'evidence') {
            console.log('Changing evidence');
            setEvidence(event.target.files)
            // console.log('Changing evidence');
            // let files = []

            // for (let i = 0; i < event.target.files.length; i++) {
            //     files.push(event.target.files[i])
            // }
            // console.log(files);
            // let files = event.target.files
            // setEvidence(files)
            // console.log(files);
            // // console.log('evidence', evidence);
            // // console.log(event.target.files)
        } else {
            console.log('Changing signature');
            setSignature(event.target.files[0])
        }
    }

    const uploadFile = async () => {
        console.log('Uploading');
        setMsg('Starting upload')

        // Uploading evidence
        let evidenceData = new FormData()
        if (evidence) {
            setMsg('Uploading evidence')
            evidenceData.append('file', evidence)
            await axios.post('/upload', evidenceData)
                .then((res) => {
                    console.log('evidence', res.data.file.filename)
                    setMsg('Evidence uploaded')
                    setFinalEvidence(res.data.file.filename)
                })
                .catch((err) => {
                    console.log(err)
                    setMsg('Error uploading evidence')
                })
        }

        // Uploading signature
        let signatureData = new FormData()
        setMsg('Uploading signature')
        signatureData.append('file', signature)
        await axios.post('/upload', signatureData)
            .then((res) => {
                let fileName = res.data.file.filename
                console.log('signature', fileName)
                setFinalSignature(fileName)
                setMsg('Signature Uploaded. Click Finish to Continue...')
            })
            .catch((err) => {
                console.log(err)
                setMsg('Error uploading signature')
            })

        // Uploading image
        let imageIdData = new FormData()
        setMsg('Uploading image')
        imageIdData.append('file', imageId)
        await axios.post('/upload', imageIdData)
            .then((res) => {
                let fileName = res.data.file.filename
                console.log('Image', fileName)
                setFinalImageId(fileName)
                setMsg('ImageId Uploaded. Click Finish to Continue...')
                setCanSubmit(true)
            })
            .catch((err) => {
                console.log(err)
                setMsg('Error uploading image')
            })

    }

    const submitFiles = () => {
        submit({
            evidence: finalEvidence,
            signature: finalSignature,
            image_id: finalImageId
        })
        console.log(finalEvidence, finalSignature, finalImageId);
    }

    return (
        <div
            style={{
                backgroundImage: "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7702d6e-c194-4cf5-bee2-7177082d8e4a/d5eyfb2-4ae49ebc-e8a3-4e3a-b3ef-ba2d1fc3e9e1.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZjc3MDJkNmUtYzE5NC00Y2Y1LWJlZTItNzE3NzA4MmQ4ZTRhXC9kNWV5ZmIyLTRhZTQ5ZWJjLWU4YTMtNGUzYS1iM2VmLWJhMmQxZmMzZTllMS5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.yVoidfiHJFqumIZBlTsn5BS1PegOfbQmQH83QEYdSz8')",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}
            className="sm:h-screen">

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

            <div className="py-5 px-5 md:py-6 md:px-8">
                <div className="flex bg-gray-300 rounded-lg shadow-lg overflow-hidden mx-2 sm:mx-24 ">
                    <div className="hidden lg:block lg:w-1/2 bg-cover"
                        style={{
                            background: "url('https://www.syneidis.com/wp-content/uploads/2018/12/antivirus-01.jpg')",
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'
                        }}>
                    </div>
                    <div className="w-full p-5 lg:w-1/2">

                        {/* Evidence Upload */}
                        <div className="w-full text-center text-xl font-black bg-gray-900 p-2 shadow-lg text-white">
                            UPLOAD EVIDENCES (OPTIONAL)
                        </div>
                        <div className="w-full flex">
                            <div className="w-1/2 bg-white p-3 shadow-lg italic">Please upload photo or video file of this
                            incident. These files will
                            help us to analyse the incident more efficiently</div>
                            <div className="w-1/2 mt-4 ml-4 bg-white shadow-lg">
                                <input
                                    multiple
                                    id="evidence"
                                    name="evidence"
                                    type="file"
                                    className="hidden"
                                    onChange={onChangeHandler}
                                />
                                <label htmlFor="evidence" className="cursor-pointer bg-purple-700 text-white p-2 hover:bg-purple-900">UPLOAD EVIDENCE</label>
                                <div className="mt-4 bg-yellow-200 px-2">{
                                    evidence ? evidence.name : 'No evidence file uploaded'
                                }</div>
                            </div>
                        </div>
                        <div className="bg-gray-400 h-1 w-full mt-5"></div>

                        {/* Signature Upload */}
                        <div className="w-full text-center text-xl font-black bg-gray-900 p-2 shadow-lg text-white mt-2">
                            UPLOAD YOUR SIGNATURE
                        </div>
                        <div className="w-full flex">
                            <div className="w-1/2 bg-white p-3 shadow-lg italic">
                                For authentication we need your signature. You
                                can either upload an image file or use our OCR interface to draw one on the screen. </div>
                            <div className="w-1/2 mt-4 ml-4 bg-white">
                                <input
                                    id="signature"
                                    type="file"
                                    className="hidden"
                                    onChange={onChangeHandler} />
                                {
                                    signature
                                        ? null
                                        : <>
                                            <label
                                                htmlFor="signature"
                                                className="cursor-pointer bg-teal-400 hover:bg-teal-600 text-white p-2">
                                                UPLOAD SIGNATURE
                                            </label>
                                            <button
                                                onClick={() => setShowCanvas(true)}
                                                className="block bg-indigo-700 hover:bg-indigo-900 text-lg italic p-1 text-white mt-4 w-1/2">
                                                Draw
                                            </button>
                                        </>
                                }

                                <div className="mt-3 bg-yellow-200 px-2">{
                                    signature ? `Uploaded ${signature.name}` : 'No signature file uploaded'
                                }</div>
                            </div>
                        </div>
                        <div className="bg-gray-400 h-1 w-full mt-5"></div>

                        {/* Webcam Capture */}
                        <div className="w-full text-center text-xl font-black bg-gray-900 p-2 shadow-lg text-white mt-2">
                            CAPTURE IMAGE ID
                        </div>
                        <div className="w-full flex">
                            <div className="w-1/2 bg-white p-3 shadow-lg italic">
                                We need your photo for image verification. For this your photo will be captured via your webcam.
                            </div>
                            <div className="w-1/2 mt-2 ml-4 bg-white">
                                <button
                                    onClick={() => { setWebcamModal(true) }}
                                    className={`${imageId ? 'hidden' : ''} block bg-gray-700 hover:bg-gray-900 p-2 text-white w-1/2 flex`}>
                                    TAKE PHOTO
                                </button>
                                <div className="mt-3 bg-yellow-200 px-2">{
                                    imageId ? 'Image Captured' : 'Image not captured'
                                }</div>
                            </div>
                        </div>
                        <div className="bg-gray-400 h-1 w-full mt-5"></div>

                        {
                            msg
                                ?
                                <div>{msg}</div>
                                :
                                null
                        }
                        {
                            !canSubmit
                                ?
                                (imageId === null) || (signature === null)
                                    ?
                                    <button
                                        className="bg-green-600 p-2 text-white mt-2 w-full cursor-not-allowed opacity-50"
                                    >UPLOAD</button>
                                    :
                                    <button
                                        onClick={uploadFile}
                                        className="bg-green-600 p-2 text-white mt-2 w-full hover:bg-green-800"
                                    >UPLOAD</button>
                                :
                                <button
                                    onClick={submitFiles}
                                    className="bg-green-600 p-2 text-white mt-2 w-full hover:bg-green-800"
                                >FINISH</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
