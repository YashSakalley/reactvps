import React from 'react'

import './Quote.css'

export default function Quote({ msg, author }) {

    return (
        <div className="Quote">
            <blockquote className="groucho">
                {msg}
                <footer>{author}</footer>
            </blockquote>
        </div>
    )


}