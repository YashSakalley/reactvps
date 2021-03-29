import React, { useState } from 'react'

import Map from './Map'

const NearbyStation = () => {
    const [showMap, setShowMap] = useState(false)
    const [PSname, setPSName] = useState('')
    const [PSlocation, setPSlocation] = useState('')
    const [PSphone, setPSphone] = useState('')
    const [task, setTask] = useState('')

    const set = (key, value) => {
        if (key === 'phone') {
            setPSphone(value)
        } else if (key === 'name') {
            setPSName(value)
        } else {
            setPSlocation(value)
        }
    }

    const [isLoading, setIsLoading] = useState(false)
    const onFinishLoading = () => {
        setIsLoading(false)
    }

    const onClickHandler = (task) => {
        setShowMap(false)
        setShowMap(true)
        setIsLoading(true)
        setTask(task)
        console.log('Request for', task);
    }

    return (
        <div id="nearby-station"
            style={{
                position: 'absolute',
                left: '50%',
                width: '90vw',
                transform: 'translate(-50%, 0%)',
                marginTop: '50px'
            }}
            className="sm:mt-0"
        >
            <div
                className="">
                <div className="">
                    <div className="flex flex-wrap bg-white rounded-lg shadow-lg overflow-hidden h-full" >

                        {/* first half below  */}
                        <div className="w-full relative sm:w-1/2 lg:block lg:w-1/2 bg-cover"
                            style={{
                                background: "url('https://thumbs.dreamstime.com/b/isometric-location-map-points-white-background-vector-95132813.jpg')",
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}>
                            {
                                showMap
                                    ?
                                    task === 'ps'
                                        ?
                                        <Map
                                            task='ps'
                                            setValue={set}
                                            finish={onFinishLoading} />
                                        :
                                        <Map task='hos'
                                            setValue={set}
                                            finish={onFinishLoading}
                                        />
                                    : null
                            }
                        </div>

                        {/* second half below */}
                        <div className="w-full p-8 lg:w-1/2 bg-gray-200 z-20">
                            <div className="flex justify-center text-4xl font-bold bg-white shadow-lg">
                                EMERGENCY SERVICES
                            </div>
                            <div className="border-l-8 border-gray-900 mt-8 text-lg p-2 bg-yellow-200">
                                #NOTE : Nearby feature works accurately in smartphones.
                                </div>
                            <div className="border-l-8 border-gray-900 text-lg p-2 bg-white">
                                Your browser will request you for the location,
                                please do select allow option to give us permission
                                </div>
                            <div>
                                <button
                                    onClick={() => { onClickHandler('ps') }}
                                    className="focus:outline-none mt-6 p-4 border-4 border-orange-700 text-white hover:bg-orange-800 hover:text-white hover:border-orange-800 duration-200 bg-orange-700">
                                    Find Nearby Police Station
                                </button>
                                <button
                                    onClick={() => { onClickHandler('hos') }}
                                    className="focus:outline-none mt-6 p-4 border-4 border-orange-700 hover:bg-orange-800 hover:text-white hover:border-orange-800 duration-200">
                                    Find Nearby Hospital
                                </button>
                                {
                                    isLoading
                                        ?
                                        <span className="ml-4 text-3xl text-teal-700">
                                            <i className='fas fa-circle-notch fa-spin'></i>
                                        </span>
                                        : null
                                }

                            </div>
                            <div className="mt-8 bg-white p-5 shadow-lg sm:h-64 overflow-auto">
                                <div className="text-2xl font-bold">DETAILS OBTAINED</div>
                                <table className="mt-6 text-left w-full text-xl">
                                    <tbody className="flex flex-col">
                                        <tr className="flex w-full mb-4">
                                            <td className="w-1/2">Name:</td>
                                            <td className="w-1/2">{PSname}</td>
                                        </tr>
                                        <tr className="flex w-full mb-4">
                                            <td className="w-1/2">Address:</td>
                                            <td className="w-1/2">{PSlocation}</td>
                                        </tr>
                                        <tr className="flex w-full mb-4">
                                            <td className="w-1/2">Phone number:</td>
                                            <td className="w-1/2">{PSphone}</td>
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

export default NearbyStation