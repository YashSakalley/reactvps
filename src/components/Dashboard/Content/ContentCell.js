import React from 'react'

export default function ContentCell({ id, value }) {
    return (
        <tr className="flex w-full mb-4">
            <td className="p-4 w-1/3">{id} :</td>
            <td className="p-4 w-1/3">{value}</td>
        </tr>
    )
}
