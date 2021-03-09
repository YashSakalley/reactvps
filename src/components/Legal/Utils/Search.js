import React from 'react'

export default function Search() {
    return (
        <div className="px-8 mt-4">
            <input
                className="bg-white shadow-xl text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block appearance-none"
                type="text" placeholder="SEARCH" />
        </div>
    )
}
