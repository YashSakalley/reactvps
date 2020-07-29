import React, { useState, useEffect, createRef } from 'react'
import axios from 'axios'
import ChatHeader from './ChatHeader'
import ChatControls from './ChatControls'
import ChatQuestion from './ChatQuestion'
import ChatAnswer from './ChatAnswer'
import FinishMsg from './FinishMsg'
import Video from './Video'

export default function ChatBox({ crime, submit }) {
    const [state, setState] = useState({
        questions: [{ question: 'Error connecting database', suggestions: [], label: '' }],
        answers: []
    })
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const videoTimes =
        [
            {
                start: 0,
                mid: 7,
                end: 8
            },
            {
                start: 8,
                mid: 10,
                end: 12
            },
            {
                start: 12,
                mid: 14,
                end: 15
            },
            {
                start: 15,
                mid: 18,
                end: 20
            },
            {
                start: 20,
                mid: 24,
                end: 25
            },
            {
                start: 25,
                mid: 28,
                end: 30
            },
            {
                start: 30,
                mid: 35,
                end: 40
            },
            {
                start: 35,
                mid: 35,
                end: 40
            }
        ]

    const myRef = createRef()

    const onSubmitAnswer = (answer) => {
        setState({
            ...state,
            answers: [...state.answers, answer]
        })
        setCurrentQuestionIndex(currentQuestionIndex + 1)
    }

    useEffect(() => {
        axios.get(`/questions/${crime}`)
            .then((res) => {
                console.log(res);
                if (res.data.status === "success") {
                    setState((state) => {
                        return ({
                            ...state,
                            questions: res.data.questions
                        })
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        let chatWindow = myRef.current
        chatWindow.scrollTop = chatWindow.scrollHeight
    })

    const [isInputDisabled, setIsInputDisabled] = useState(false)
    const onFinishAnswer = () => {
        setIsInputDisabled(true)
    }

    const onNextClick = () => {
        let form = {
            questions: [],
            answers: []
        }
        form.answers = state.answers
        form.questions = state.questions.map(({ label }) => (label))
        submit(form)
    }

    return (
        <>
            <section className="hidden md:block flex flex-col flex-none overflow-auto w-24   md:w-2/5 transition-all duration-300 ease-in-out">
                <Video
                    start={videoTimes[currentQuestionIndex].start}
                    mid={videoTimes[currentQuestionIndex].mid}
                    end={videoTimes[currentQuestionIndex].end} />
            </section>
            <section className="flex flex-col flex-auto bg-white shadow-lg">
                <ChatHeader />
                <div className="chat-body p-4 flex-1 overflow-y-scroll bg-gray-300" ref={myRef}>
                    <div className="flex flex-row justify-start">
                        <div className="w-12 h-8 relative flex flex-shrink-0 mr-4">
                            <img className="shadow-md rounded-full w-full h-full object-cover"
                                src="https://i.pinimg.com/originals/08/ce/ec/08ceec29ee450339ea678bcd2204fedf.png"
                                alt="" />
                        </div>
                        <div className="text-sm text-gray-700 grid grid-flow-row gap-2">
                            <div className="flex items-center">
                                <p
                                    className="px-6 py-3 rounded-t-full rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">
                                    Hello! there
                            </p>
                            </div>
                            <div className="flex items-center">
                                <p className="px-6 py-3 rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">
                                    Use the input field down below
                            </p>
                            </div>
                            <div className="flex items-center">
                                <p
                                    className="px-6 py-3 rounded-b-full rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">
                                    Please provide the answer as best as you can
                            </p>
                            </div>

                        </div>
                    </div>

                    <div className="flex flex-row justify-end">
                        <div className="messages text-sm text-white grid grid-flow-row gap-2">
                            <div className="flex items-center flex-row-reverse">
                                <p className="px-6 py-3 rounded-t-full rounded-l-full bg-blue-700 max-w-xs lg:max-w-md">
                                    Hello! bot
                            </p>
                            </div>
                        </div>
                    </div>


                    <ChatQuestion
                        suggestions={state.questions[0].suggestions}
                        submit={onSubmitAnswer}>
                        {state.questions[0].question}
                    </ChatQuestion>
                    <br />
                    {
                        state.answers.map((answer, i) => {
                            return <div key={i}>

                                <ChatAnswer>
                                    {answer}
                                </ChatAnswer>
                                <br />
                                {
                                    i < state.questions.length - 1 ?
                                        <ChatQuestion
                                            suggestions={state.questions[i + 1].suggestions}
                                            submit={onSubmitAnswer}>
                                            {state.questions[i + 1].question}
                                        </ChatQuestion>
                                        :
                                        <FinishMsg submit={onFinishAnswer} />
                                }


                            </div>
                        })
                    }


                </div>

                {
                    isInputDisabled ?
                        <div
                            className="bg-blue-600 text-center p-3 cursor-pointer hover:bg-blue-400"
                            onClick={onNextClick}>
                            Next
                    </div>
                        : <ChatControls submit={onSubmitAnswer} />
                }

            </section>
        </>
    )
}
