import React, { useState } from 'react'
import Map from './Map'

const Test = () => {
    const [showMap, setShowMap] = useState(false)
    const [PSname, setPSName] = useState('')
    const [PSlocation, setPSlocation] = useState('')
    const [PSphone, setPSphone] = useState('')

    const set = (key, value) => {
        if (key === 'phone') {
            setPSphone(value)
        } else if (key === 'name') {
            setPSName(value)
        } else {
            setPSlocation(value)
        }
    }

    return (
        <div id="nearby-station">
            <div
                style={{
                    background: "url('https://i.pinimg.com/originals/5b/41/f7/5b41f7a94afcb7fdb9d3a0c8addda85e.jpg')",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}>
                <div className="mx-4 py-4 sm:py-24 sm:mx-16 h-full">
                    <div className="flex flex-wrap bg-white rounded-lg shadow-lg overflow-hidden mx- 2 sm:mx-24 h-full">

                        {/* first half below  */}
                        <div className="w-full relative sm:w-1/2 lg:block lg:w-1/2 bg-cover p-5">
                            {
                                showMap
                                    ?
                                    <Map setValue={set} />
                                    : null
                            }
                        </div>

                        {/* second half below */}
                        <div className="w-full p-8 lg:w-1/2 bg-gray-200">
                            <div className="flex justify-center text-4xl font-bold bg-white shadow-lg">
                                NEARBY POLICE STATION
                                </div>
                            <div className="border-l-8 border-gray-900 mt-8 text-lg p-2 bg-yellow-200">
                                #NOTE : Nearby police station feature works accurately in smartphones.
                                </div>
                            <div className="border-l-8 border-gray-900 text-lg p-2 bg-white">
                                Your browser will request you for the location,
                                please do select allow option to give us permission
                                </div>
                            <button
                                onClick={() => setShowMap(true)}
                                className="mt-6 p-4 bg-gray-900 text-white hover:bg-gray-500">
                                FIND Nearby Police Station
                                </button>
                            <div className="mt-8 bg-white p-5 shadow-lg">
                                <div className="text-2xl font-bold">DETAILS OBTAINED</div>
                                <table className="mt-6 text-left w-full text-xl">
                                    <tbody className="flex flex-col">
                                        <tr className="flex w-full mb-4">
                                            <td className="w-1/2"> Name of police station:</td>
                                            <td className="w-1/2"> {PSname} </td>
                                        </tr>
                                        <tr className="flex w-full mb-4">
                                            <td className="w-1/2">location:</td>
                                            <td className="w-1/2"> {PSlocation} </td>
                                        </tr>
                                        <tr className="flex w-full mb-4">
                                            <td className="w-1/2">Phone number:</td>
                                            <td className="w-1/2"> {PSphone} </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Test