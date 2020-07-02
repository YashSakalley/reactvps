import React from 'react'
import ChatBox from './ChatBox'

export default function ChatPage({ crime, submit }) {
    return (
        <div className="h-screen w-full flex antialiased text-gray-200 overflow-hidden p-14"
            style={{ backgroundImage: "url('https://www.wallpaperup.com/uploads/wallpapers/2016/11/24/1052516/e38aef774c40cf99fe1da996423ae013-700.jpg')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div className="flex-1 flex flex-col sm:p-16 p-2">
                <main className="flex-grow flex flex-row min-h-0">
                    <section className="hidden md:block flex flex-col flex-none overflow-auto w-24   md:w-2/5 transition-all duration-300 ease-in-out">
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/000/242/730/original/police-officer-avatar-illustration.jpg"
                            className="h-full shadow-lg" alt="" />
                    </section>
                    <ChatBox crime={crime} submit={submit} />
                </main>
            </div>
        </div >
    )
}