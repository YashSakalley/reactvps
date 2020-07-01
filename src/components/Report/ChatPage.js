import React from 'react'
import ChatBox from './ChatBox'

export default function ChatPage({ crime, submit }) {
    return (
        <div className="row page" style={{ height: '90vh' }}>
            <div className="col s6">
                <img src="https://png.pngtree.com/thumb_back/fw800/background/20190319/pngtree-pink-gradient-white-spot-star-background-image_90157.jpg" alt="" />
            </div>
            <div className="col s6">
                <ChatBox crime={crime} submit={submit} />
            </div>
        </div>
    )
}
