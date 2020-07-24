import React, { useState } from 'react'

import ChatPage from '../components/Report/Chat/ChatPage'
import CrimePage from '../components/Report/SelectCrime/CrimePage'
import UploadPage from '../components/Report/UploadPage'
import FinalPage from '../components/Report/FinalPage/FinalPage'

export default function Report() {
    const [currentPage, setCurrentPage] = useState({
        crimePage: false,
        chatPage: false,
        uploadPage: true,
        finalPage: false
    })

    const [crime, setCrime] = useState('Theft')
    const [chatForm, setChatForm] = useState({})
    const [mediaForm, setMediaForm] = useState({})

    const crimePageSubmit = (name) => {
        console.log('Crime Selected', name)
        setCurrentPage({
            crimePage: false,
            chatPage: true,
            uploadPage: false,
            finalPage: false
        })
        setCrime(name)
    }

    const chatPageSubmit = (form) => {
        console.log('Chat Completed', form)
        setChatForm(form)
        setCurrentPage({
            crimePage: false,
            chatPage: false,
            uploadPage: true,
            finalPage: false
        })
    }

    const uploadPageSubmit = (form) => {
        console.log('File upload completed', form)
        setMediaForm(form)
        setCurrentPage({
            crimePage: false,
            chatPage: false,
            uploadPage: false,
            finalPage: true
        })
    }

    return (
        <>
            {
                currentPage.crimePage
                    ? <CrimePage submit={crimePageSubmit} />
                    : null
            }
            {
                currentPage.chatPage
                    ? <ChatPage crime={crime} submit={chatPageSubmit} />
                    : null
            }
            {
                currentPage.uploadPage
                    ? <UploadPage submit={uploadPageSubmit} />
                    : null
            }
            {
                currentPage.finalPage
                    ? <FinalPage
                        crime={crime}
                        chatForm={chatForm}
                        mediaForm={mediaForm} />
                    : null
            }
        </>
    )
}
