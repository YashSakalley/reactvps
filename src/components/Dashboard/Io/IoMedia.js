import React, { useState } from 'react'

import loadingText from '../../../assets/text_loading.gif'
import loadingAudio from '../../../assets/audio_loading.gif'
import loadingFaces from '../../../assets/face_loading.gif'

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

            if (task === 'text') {
                displayResult = taskResult.text.map((element, i) => {
                    return <div key={i}>
                        {element.text} <br />
                    </div>
                });
            } else if (task === 'faces') {
                let path = taskResult.path.split('\\')[2]
                let indexArray = []
                for (let i = 1; i <= taskResult.total; i++) {
                    indexArray.push(i)
                }
                let showResult = indexArray.map((i) => {
                    return (
                        <div key={i} className="m-2 w-1/6 p-2 border border-gray-500 hover:bg-teal-300 cursor-pointer text-center rounded">
                            <img
                                className="w-full"
                                src={`${process.env.REACT_APP_API_URL}/getSuspectImg/${path}/${i}`}
                                alt={`Suspect ${i}`} />
                            <div className="pt-2">
                                Person-{i}
                            </div>
                        </div>
                    )
                })
                displayResult = <div className="flex flex-wrap">
                    {showResult}
                </div>
            } else {
                displayResult = 'Audio Result'
            }

            setIsError(false)
            setResult(displayResult)
        } else {
            setResult('Error occurred. Try again later')
            setIsError(true)
        }
    }

    let loadingGif
    if (task === 'text') {
        loadingGif = loadingText
    } else if (task === 'audio') {
        loadingGif = loadingAudio
    } else if (task === 'faces') {
        loadingGif = loadingFaces
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
                                    <img width="500" height="500" src={loadingGif} alt="Loading gif here" />
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
                                    <td className="w-1/2"> Image evidence</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="text-right mb-8">
                <button
                    onClick={() => analyse('text')}
                    className="hover:bg-gray-600 hover:text-white border-gray-600 border-solid rounded border-2 p-4">
                    <i className="fas fa-font mr-2"></i>
                    ANALYZE TEXT
                </button>
                <button
                    onClick={() => analyse('faces')}
                    className="hover:bg-gray-600 hover:text-white border-gray-600 border-solid rounded border-2 p-4 ml-4">
                    <i className="fas fa-user mr-2"></i>
                    SCAN FACES
                </button>
                {/* Experimental Features */}
                {/* <button
                    onClick={() => analyse('audio')}
                    className="hover:bg-gray-600 hover:text-white border-gray-600 border-solid rounded border-2  p-4 ml-4" >
                    <i className="fas fa-microphone mr-2"></i>
                    ANALYSE AUDIO
                </button > */}
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
