import React, { useState } from 'react'
import Axios from 'axios'

export default function IoMedia({ index }) {

    const [result, setResult] = useState(true)
    const [isError, setIsError] = useState(false)

    const analyse = (task) => {
        setResult(false)
        Axios.post('/analyse', {})
            .then((res) => {
                console.log(res)
                if (res.data.status === 'success') {
                    setResult(res.data.result)
                    setIsError(false)
                } else {
                    setIsError(true)
                    setResult(res.data.msg)
                }
            })
            .catch((err) => {
                console.log(err)
                setIsError(true)
                setResult('Error requesting to database')
            })
    }

    return (
        <>
            <div className="mt-8 flex flex-wrap">
                <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 bg-gray-500 p-5">
                    <img src="https://dummyimage.com/600x400/fafafa/000000" alt="" />
                </div>
                <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 bg-gray-400 p-4">
                    <div className="shadow-xl bg-white p-5">
                        <table className="text-left w-full mx-2">
                            <tbody className="flex flex-col">
                                <tr className="flex w-full mb-4">
                                    <td className="w-1/2"> TYPE:</td>
                                    <td className="w-1/2"> IMAGE</td>
                                </tr>
                                <tr className="flex w-full mb-4">
                                    <td className="w-1/2"> SIZE:</td>
                                    <td className="w-1/2"> 1.6MB</td>
                                </tr>
                                <tr className="flex w-full mb-4">
                                    <td className="w-1/2"> PROPERTY:</td>
                                    <td className="w-1/2"> XYZ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <button
                onClick={() => analyse('text')}
                className="text-white bg-teal-500 p-4">
                ANALYZE TEXT
            </button>
            <button
                onClick={() => analyse('faces')}
                className="text-white bg-purple-500 p-4 ml-4">
                SCAN FACES
            </button>
            {
                result
                    ?
                    <>
                        <div className="w-full mt-8 bg-gray-200 p-5">
                            {
                                isError
                                    ?
                                    <span className="float-right p-2 rounded bg-red-300">Error</span>
                                    :
                                    <span className="float-right p-2 rounded bg-green-300">Success</span>
                            }
                            RESULT: <br /> <br />
                            {result}
                        </div>
                    </>
                    : null
            }
        </>
    )
}
