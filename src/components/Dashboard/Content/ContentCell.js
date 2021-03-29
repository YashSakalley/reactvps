import React from 'react'

const ContentCell = ({ id, value }) => {
    return (
        <tr className="flex w-full mb-4">
            <td className="p-4 w-1/3">{id} :</td>
            <td className="p-4 w-1/3">{value}</td>
        </tr>
    )
}

export default ContentCell