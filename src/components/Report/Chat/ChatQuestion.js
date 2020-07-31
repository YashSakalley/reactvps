import React, { useState } from 'react'
import Axios from 'axios'

import AnalyseText from '../../Dashboard/Io/AnalyseText'

import loadingGif from '../../../assets/text_loading.gif'

export default function ChatMessage({ ind, suggestions, children, submit }) {
    const LAST_QUESTION = 5

    if (ind === LAST_QUESTION) {
        console.log(children)
    }

    const [isLoading, setIsLoading] = useState(false)

    const [showSuggestions, setShowSuggestions] = useState(true)

    const onSelectSuggestion = (suggestion) => {
        console.log('sug', suggestion);
        submit(suggestion)
        setShowSuggestions(false)
    }

    const onImageUpload = async (e) => {
        setIsLoading(true)
        let result
        let data = new FormData()
        data.append('file', e.target.files[0])
        console.log('Imag up');
        await Axios.post('/upload', data)
            .then(async (res) => {
                console.log(res);
                if (res.data.status === 'success') {
                    result = await AnalyseText(res.data.file.filename)
                }
            })
            .catch((err) => {
                console.log(err);
            })
        let displayResult = ""
        result.text.map((line) => {
            displayResult += line.text
            return line.text
        })
        setIsLoading(false)
        console.log('sugSend', displayResult);
        onSelectSuggestion(displayResult)
    }

    return (
        <div className="flex flex-row justify-start">
            {
                isLoading
                    ?
                    <div
                        style={{ backdropFilter: 'blur(3.8px)' }}
                        className={`fixed z-20 flex text-center justify-center items-center inset-0 text-white bg-black bg-opacity-75 transition-opacity 'block'}`}>
                        <div className="">
                            <div>
                                <img width="500" height="500" src={loadingGif} alt="Loading gif here" />
                            </div>
                            <h2 className="text-xl m-4"> Analysing. Please Wait . . . </h2>
                        </div>

                    </div>
                    : null
            }
            <div className="w-12 h-8 relative flex flex-shrink-0 mr-4">
                <img className="shadow-md rounded-full w-full h-full object-cover"
                    src="https://i.pinimg.com/originals/08/ce/ec/08ceec29ee450339ea678bcd2204fedf.png"
                    alt="" />
            </div>
            <div className="text-sm text-gray-700 grid grid-flow-row gap-2">
                <div className="flex items-center">
                    <p
                        className="px-6 py-3 rounded-b-full rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">
                        {children}
                    </p>
                </div>

                {ind === LAST_QUESTION ?
                    <>
                        <div className="flex items-center">
                            <p className="px-6 py-3 rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">
                                You can either upload an image or use the box below
                            </p>
                        </div>
                        <div className="flex items-center">
                            <p
                                className="px-6 py-3 rounded-b-full rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">
                                Our OCR will extract text from your image file
                            </p>
                        </div>
                    </>

                    : null}

                <div className="flex items-center">
                    {
                        showSuggestions ?
                            suggestions.map((suggestion, i) => (
                                <p key={i}
                                    className="p-3 rounded-lg bg-gray-700 max-w-xs lg:max-w-md text-white mx-2 cursor-pointer"
                                    onClick={() => onSelectSuggestion(suggestion)}>
                                    {suggestion}
                                </p>
                            ))
                            : null
                    }
                    {
                        ind === LAST_QUESTION
                            ?
                            <>
                                <p
                                    className="p-3 rounded-lg bg-teal-700 max-w-xs lg:max-w-md text-white mx-2 cursor-pointer">
                                    <label htmlFor="file" className="cursor-pointer">
                                        Upload file from computer
                                </label>
                                    <input type="file" id="file" className="hidden" onChange={onImageUpload} />
                                </p> <br />
                                {isLoading ? 'Analysing text. Please Wait' : null}
                            </>
                            : null
                    }

                </div>
            </div>
        </div>
    )
}
