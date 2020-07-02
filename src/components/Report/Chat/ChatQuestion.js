import React, { useState } from 'react'

export default function ChatMessage({ suggestions, children, submit }) {

    const [showSuggestions, setShowSuggestions] = useState(true)

    const onSelectSuggestion = (suggestion) => {
        submit(suggestion)
        setShowSuggestions(false)
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
                </div>
            </div>
        </div>
    )
}
