import React, { useEffect, useState } from 'react'
import IpcContent from './Ipc_content'
import Modal from '../../UI/Modal'

export default function FinishMsg({ ipcMsg, submit }) {
    const [showModal, setShowModal] = useState(false)
    useEffect(() => {
        submit()
    })
    console.log('Finish', ipcMsg);
    return (
        <>
            <Modal
                style={{
                    transform: showModal ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: showModal ? '1' : '0'
                }}
                close={() => setShowModal(false)}>
                <IpcContent ipcMsg={ipcMsg} close={() => setShowModal(false)} />
            </Modal>
            <p className="px-6 py-3 bg-gray-800 max-w-xs lg:max-w-md rounded-b-lg rounded-r-lg">You can view IPC details here
        <button className="ml-4 bg-indigo-500 px-4 hover:bg-indigo-700" onClick={() => setShowModal(true)}>
                    VIEW
        </button>
            </p>
            <div className="flex flex-row justify-center">
                <div className="text-white grid grid-flow-row gap-2">
                    <div className="flex items-center flex-row-reverse">
                        <p className="px-6 py-3 bg-green-700 max-w-xs lg:max-w-md rounded-b-lg rounded-r-lg">
                            Thank You. We got all we need. Please click Next to proceed
                    </p>
                    </div>
                </div>
            </div>
        </>
    )
}
