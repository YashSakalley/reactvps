import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useHistory, useParams } from 'react-router-dom'

import login_wallpaper from '../../assets/login_wallpaper.jpg'
import police_officer from '../../assets/police_officer.webp'
import police_logo from '../../assets/police_logo.png'
import Modal from '../UI/Modal'

export default function Login() {

    const role = useParams().role

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [msg, setMsg] = useState(false)
    const [uploadMsg, setUploadMsg] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const history = useHistory()

    const changeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const submitHandler = () => {
        setMsg('Verifying. Please Wait')

        axios.post(`/${role}/login`, form)
            .then((res) => {
                console.log(res.data);
                if (res.data.status === "success") {
                    let user = res.data.user

                    Cookies.remove('user')
                    Cookies.set('token', user._id, { expires: 7 })
                    Cookies.set('user', { user: user })
                    Cookies.set('role', role)

                    history.push(`/dashboard/${role}`)
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

    const uploadHandler = (e) => {
        if ((e.target.files[0] === "") || (e.target.files === null))
            return
        setUploadMsg('Uploading')
        let data = new FormData()
        data.append('file', e.target.files[0])
        axios.post('/upload', data)
            .then((res) => {
                console.log(res);
                setUploadMsg('Uploaded Successfully. Please Login to continue')
            })
            .catch((err) => {
                console.log(err);
                setUploadMsg('Error uploading')
            })
    }

    return (
        <div
            style={{
                backgroundImage: `url(${login_wallpaper})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }} className="h-screen">
            <Modal
                style={{
                    transform: showModal ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: showModal ? '1' : '0'
                }}
                close={() => setShowModal(false)}>
                <div className="bg-white m-32 p-4">
                    <h1 className="m-4 text-xl mb-8">Please upload your id proof to continue</h1>
                    <label htmlFor="file" className="border mb-8 cursor-pointer hover:bg-teal-600 duration-200 border-teal-600 rounded p-2 px-4 m-4">UPLOAD</label>
                    <input className="hidden" type="file" id="file" onChange={uploadHandler} />
                    <p className="m-4 text-red-600">{uploadMsg}</p>
                    <button onClick={submitHandler} className="w-full mt-8 bg-gray-700 text-white font-bold py-2 px-4 rounded hover:bg-gray-600">LOGIN</button>
                </div>
            </Modal>
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
                            <a href="/#" className="text-xl text-center text-gray-500 uppercase">{role} LOGIN</a>
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
                                    onClick={() => setShowModal(true)}
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

