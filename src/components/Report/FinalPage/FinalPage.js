import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'

const FinalPage = ({ chatForm, mediaForm, crime }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [msg, setMsg] = useState("Please wait while we are submitting your report. This won't take long")
    const [status, setStatus] = useState("pending")
    const [reportId, setReportId] = useState('')

    useEffect(() => {

        const body = {
            crime: crime,
            answers: chatForm.answers,
            questions: chatForm.questions,
            user_id: Cookies.getJSON('user').user._id,
            media_files: mediaForm.evidence,
            signature: mediaForm.signature,
            image_id: mediaForm.image_id,
            ipc: localStorage.getItem('ipc')
        }

        axios.post('/reports', body)
            .then((res) => {
                console.log(res)
                if (res.data.status === "success") {
                    setMsg('Your report was successfully submitted')
                    setStatus('success')
                    setReportId(res.data.report._id)
                } else {
                    setMsg('Error occurred. Please try later')
                }
            })
            .catch((err) => {
                console.log(err)
                setMsg('Error occurred. Please try later')
                setStatus('error')
            })
            .then(() => {
                setIsLoading(false)
            })

    }, [chatForm, mediaForm, crime])

    return (
        <>
            {
                status !== 'success'
                    ?
                    <div>
                        <div>
                            <h4>{msg}</h4>

                            {isLoading ? <i className="fas fa-circle-notch fa-spin"></i> :
                                status === "success"
                                    ? <>
                                        <h5>Unique Id: {reportId}</h5>
                                        <p>Your report has been passed through the CCTNS bridge</p>
                                        <p>Keep this unique id in a safe place if you want to know the status of your report</p>
                                        <p>Alternatively, you can use your aadhaar credentials to view status</p>
                                    </>
                                    :
                                    <>
                                        Error Occurred. <Link to='/' className="hover:underline text-teal-600">Go home</Link>
                                    </>
                            }

                        </div>
                    </div>
                    :
                    <div
                        style={{ background: "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7702d6e-c194-4cf5-bee2-7177082d8e4a/d5eyfb2-4ae49ebc-e8a3-4e3a-b3ef-ba2d1fc3e9e1.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZjc3MDJkNmUtYzE5NC00Y2Y1LWJlZTItNzE3NzA4MmQ4ZTRhXC9kNWV5ZmIyLTRhZTQ5ZWJjLWU4YTMtNGUzYS1iM2VmLWJhMmQxZmMzZTllMS5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.yVoidfiHJFqumIZBlTsn5BS1PegOfbQmQH83QEYdSz8')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                        class="sm:h-screen">
                        <div class="py-24 px-4 sm:px-16">
                            <div class="flex bg-white rounded-lg shadow-lg overflow-hidden mx- 2 sm:mx-32 ">
                                {/* <div class="hidden lg:block lg:w-1/2 bg-cover"
                                    style={{
                                        background: "url('https://www.cds.net/res/global/images/blog/CDS_GDPR_Compliant.gif')",
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center'
                                    }}>
                                </div> */}
                                <div class="w-full p-4 sm:p-8 bg-gray-300">
                                    <div class="text-xl font-bold text-white bg-gray-900 p-5">YOUR REPORT SUBMITTED SUCCESSFULLY</div>
                                    <div class="mt-4 h-12 bg-yellow-200 border-l-8 border-black px-2">#NOTE : <span
                                        class="italic">Now your report has been submitted successfully and its status is considered as pending, our officers will go through your report now</span></div>
                                    <div class="mt-8 text-xl">
                                        <p class="bg-teal-400 p-2 font-bold border-8 border-teal-700">UNIQUE ID : {reportId}</p>
                                        <p class="mt-4 bg-white p-2 shadow-lg">Your report has been passed through the CCTNS bridge</p>
                                        <p class="bg-white p-2 mt-2 shadow-lg">Keep this unique id in a safe place if you want to know the status of your report</p>
                                        <p class="bg-white p-2 mt-2 shadow-lg">Alternatively, you can use your aadhaar credentials to view status</p>
                                        <br />
                                        <Link to='/' className="hover:underline text-teal-600">Go Home</Link>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div >
            }
        </>
    )
}

export default FinalPage