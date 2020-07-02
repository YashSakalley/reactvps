import React, { useState } from 'react'

export default function CrimePage({ submit }) {

    const [crime, setCrime] = useState('')

    const onCrimeChanged = (event) => {
        setCrime(event.target.value)
        console.log(event.target.value)
    }

    const crimeFormSubmit = (event) => {
        event.preventDefault()
        submit(crime)
    }

    return (
        <div className="bg-gray-300 h-screen flex-row justify-center p-4 md:p-8">
            <div className="w-full p-8 bg-white shadow-lg h-full">
                <div className="text-black text-4xl ">BEFORE WE GET STARTED ...</div>
                <div className="text-black text-2xl my-2">PLEASE SELECT AN OPTION MOST RELEVENT TO YOUR SITUATION</div>
                <form className="p-2" onSubmit={crimeFormSubmit}>
                    <div className="flex flex-wrap">
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/3 mb-4 h-48 flex bg-gray-300 border-r-8 border-white">
                            <img src="https://www.unicef.org/romania/sites/unicef.org.romania/files/styles/two_column/public/UNICEF%20CyberbullyingSID_2020_8_0.jpg?itok=e0hF1UyH"
                                className="w-1/2" alt="" />
                            <div className="text-center text-black text-xl font-black w-1/2 p-2 bg-green-300">
                                CYBER BULLYING
                                <div className="my-5 bg-gray-300">
                                    <input
                                        type="radio"
                                        name="crime"
                                        className="form-radio h-5 w-5 text-gray-600"
                                        value="CYBER BULLYING"
                                        onChange={onCrimeChanged} />
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/3 mb-4 h-48 flex bg-gray-300 border-r-8 border-white">
                            <img src="https://image.freepik.com/free-vector/hacking-phishing-attack_1325-720.jpg"
                                className="w-1/2" alt="" />
                            <div className="text-center text-black text-xl font-black w-1/2 p-2 bg-teal-300">
                                HACKING
                                <div className="my-5 bg-gray-300">
                                    <input
                                        type="radio"
                                        name="crime"
                                        className="form-radio h-5 w-5 text-gray-600"
                                        value="HACKING"
                                        onChange={onCrimeChanged} />
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/3 mb-4 h-48 flex bg-blue-700">
                            <img src="https://www.debt.org/wp-content/uploads/2012/05/Identity-Theft.gif" className="w-1/2" alt="" />
                            <div className="text-center text-black text-xl font-black w-1/2 p-2">
                                THEFT
                                <div className="my-5 bg-gray-300">
                                    <input
                                        type="radio"
                                        name="crime"
                                        className="form-radio h-5 w-5 text-gray-600"
                                        value="THEFT"
                                        onChange={onCrimeChanged} />
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/3 mb-4 h-48 flex bg-indigo-400 border-r-8 border-white">
                            <img src="https://english.cdn.zeenews.com/sites/default/files/styles/zm_700x400/public/2020/06/20/867731-murder-delhi.gif"
                                className="w-1/2" alt="" />
                            <div className="text-center text-black text-xl font-black w-1/2 p-2">
                                MURDER
                                <div className="my-5 bg-gray-300">
                                    <input
                                        type="radio"
                                        name="crime"
                                        className="form-radio h-5 w-5 text-gray-600"
                                        value="MURDER"
                                        onChange={onCrimeChanged} />
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/3 mb-4 h-48 flex bg-purple-400 border-r-8 border-white">
                            <img src="https://images.medicaldaily.com/sites/medicaldaily.com/files/styles/headline/public/2015/02/26/violent-crime.jpg"
                                className="w-1/2" alt="" />
                            <div className="text-center text-black text-xl font-black w-1/2 p-2">
                                VIOLENCE
                                <div className="my-5 bg-gray-300">
                                    <input
                                        type="radio"
                                        name="crime"
                                        className="form-radio h-5 w-5 text-gray-600"
                                        value="VIOLENCE"
                                        onChange={onCrimeChanged} />
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/3 mb-4 h-48 flex bg-pink-400">
                            <img src="https://images.squarespace-cdn.com/content/v1/51277219e4b08376dc025505/1441889779408-4WQZZM7NJ46NAY4M3DLS/ke17ZwdGBToddI8pDm48kO2pS9cMHbO4RvHPc8Skf1tZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7SSwGn0TPzISNt3iSJufpcvR7xFZ2oYA-YTitnkXPCuTgiUfhLEJ_Uxi_cK3qclb8w/image-asset.png"
                                className="w-1/2" alt="" />
                            <div className="text-center text-black text-xl font-black w-1/2 p-2">
                                OTHERS
                                <div className="my-5 bg-gray-300">
                                    <input
                                        type="radio"
                                        name="crime"
                                        className="form-radio h-5 w-5 text-gray-600"
                                        value="OTHERS"
                                        onChange={onCrimeChanged} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="absolute right-0 mx-16 bg-green-500 p-5 rounded-lg text-white">NEXT</button>
                </form>
            </div>
        </div>
    )
}
