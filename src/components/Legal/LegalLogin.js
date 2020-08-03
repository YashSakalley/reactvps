import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'

import login_wallpaper from '../../assets/login_wallpaper.jpg'
import police_officer from '../../assets/police_officer.webp'
import police_logo from '../../assets/police_logo.png'

export default function Login() {

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [msg, setMsg] = useState(false)

    const history = useHistory()

    const changeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const submitHandler = () => {
        setMsg('Verifying. Please Wait')

        axios.post('/legal/login', form)
            .then((res) => {
                console.log(res.data);
                if (res.data.status === "success") {
                    let user = res.data.user

                    Cookies.remove('user')
                    Cookies.set('token', user._id, { expires: 7 })
                    Cookies.set('user', { user: user })
                    Cookies.set('role', 'legal')

                    history.push('/legal')
                } else if (res.data.msg === "NOUSER") {
                    setMsg('No user with given details found')
                } else if (res.data.msg === "INVPASS") {
                    setMsg('Your password is incorrect')
                } else if (res.data.msg === "DBERR") {
                    setMsg('Database error occurred. Please try again later')
                } else {
                    setMsg('Unexpected error. Please try again later')
                }
            })
            .catch((err) => {
                console.log(err);
                setMsg('Error requesting to database')
            })

    }

    return (
        <div style={{
            backgroundImage: `url(${login_wallpaper})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }} className="h-screen">
            <div className="py-24 px-16">
                <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx- 2 sm:mx-24 ">
                    <div className="hidden lg:block lg:w-1/2 bg-cover"
                        style={{
                            backgroundImage: `url(${police_officer})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }} ></div>
                    <div className="w-full p-8 lg:w-1/2">
                        <div className="flex justify-center">
                            <img src={police_logo}
                                className="w-40 h-36" alt="" />
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="border-b w-1/5 lg:w-1/4"></span>
                            <a href="/#" className="text-xl text-center text-gray-500 uppercase">Legal LOGIN</a>
                            <span className="border-b w-1/5 lg:w-1/4"></span>
                        </div>
                        <div className="px-8 m-4 mt-16">
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2"></label>
                                <input
                                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                    type="email"
                                    placeholder="EMAIL"
                                    onChange={changeHandler}
                                    value={form.email}
                                    name="email"
                                    required />
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2"></label>
                                <input
                                    className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                    type="password"
                                    placeholder="PASSWORD"
                                    onChange={changeHandler}
                                    value={form.password}
                                    name="password"
                                    required />
                            </div>
                            <div className="mt-4">
                                <button
                                    className="w-full bg-gray-700 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
                                    onClick={submitHandler}
                                >
                                    LOGIN
                            </button>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center', color: 'red' }} className="h-6">{msg ? msg : null}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

