import React, { useState } from 'react'

import ChatPage from '../components/Report/ChatPage'
import CrimePage from '../components/Report/CrimePage'
import UploadPage from '../components/Report/UploadPage'
import FinalPage from '../components/Report/FinalPage'

export default function Report() {
    const [currentPage, setCurrentPage] = useState({
        crimePage: false,
        chatPage: true,
        uploadPage: false,
        finalPage: false
    })

    const [crimes] = useState(['Cyber Bullying', 'Hacking or Phishing', 'Theft', 'Murder', 'Violence', 'Other'])
    const [crime, setCrime] = useState('Theft')

    const crimePageSubmit = (name) => {
        console.log('Crime Selected')
        setCurrentPage({
            crimePage: false,
            chatPage: true,
            uploadPage: false,
            finalPage: false
        })
        setCrime(name)
    }

    const chatPageSubmit = () => {
        console.log('Chat Completed')
    }

    return (
        <>
            {
                currentPage.crimePage
                    ? <CrimePage crimes={crimes} submit={crimePageSubmit} />
                    : null
            }
            {
                currentPage.chatPage
                    ? <ChatPage crime={crime} submit={chatPageSubmit} />
                    : null
            }
            {
                currentPage.uploadPage
                    ? <UploadPage />
                    : null
            }
            {
                currentPage.finalPage
                    ? <FinalPage />
                    : null
            }
        </>
    )
}
