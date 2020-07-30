import React from 'react'
import ChatBox from './ChatBox'

import wallpaper from '../../../assets/Slider/img4.jpg'

export default function ChatPage({ crime, submit }) {
    return (
        <div className="h-screen w-full flex antialiased text-gray-200 overflow-hidden p-14"
            style={{
                backgroundImage: "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f7702d6e-c194-4cf5-bee2-7177082d8e4a/d5eyfb2-4ae49ebc-e8a3-4e3a-b3ef-ba2d1fc3e9e1.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZjc3MDJkNmUtYzE5NC00Y2Y1LWJlZTItNzE3NzA4MmQ4ZTRhXC9kNWV5ZmIyLTRhZTQ5ZWJjLWU4YTMtNGUzYS1iM2VmLWJhMmQxZmMzZTllMS5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.yVoidfiHJFqumIZBlTsn5BS1PegOfbQmQH83QEYdSz8')",
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
            }}>
            <div className="flex-1 flex flex-col sm:p-16 p-2">
                <main className="flex-grow flex flex-row min-h-0">
                    <ChatBox crime={crime} submit={submit} />
                </main>
            </div>
        </div >
    )
}