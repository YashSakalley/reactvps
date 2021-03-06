import React, { useState, useEffect } from 'react'
import './Loading.css'

const Loading = () => {
    const [dots, setDots] = useState(1)

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((dots + 1) % 4)
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    })

    return (
        <div className="loading-page">
            <div className="loading-box">
                <div className="loading-icon">
                    <i className='fas fa-circle-notch fa-spin'></i>
                </div>
                Loading content. Please wait
                <>
                    {'. '.repeat(dots)}
                </>
            </div>
        </div>
    )
}

export default Loading