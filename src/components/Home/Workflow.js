import React from 'react'

import wallpaper from '../../assets/landing_wallpaper.jpg'
import aadhaar from '../../assets/aadhaar1.png'
import chatbot from '../../assets/chatbot.png'
import fingerprint from '../../assets/fingerprint.jpg'
import status from '../../assets/status.png'

const Workflow = () => {
    return (
        <div
            className="sm:h-screen"
            style={{
                backgroundImage: `url(${wallpaper})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
            <div id="login-section" className="bg-black font-black text-white text-2xl mx-12 p-5 border-l-8 border-purple-500" style={{ background: 'linear-gradient(45deg, black, gray)' }}>
                <div>
                    HOW IT WORKS
                </div>
            </div>
            <div className="mx-12 mt-6 sm:mt-32 p-5">
                <div className="flex flex-wrap">
                    <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                        <div className="text-center text-2xl font-bold bg-white mx-4 rounded-lg">STEP 1</div>
                        <div className="mx-4 mt-8">
                            <img src={aadhaar} className="w-full h-48" alt="" />
                        </div>
                        <div className="bg-gray-900 text-white px-5 mb-2 text-center text-xl mx-4 mt-4">
                            Login With Aadhaar
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                        <div className="text-center text-2xl font-bold bg-white rounded-lg">STEP 2</div>
                        <div className="mt-8">
                            <img src={chatbot}
                                className="w-full h-48" alt="" />
                        </div>
                        <div className="bg-gray-900 text-white px-5 mb-2 text-center text-xl mt-4">
                            Interact With Bot
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                        <div className="text-center text-2xl font-bold bg-white mx-4 rounded-lg">STEP 3</div>
                        <div className="mx-4 mt-8">
                            <img src={fingerprint}
                                className="w-full h-48" alt="" />
                        </div>
                        <div className="bg-gray-900 text-white px-5 mb-2 text-center text-xl mx-4 mt-4">
                            Provide Your Signature
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 mb-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                        <div className="text-center text-2xl font-bold bg-white rounded-lg">STEP 4</div>
                        <div className="mt-8">
                            <img src={status}
                                className="w-full h-48" alt="" />
                        </div>
                        <div className="bg-gray-900 text-white px-5 mb-2 text-uppercase text-center text-xl mt-4">
                            Reporting Finished
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Workflow