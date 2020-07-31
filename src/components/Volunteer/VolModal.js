import React from 'react'
import { useState } from 'react'
import Axios from 'axios'

import Map from '../Home/Map'

import check from '../../assets/check.gif'

function VolModal({ google }) {

    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState(null)

    const [phone, setPhone] = useState('')
    const changeHandler = (e) => {
        setPhone(e.target.value)
    }

    const requestService = () => {
        setIsLoading(true)
        Axios.post('/volunteer/request/create', { lat: 23.259767, lng: 77.445316, phone: phone })
            .then((res) => {
                console.log(res);
                if (res.data.status === 'success') {
                    setStatus('success')
                } else {
                    setStatus('Error')
                }
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false)
                setStatus('Error')
            })
    }

    const declineService = () => {

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

                            <Map
                                task='ps'
                                setValue={() => { }}
                                finish={() => { }}
                            />


                        </div>

                        {/* second half below */}
                        <div className="w-full p-8 lg:w-1/2 bg-gray-200 z-20">
                            <div className="flex justify-center text-4xl font-bold bg-white shadow-lg">
                                REQUEST FACILITATOR SERVICE
                            </div>
                            <div className="border-l-8 border-gray-900 mt-8 text-lg p-2 bg-yellow-200">
                                #NOTE : This feature works accurately in smartphones.
                                </div>
                            <div className="border-l-8 border-gray-900 text-lg p-2 bg-white">
                                Your browser will request you for the location,
                                please do select allow option to give us permission
                                </div>
                            <div>

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

                                {
                                    status === 'success'
                                        ?
                                        <div className="text-xl">
                                            Request Complete. Please wait while we send a facilitator to your location
                                            <img src={check} alt="" className="w-32 h-32 m-auto" />
                                        </div>
                                        :
                                        <div className="text-xl">
                                            Use this feature to request facilitators to help you with the FIR by coming to your location
                                            <br />
                                            <input
                                                type="text"
                                                className="border p-2 border-black mt-2"
                                                placeholder="Phone Number"
                                                onChange={changeHandler}
                                                required />
                                        </div>
                                }

                                {
                                    status === 'Error'
                                        ? 'Error occurred'
                                        : null
                                }
                                <br />

                                {
                                    status !== 'success'
                                        ?
                                        <>
                                            <button
                                                onClick={requestService}
                                                className="focus:outline-none mt-2 p-4 border-4 border-teal-700 text-white hover:bg-teal-800 hover:text-white hover:border-teal-800 duration-200 bg-teal-700">
                                                REQUEST
                                            </button>
                                            <button
                                                onClick={declineService}
                                                className="focus:outline-none mt-2 p-4 border-4 border-teal-700 hover:bg-teal-800 hover:text-white hover:border-teal-800 duration-200">
                                                DECLINE
                                            </button>
                                        </>
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VolModal