import React from 'react'

import pdfImg from '../../../assets/pdf.png'

export default function StatusResult({ result, reportId }) {

    const pending = <div className="ml-4 mr-4 border-2 border-yellow-300 rounded p-4">
        <div className="">
            <div className="mb-2">
                <span className="">
                    Pending
                </span>
            </div>
            <div className="text-gray-700">Your report has been submitted and is waiting for approval. It has been passed through the CCTNS Bridge</div>
        </div>
    </div>

    const approvedSho = <div className="ml-4 mr-4 border border-green-500 rounded p-4">
        <div>
            <div className="mb-2 text-green-900">
                <span className="">
                    Approved by Station Head Officer
                </span>
            </div>
            <div className="text-gray-700">Your report has been approved by the Station head Officer and is currently undergoing investigation</div>
        </div>
    </div>

    const rejectedSho = <div className="ml-4 mr-4 border border-red-500 rounded p-4">
        <div>
            <div className="mb-2 text-red-900">
                <span className="">
                    Rejected by Station Head Officer
                </span>
            </div>
            <div className="text-gray-700">Your report was rejected by Station Head Officer and is now passed to the Superintendent of Police for review</div>
        </div>
    </div>

    const approvedSp = <div className="ml-4 mr-4 border border-green-500 rounded p-4">
        <div>
            <div className="mb-2 text-green-900">
                <span className="">
                    Approved by Superintendent of Police
                </span>
            </div>
            <div className="text-gray-700">Your report has been approved by the Superintendent of Police and is currently undergoing investigation</div>
        </div>
    </div>

    const rejectedSp = <div className="ml-4 mr-4 border border-red-500 rounded p-4">
        <div>
            <div className="mb-2 text-red-900">
                <span className="">
                    Rejected by Superintendent of Police
                </span>
            </div>
            <div className="text-gray-700">Your report was rejected by Superintendent of Police. Please file an affidavit for taking it to the magistrate u/s 156 Cr.P.C.</div>
        </div>
    </div>

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden m-2 p-5 sm:mx-24">
            <div className="flex justify-between">
                <div> CURRENT STATUS: {result} </div>
                {
                    result.includes('Approved')
                        ?
                        <a
                            title="Show Generated Pdf"
                            className="hover:text-red-400 float-right"
                            href={`${process.env.REACT_APP_API_URL}/getPdf/${reportId}`}
                            target="_blank"
                            rel="noopener noreferrer">
                            {/* <i className="far fa-file-pdf text-3xl float-right"></i> */}
                            <img src={pdfImg}
                                className="rounded duration-200 w-16 h-16 hover:bg-red-500"
                                alt="" />
                        </a>
                        : null
                }
            </div>
            <div className="">
                <h2 className="text-center text-3xl uppercase m-4">Status Tree</h2>
                <div className="">
                    {
                        result === 'Pending'
                            ?
                            <>
                                {pending}
                            </>
                            : null
                    }
                    {
                        result === 'Approved by SHO'
                            ?
                            <>
                                {pending}
                                <div className="text-center text-xl text-teal-800 font-bold">
                                    <i class="fas fa-arrow-down"></i>
                                </div>
                                {approvedSho}
                            </>
                            : null
                    }
                    {
                        result === 'Rejected by SHO'
                            ?
                            <>
                                {pending}
                                <div className="text-center text-xl text-teal-800 font-bold">
                                    <i class="fas fa-arrow-down"></i>
                                </div>
                                {rejectedSho}
                            </>
                            : null
                    }
                    {
                        result === 'Approved by SP'
                            ?
                            <>
                                {pending}
                                <div className="text-center text-xl text-teal-800 font-bold">
                                    <i class="fas fa-arrow-down"></i>
                                </div>
                                {rejectedSho}
                                <div className="text-center text-xl text-teal-800 font-bold">
                                    <i class="fas fa-arrow-down"></i>
                                </div>
                                {approvedSp}
                            </>
                            : null
                    }
                    {
                        result === 'Rejected by SP'
                            ?
                            <>
                                {pending}
                                <div className="text-center text-xl text-teal-800 font-bold">
                                    <i className="fas fa-arrow-down"></i>
                                </div>
                                {rejectedSho}
                                <div className="text-center text-xl text-teal-800 font-bold">
                                    <i className="fas fa-arrow-down"></i>
                                </div>
                                {rejectedSp}
                            </>
                            : null
                    }
                </div>
            </div>
        </div>
    )
}
