import React, { useState } from 'react'
import Axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie'

export default function WithoutAadhaar() {
    let history = useHistory()

    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        reason: ''
    })

    const onInputChanged = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
    }

    const onSubmitForm = (e) => {
        e.preventDefault()
        console.log('Without aadhaar submitted');
        Axios.post('/user/withoutAadhaar', form)
            .then((res) => {
                console.log(res);
                if (res.data.status === 'success') {
                    let user = res.data.user

                    Cookies.remove('token')
                    Cookies.remove('user')

                    Cookies.set('token', user._id, { expires: 7 })
                    Cookies.set('user', { user: user }, { expires: 7 })
                    Cookies.set('role', 'user')

                    history.push('/submitReport')
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <div className="m-4 border border-gray-500 bg-gray-100 rounded">

                <div className="p-4">
                    <h1 className="text-3xl uppercase">Login Page</h1>
                    <h2>Fill this form if you are unable to access your aadhaar or phone number linked with your aadhaar</h2>
                    <h3>If that is not the case, please use <Link to="/#login-section" className="underline">this</Link> method instead</h3>
                </div>

                <form onSubmit={onSubmitForm} className="p-4">
                    <table>
                        <tbody className="m-4">
                            <tr className="m-4 p-4">
                                <td>
                                    <label htmlFor="name">Enter your full name</label>
                                </td>
                                <td>
                                    <input
                                        className="m-4 p-4 rounded border-gray-300 border"
                                        type="text"
                                        id="name"
                                        onChange={onInputChanged}
                                        value={form.name}
                                        placeholder="Name"
                                        required />
                                </td>
                            </tr>
                            <tr className="m-4 p-4">
                                <td>
                                    <label htmlFor="name">Enter your phone number. <br /> (This number may be used for verification)</label>
                                </td>
                                <td>
                                    <input
                                        className="m-4 p-4 rounded border-gray-300 border"
                                        type="text"
                                        id="phone"
                                        onChange={onInputChanged}
                                        value={form.phone}
                                        placeholder="Phone Number"
                                        required />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="name">Enter your email address</label>
                                </td>
                                <td>
                                    <input
                                        className="m-4 p-4 rounded border-gray-300 border"
                                        type="email"
                                        id="email"
                                        onChange={onInputChanged}
                                        value={form.email}
                                        placeholder="Enter Email"
                                        required />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="name">Enter the reason for not using your aadhaar</label>
                                </td>
                                <td>
                                    <input
                                        className="m-4 p-4 rounded border-gray-300 border"
                                        type="text"
                                        id="reason"
                                        onChange={onInputChanged}
                                        value={form.reason}
                                        placeholder="Enter your Reason"
                                        required />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <button className="border rounded bg-teal-700 p-2 pr-4 pl-4 uppercase text-white">Submit</button>
                </form>
            </div>
        </>
    )
}
