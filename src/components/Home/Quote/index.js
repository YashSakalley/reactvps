import React from 'react'

import './Quote.css'

const Quote = ({ msg, author }) => {

    return (
        <div className="Quote">
            <blockquote className="groucho">
                {msg}
                <footer>{author}</footer>
            </blockquote>
        </div>
    )
}

export default Quote