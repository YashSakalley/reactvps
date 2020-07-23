import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

import styles from './FinishPage.module.css'

export default function FinalPage({ chatForm, mediaForm, crime }) {

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
            signature: mediaForm.signature
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

    }, [])

    return (
        <div className={styles.FinishReport}>
            <div className={styles.box}>
                <h4>{msg}</h4>

                {isLoading ? <i className="fas fa-circle-notch fa-spin"></i> :
                    status === "success"
                        ? <>
                            <h5>Unique Id: {reportId}</h5>
                            <p>Your report has been passed through the CCTNS bridge</p>
                            <p>Keep this unique id in a safe place if you want to know the status of your report</p>
                            <p>Alternatively, you can use your aadhaar credentials to view status</p>
                        </>
                        : 'Error'
                }

            </div>
        </div>
    )
}
