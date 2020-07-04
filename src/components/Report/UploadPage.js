import React, { useState } from 'react'

export default function UploadPage({ submit }) {
    const [form, setForm] = useState({
        evidence: [],
        signature: ''
    })

    const onChangeHandler = (event) => {
        setForm({
            ...form,
            [event.target.id]: event.target.value
        })
    }

    const onSubmitHandler = () => {
        submit(form)
    }

    return (
        <div style={{
            backgroundImage: "url('https://cdn.wallpapersafari.com/43/98/WMXhls.jpg')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        }}
            className="sm:h-screen">
            <div className="py-5 px-5 md:py-24 md:px-16">
                <div className="flex bg-gray-300 rounded-lg shadow-lg overflow-hidden mx- 2 sm:mx-24 ">
                    <div className="hidden lg:block lg:w-1/2 bg-cover"
                        style={{
                            background: "url('https://cutewallpaper.org/21/forensic-wallpaper/Biochemistry-Wallpaper-67+-images-.jpg')",
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}>
                    </div>
                    <div className="w-full p-8 lg:w-1/2">
                        <div className="w-full text-center text-xl font-black bg-white p-2 shadow-lg">UPLOAD EVIDENCES
                        (OPTIONAL)</div>
                        <div className="w-full flex">
                            <div className="w-1/2 mt-4 bg-white p-2 shadow-lg">Please upload photo or video file of this
                            incident. These files will
                            help us to analyse the incident more efficiently</div>
                            <div className="w-1/2 p-5">
                                <input
                                    id="evidence"
                                    type="file"
                                    className="hidden"
                                    onChange={onChangeHandler} />
                                <label htmlFor="evidence" className="cursor-pointer bg-gray-500 text-white p-2 rounded-lg">UPLOAD EVIDENCE</label>
                            </div>
                        </div>
                        <div className="bg-gray-400 h-1 w-full mt-5"></div>
                        <div className="w-full text-center text-xl font-black bg-white p-2 shadow-lg mt-8">UPLOAD YOUR SIGNATURE
                    </div>
                        <div className="w-full flex">
                            <div className="w-1/2 mt-4 bg-white p-2 shadow-lg">
                                For authentication we need your signature. You
                                can either upload an image file or use our OCR interface to draw one on the screen. </div>
                            <div className="w-1/2 p-5">
                                <input
                                    id="signature"
                                    type="file"
                                    className="hidden"
                                    onChange={onChangeHandler} />
                                <label htmlFor="signature" className="cursor-pointer bg-teal-500 text-white p-2 rounded-lg">UPLOAD SIGNATURE</label>
                                <button className="block bg-blue-500 rounded-lg p-2 text-white mt-4 w-1/2">DRAW</button>
                            </div>
                        </div>
                        <div className="bg-gray-400 h-1 w-full mt-5"></div>
                        <button
                            onClick={onSubmitHandler}
                            className="bg-green-600 p-2 text-white mt-2 w-full"
                        >FINISH</button>
                    </div>
                </div>
            </div>


        </div>
    )
}
