import React, { useState } from 'react'
import Axios from 'axios'

import AnalyseText from '../../Dashboard/Io/AnalyseText'

export default function ChatMessage({ ind, suggestions, children, submit }) {
    const LAST_QUESTION = 5

    if (ind === LAST_QUESTION) {
        console.log(children)
    }

    const [isLoading, setIsLoading] = useState(true)

    const [showSuggestions, setShowSuggestions] = useState(true)

    const [textResult, setTextResult] = useState('')

    const onSelectSuggestion = (suggestion) => {
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
        setTextResult(displayResult)
        onSelectSuggestion(textResult)
    }

    return (
        <div className="flex flex-row justify-start">
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
                                    className="p-3 rounded-lg bg-gray-700 max-w-xs lg:max-w-md text-white mx-2 cursor-pointer">
                                    <label htmlFor="file" className="cursor-pointer">
                                        Upload file from computer
                                </label>
                                    <input type="file" id="file" className="hidden" onChange={onImageUpload} />
                                </p>
                                {isLoading ? 'Analysing text. Please Wait' : null}
                            </>
                            : null
                    }

                </div>
            </div>
        </div>
    )
}
