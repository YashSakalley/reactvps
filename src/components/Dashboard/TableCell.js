import React from 'react'
import { Link } from 'react-router-dom'

export default function TableCell({ crime, time, status, bg, id }) {
    let d = new Date(time)
    d = d.toString()
    d = d.split(' ')
    let Time = d[4]
    let date = `${d[2]} ${d[1]} ${d[3]}`

    return (
        <tr className={bg === 'dark' ? 'bg-gray-200' : ''}>
            <td className="text-left py-3 px-4">{crime}</td>
            <td className="text-left py-3 px-4">{date}</td>
            <td className="text-left py-3 px-4">{Time}</td>
            <td className="text-left py-3 px-4"><Link className="hover:text-blue-500"
                to={`/dashboard/sho/${id}`}>{status}</Link></td>
        </tr>
    )
}
