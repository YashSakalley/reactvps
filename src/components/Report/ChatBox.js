import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function ChatBox({ crime, submit }) {
    const [state, setState] = useState({
        questions: [],
        answers: [],
        suggestions: []
    })

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

    return (
        <div>

        </div>
    )
}
