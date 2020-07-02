import React, { useEffect } from 'react'

export default function FinishMsg({ submit }) {
    useEffect(() => {
        submit()
    })

    return (
        <div className="flex flex-row justify-center">
            <div className="text-white grid grid-flow-row gap-2">
                <div className="flex items-center flex-row-reverse">
                    <p className="px-6 py-3 bg-green-700 max-w-xs lg:max-w-md rounded-b-lg rounded-r-lg">
                        Thank You. We got all we need. Please click Next to proceed
                    </p>
                </div>
            </div>
        </div>
    )
}
