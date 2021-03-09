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
                <div className="flex flex-row items-center p-4 ">
                    <button type="button"
                        className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-12 h-full">

                        {
                            !isListening
                                ?
                                <img src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-coloricon-1/21/56-512.png"
                                    onClick={startSpeech}
                                    alt=""
                                />
                                :
                                <img src="https://www.sibmbengaluru.edu.in/wp-content/plugins/gallery-album/assets/img/load11.gif"
                                    onClick={stopSpeech}
                                    alt=""
                                />
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
                        <p className="m-4 h-40 w-1/3 overflow-y-auto absolute bottom-0 ml-24 rounded-lg left-0 text-black bg-white">
                            <div className=" p-4 bg-gray-700 text-center text-white text-lg rounded-lg font-bold">
                                Click on the microphone to stop listening</div>
                            <div className="p-4">
                                {transcript}
                            </div>
                        </p>
                    </>
                    : null
            }

        </>
    )
}
