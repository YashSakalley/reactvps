import React from 'react'

export default function Status() {
    return (
        <>
            <div className="container mx-auto px-6 py-8">
                <h3 className="text-gray-700 text-3xl font-medium">Dashboard</h3>

                <div className="mt-4">
                    <div className="flex flex-wrap text-xl mx-6">
                        These reports are in the rejected state. Please verify them after updation and send them to SHO if deemed right
                    </div>
                </div>
            </div>
        </>
    )
}
