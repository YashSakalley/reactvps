import React from 'react'

export default function Modal({ children, style, close }) {
    return (
        <>
            <div className="absolute top-0 left-0 bg-gray-400 flex flex-start">
                <div
                    style={style}
                    className={`w-full transition-all duration-1000 z-40 fixed top-0 left-0`}>
                    <div className="">
                        <div
                            style={{ zIndex: '-1' }}
                            className="bg-opacity-50 bg-black w-full h-screen absolute"
                            onClick={close}>
                        </div>
                        <div
                            style={{ zIndex: '2' }}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
