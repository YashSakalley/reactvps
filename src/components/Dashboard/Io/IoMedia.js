import React, { useState } from 'react'
import Axios from 'axios'
import loadingText from '../../../assets/text_loading.gif'

import analyseText from './AnalyseText'
import analyseAudio from './AnalyseAudio'
import analyseFaces from './AnalyseFaces'

export default function IoMedia({ index, src }) {

    const [result, setResult] = useState(false)
    const [isError, setIsError] = useState(false)

    const [task, setTask] = useState(false)

    const analyse = async (task) => {

        setTask(task) // show the modal

        let taskResult
        if (task === 'text') {
            taskResult = await analyseText(src)
        } else if (task === 'audio') {
            taskResult = await analyseAudio(src)
        } else {
            taskResult = await analyseFaces(src)
        }
        console.log('Task Result', taskResult);

        setTask(false) // hide the modal

        if (taskResult.status === 'success') {
            let displayResult
            displayResult = taskResult.text.map(element => {
                return <div>
                    {element.text} <br />
                </div>
            });
            console.log(displayResult);
            setIsError(false)
            setResult(displayResult)
        } else {
            setResult('Error occurred. Try again later')
            setIsError(true)
        }
    }

    return (
        <>
            <div className="mt-8 flex flex-wrap">
                {
                    task
                        ?
                        <div
                            style={{ backdropFilter: 'blur(3.8px)' }}
                            className={`fixed z-20 flex text-center justify-center items-center inset-0 text-white bg-black bg-opacity-75 transition-opacity 'block'}`}>
                            <div className="">
                                <div>
                                    <img width="500" height="500" src={loadingText} alt="Loading gif here" />
                                </div>
                                <h2 className="text-xl m-4"> Analysing. Please Wait . . . </h2>
                            </div>

                        </div>
                        : null
                }
                <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 bg-gray-500 p-5">
                    {/* <img src="https://dummyimage.com/600x400/fafafa/000000" alt="" /> */}
                    <img src={`http://localhost:5000/getFile/${src}`}
                        width="500" height="500" alt="media file not loaded" />
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

            <div className="text-right mb-8">
                <button
                    onClick={() => analyse('text')}
                    className="hover:bg-gray-600 transition ease-in-out duration-700 hover:text-white border-gray-600 border-solid rounded border-2 p-4">
                    <i class="fas fa-font mr-2"></i>
                    ANALYZE TEXT
                </button>
                <button
                    onClick={() => analyse('faces')}
                    className="hover:bg-gray-600 transition ease-in-out duration-700 hover:text-white border-gray-600 border-solid rounded border-2 p-4 ml-4">
                    <i class="fas fa-user mr-2"></i>
                    SCAN FACES
                </button>
                <button
                    onClick={() => analyse('audio')}
                    className="hover:bg-gray-600 transition ease-in-out duration-700 hover:text-white border-gray-600 border-solid rounded border-2  p-4 ml-4" >
                    <i class="fas fa-microphone mr-2"></i>
                    ANALYSE AUDIO
                </button >
            </div>

            {
                result
                    ?
                    <>
                        < div className="w-full mt-8 bg-gray-200 p-5" >
                            {
                                isError
                                    ?
                                    <span className="float-right p-2 rounded bg-red-300">Error</span>
                                    :
                                    <span className="float-right p-2 rounded bg-green-300">Success</span>
                            }
RESULT: <br /> <br />
                            {result}
                        </div >
                    </>
                    : null
            }
        </>
    )
}
