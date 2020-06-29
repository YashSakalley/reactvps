import React, { useState } from 'react'

import axios from 'axios'

export default function Status() {

    const [form, setform] = useState({
        firId: ''
    })

    const [msg, setMsg] = useState(false)
    const [result, setResult] = useState(false)

    const changeHandler = (e) => {
        setform({ firId: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault()

        axios.get(`/firs/${form.firId}`)
            .then((response) => {
                if (response.data.status === 'success') {
                    setMsg(false)
                    setResult(response.data.fir.status)
                } else {
                    setMsg(response.data.msg)
                    console.log(response);
                }
            })
            .catch((error) => {
                setMsg('Error occurred. Please try later')
                console.log(error);
            })

    }

    return (
        <>
            <div style={{ backgroundImage: "url('https://png.pngtree.com/thumb_back/fw800/back_pic/04/07/65/755812093598c83.jpg')", backgroundSize: 'cover' }}>
                <div id="login-section" className="bg-black font-black text-white text-2xl mx-12 p-5 border-l-8 border-purple-500">
                    <div>
                        CHECK STATUS
                    </div>
                </div>
                <div className="py-6">
                    <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx- 2 sm:mx-24 ">
                        <div className="hidden lg:block lg:w-1/2 bg-cover" style={{ backgroundImage: "url('https://svitla.com/uploads/0/2135-database_management_software.jpg')" }}></div>
                        <div className="w-full p-8 lg:w-1/2">
                            <div className="flex justify-center">
                                <img src="https://lh3.googleusercontent.com/proxy/ISAhow91iujjLLBbx8isGnNK4EKRr-fvOWbyPzkIltGdTGgyvpUa25l4NM6BWtodQTDlBU9Eg60O3F4hOe5lMBYKXq35UlwxhCvbpeDZylTsfGfC3jL3uVL3T9Fd4Q" className="w-34 h-32" alt="" />
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="border-b w-1/5 lg:w-1/4"></span>
                                <a href="/" className="text-xl text-center text-gray-500 uppercase">CHECK YOUR FIR STATUS</a>
                                <span className="border-b w-1/5 lg:w-1/4"></span>
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2"></label>
                                <input
                                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                    type="text"
                                    name="firId"
                                    onChange={changeHandler}
                                    value={form.firId} />
                            </div>
                            <div className="mt-4">
                                <button
                                    className="bg-gray-700 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
                                    onClick={submitHandler}>
                                    SUBMIT
                                </button>
                            </div>
                            <div style={{ textAlign: 'center', color: 'red' }}>{msg ? msg : null}</div>
                        </div>
                    </div>
                    {
                        result
                            ?
                            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden m-2 p-5 sm:mx-24 ">
                                STATUS: {result}
                            </div>
                            : null
                    }
                </div>
            </div>
        </>
    );
};