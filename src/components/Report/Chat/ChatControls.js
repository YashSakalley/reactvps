import React, { useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

export default function ChatControls({ submit }) {

    const { transcript, resetTranscript } = useSpeechRecognition()
    const [isListening, setIsListening] = useState(false)

    const [message, setMessage] = useState("")

    const changeHandler = (event) => {
        setMessage(event.target.value)
    }

    const submitHandler = () => {
        if (message === "")
            return
        console.log(message)
        submit(message)
        setMessage('')
    }

    const keyPressed = (event) => {
        if (event.key === "Enter")
            submitHandler()
    }

    const startSpeech = () => {
        // resetTranscript()
        setIsListening(true)
        SpeechRecognition.startListening({ continuous: true })
    }

    const stopSpeech = async () => {
        resetTranscript()
        setIsListening(false)
        SpeechRecognition.stopListening()
        setMessage(`${message} ${transcript}`)
        console.log(transcript);
    }

    return (
        <>
            <div className="chat-footer flex-none">
                <div className="flex flex-row items-center p-4 mx-2">
                    <button type="button"
                        className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6">

                        {
                            !isListening
                                ?
                                <svg
                                    onClick={startSpeech}
                                    viewBox="0 0 20 20" className="w-full h-full fill-current">
                                    <path
                                        d="M9,18 L9,16.9379599 C5.05368842,16.4447356 2,13.0713165 2,9 L4,9 L4,9.00181488 C4,12.3172241 6.6862915,15 10,15 C13.3069658,15 16,12.314521 16,9.00181488 L16,9 L18,9 C18,13.0790094 14.9395595,16.4450043 11,16.9378859 L11,18 L14,18 L14,20 L6,20 L6,18 L9,18 L9,18 Z M6,4.00650452 C6,1.79377317 7.79535615,0 10,0 C12.209139,0 14,1.79394555 14,4.00650452 L14,8.99349548 C14,11.2062268 12.2046438,13 10,13 C7.790861,13 6,11.2060545 6,8.99349548 L6,4.00650452 L6,4.00650452 Z" />
                                </svg>
                                :
                                <svg
                                    onClick={stopSpeech}
                                    viewBox="0 0 20 20" className="bg-green-500 rounded w-full h-full fill-current">
                                    <path
                                        d="M9,18 L9,16.9379599 C5.05368842,16.4447356 2,13.0713165 2,9 L4,9 L4,9.00181488 C4,12.3172241 6.6862915,15 10,15 C13.3069658,15 16,12.314521 16,9.00181488 L16,9 L18,9 C18,13.0790094 14.9395595,16.4450043 11,16.9378859 L11,18 L14,18 L14,20 L6,20 L6,18 L9,18 L9,18 Z M6,4.00650452 C6,1.79377317 7.79535615,0 10,0 C12.209139,0 14,1.79394555 14,4.00650452 L14,8.99349548 C14,11.2062268 12.2046438,13 10,13 C7.790861,13 6,11.2060545 6,8.99349548 L6,4.00650452 L6,4.00650452 Z" />
                                </svg>
                        }

                    </button>
                    <div className="relative flex-grow mx-4">
                        <input
                            className="rounded-full py-2 pl-3 pr-10 w-full focus:border-gray-300 bg-gray-200 focus:bg-gray-300 focus:outline-none text-black focus:shadow-md transition duration-300 ease-in shadow-lg"
                            type="text"
                            value={message}
                            onChange={changeHandler}
                            placeholder="TYPE HERE"
                            onKeyDown={keyPressed}
                        />
                    </div>
                    <button
                        onClick={submitHandler}
                        type="button"
                        className="focus:outline-none block w-10 h-10">
                        <img src="https://img.icons8.com/cute-clipart/64/000000/circled-chevron-right.png"
                            className="rounded-full" alt="" />
                    </button>
                </div>
            </div>
            {
                transcript
                    ?
                    <>
                        <p className="m-4 h-40 w-1/3 p-2 overflow-y-auto absolute bottom-0 p-2 m-2 rounded left-0 text-black bg-white">
                            <div className="m-2 p-2 bg-red-300 text-sm rounded border border-gray-500">Click on the microphone to stop listening</div>
                            {transcript}
                        </p>
                    </>
                    : null
            }

        </>
    )
}
