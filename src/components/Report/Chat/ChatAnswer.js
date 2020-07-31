import React from 'react'

export default function ChatAnswer({ ind, children }) {
    const LAST_QUESTION = 6

    if (ind === LAST_QUESTION) {
        console.log('Last answer');
    }
    return (
        <div className="flex flex-row justify-end">
            <div className="messages text-sm text-white grid grid-flow-row gap-2">
                <div className="flex items-center flex-row-reverse">
                    <p className={`px-6 py-3 ${ind === LAST_QUESTION ? 'rounded-lg' : 'rounded-t-full rounded-l-full'} bg-blue-700 max-w-xs lg:max-w-md`}>
                        {children}
                    </p>
                </div>
            </div>
        </div>
    )
}
