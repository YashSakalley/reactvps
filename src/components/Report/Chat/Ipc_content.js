import React, { useState, useEffect } from 'react'
import Axios from 'axios'

function IPC_content({ ipcMsg, close }) {
    const [ipc, setIpc] = useState([])
    const [msg, setMsg] = useState(null)

    useEffect(() => {
        setMsg('Analysing, please wait...')
        Axios.post('/ipc', { desc: ipcMsg })
            .then((res) => {
                console.log(res);
                setIpc(res.data.entity)
                setMsg(null)
            })
            .catch((err) => {
                console.log(err);
                setMsg('Error occured')
            })
    }, [])

    const onSubmit = () => {
        console.log('ipc', ipc.toLocaleString().replace(' ', '.'));
        localStorage.setItem('ipc', ipc.toString())
        close()
    }

    return (
        <div
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
                    <div className="flex flex-wrap bg-white rounded-lg shadow-lg overflow-hidden h-full text-black" >

                        {/* first half below  */}
                        <div className="w-full relative sm:w-1/2 lg:block lg:w-1/2 bg-cover text-lg overflow-y-auto">
                            <div className="flex justify-center text-4xl font-bold bg-gray-800 text-white shadow-lg">
                                COMPLAINT DESCRIPTION
                            </div>
                            <p className="p-5">
                                {ipcMsg}
                            </p>
                        </div>

                        {/* second half below */}
                        <div className="w-full px-2 sm:px-8 lg:w-1/2 z-20 bg-gray-300">
                            <div className="flex justify-center text-4xl font-bold bg-indigo-400 shadow-lg text-white">
                                IPC DETAILS
                            </div>
                            <div className="mt-4 px-2 sm:px-5 shadow-xl h-64 bg-white">
                                <table className="mt-4 text-left w-full text-xl">

                                    <tbody className="flex flex-col w-full">
                                        <tr className="flex w-full mb-4 bg-gray-800 text-white p-4">
                                            <td className="w-1/3">CRIME</td>
                                            <td className="w-1/3">IPC DETAILS</td>
                                            <td className="w-1/3">CHAPTER</td>
                                        </tr>
                                        {
                                            ipc.map((ip, i) => {
                                                return <div className="flex m-2">
                                                    <tr className="flex w-full mb-4">
                                                        <td className="w-1/3">{ip[0]}</td>
                                                        <td className="w-1/3 bg-teal-500 text-white p-2">{ip[1]}</td>
                                                        <td className="w-1/3 bg-green-500 text-white p-2">{ip[2]}</td>
                                                    </tr>
                                                </div>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {msg}
                            <button
                                onClick={onSubmit}
                                className="bg-teal-600 m-4 p-4 text-white cursor-pointer">
                                SUBMIT
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default IPC_content