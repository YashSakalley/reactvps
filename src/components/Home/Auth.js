import React, { useState } from 'react'
import axios from 'axios'

import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'

export default function Auth() {

    const [form, setForm] = useState({
        uid: '',
        otp: ''
    })
    const [phone, setPhone] = useState('')
    const [msg, setMsg] = useState(false)

    const [isUidDisabled, setIsUidDisabled] = useState(false)
    const [isOtpDisabled, setIsOtpDisabled] = useState(true)

    const history = useHistory();

    const uidSubmitHandler = (event) => {
        event.preventDefault()
        setIsUidDisabled(true)
        setMsg('Verifying Aadhaar. Please Wait')
        let formBody = {
            uid: form.uid
        }
        axios.post('/verify', formBody)
            .then((response) => {
                console.log(response)
                if (response.data.status === 'success') {
                    console.log(response.data.phone)
                    setPhone(response.data.phone)
                    setIsOtpDisabled(false)
                    setMsg(false)
                } else {
                    if (response.data.error) {
                        setMsg('Too many requests. Try again later')
                    } else {
                        setMsg(response.data)
                    }
                    console.log(response.data.error)
                    setIsUidDisabled(false)
                }
            })
            .catch((error) => {
                console.log('Unexpected axios error: ', error)
                setMsg('Error Occurred. Please Try Later')
                setIsUidDisabled(false)
            })
    }

    const otpSubmitHandler = (event) => {
        event.preventDefault();
        setMsg('Verifying OTP. Please Wait')

        let formBody = {
            phone: phone,
            otp: form.otp
        }

        axios.post('/verify/otp', formBody)
            .then((response) => {
                console.log(response);
                if (response.data.status === 'success') {

                    console.log('Redirect to fir');
                    setMsg('Redirecting. Please Wait')

                    let formBody = {
                        uid: form.uid
                    }

                    axios.post('/user/create', formBody)
                        .then((response) => {
                            if (response.data.status === 'success') {
                                let user = response.data.user;
                                console.log(user);
                                Cookies.remove('token')
                                Cookies.set('token', user._id, { expires: 7 })
                                Cookies.set('user', { user: user }, { expires: 7 })
                                history.push('/fir')
                            } else {
                                setMsg('Internal Database Error')
                            }
                        })
                        .catch((error) => {
                            console.log('Axios Error', error)
                            setMsg('Error Occurred. Please Try Later')
                        });
                } else {
                    console.log('Invalid OTP')
                    setMsg('Invalid OTP')
                }
            })
            .catch((error) => {
                console.log('Axios OTP Error', error);
                setMsg('Error Occurred. Please Try Later')
            })
    }

    const inputChangedHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div style={{ backgroundImage: "url('https://png.pngtree.com/thumb_back/fw800/back_pic/04/07/65/755812093598c83.jpg')", backgroundSize: 'cover' }} className="h-screen">
                <div id="login-section" className="bg-black font-black text-white text-2xl mx-12 p-5 border-l-8 border-purple-500">
                    <div>
                        AADHAAR LOGIN
                    </div>
                </div>
                <div className="py-6">
                    <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx- 2 sm:mx-24 ">
                        <div className="hidden lg:block lg:w-1/2 bg-cover" style={{ backgroundImage: "url('https://martechtoday.com/wp-content/uploads/2018/08/AI1920_f0dksn.png')" }}></div>
                        <div className="w-full p-8 lg:w-1/2">
                            <div className="flex justify-center">
                                <img src="https://seeklogo.com/images/A/aadhaar-logo-5FCB1D69EB-seeklogo.com.png" className="w-34 h-32" alt="" />
                            </div>
                            <div className="mt-4 flex items-center justify-between">

                                <span className="border-b w-1/5 lg:w-1/4"></span>
                                <a href="/" className="text-xl text-center text-gray-500 uppercase">LOGIN USING AADHAAR</a>
                                <span className="border-b w-1/5 lg:w-1/4"></span>
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2"></label>
                                <input
                                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                    type="text"
                                    name="uid"
                                    onChange={inputChangedHandler}
                                    value={form.uid}
                                    disabled={isUidDisabled}
                                />
                            </div>
                            <div className="mt-4">
                                <button
                                    className="bg-gray-700 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
                                    onClick={uidSubmitHandler}
                                    disabled={isUidDisabled}>
                                    GENERATE OTP
                                </button>
                            </div>
                            <div className="mt-8">
                                <div className="flex justify-between">
                                    <label className="block text-gray-700 text-sm font-bold mb-2"></label>
                                </div>
                                <input
                                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                    type="text"
                                    name="otp"
                                    onChange={inputChangedHandler}
                                    value={form.otp}
                                    disabled={isOtpDisabled}
                                />
                            </div>
                            <div className="mt-8">
                                <button
                                    className="bg-gray-700 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
                                    onClick={otpSubmitHandler}
                                    disabled={isOtpDisabled}>
                                    SUBMIT OTP
                                </button>
                            </div>
                            <div style={{ textAlign: 'center', color: 'red' }}>{msg ? msg : null}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};