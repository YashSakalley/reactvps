import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2'
import { Pie } from 'react-chartjs-2'
import { Doughnut } from 'react-chartjs-2'
import Axios from 'axios'

export default function Chart({ status }) {
    const data = {
        labels: ['JAN', 'FEB', 'MAR', 'ARP', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [
            {
                label: 'Reports in 2020',
                fill: false,
                data: [0, 0, 5, 10, 15, 20, 25, 30, 15, 10, 12, 30, 15],
                backgroundColor: [
                    '#0e8bab',
                    '#ff618c',
                    '#52a5a8',
                    '#d786ee',
                    '#c9ede7',
                    '#676767',
                    '#5b3475',
                    '#ffc0cb',
                    '#6cb3d9',
                    '#d2548c',
                    '#c52551',
                    '#d786ee',
                    '#01a900',
                    '#00a8d5',
                    '#830a0c'
                ]
            }
        ]
    }

    const data_crime_type = {
        labels: ['Cyber Bullying', 'Hacking or phishing', 'Theft', 'Murder', 'Violence', 'Other'],
        datasets: [
            {
                label: 'CRIME REPORTED',
                data: [30, 15, 10, 12, 30, 15],
                backgroundColor: [
                    '#0e8bab',
                    '#b89ae4',
                    '#ffea6b',
                    '#dbd7d2',
                    '#5b3475',
                    '#c52551',
                ]
            }
        ]
    }

    console.log('status', status);
    const data_status = {
        labels: ['Approved', 'pending', 'rejected'],
        datasets: [
            {
                label: 'REPORT STATUS',
                data: [2, 5, 1],
                backgroundColor: [
                    '#01a900',
                    '#ffea6b',
                    '#ed1c25'
                ]
            }
        ]
    }

    return (
        <div className="bg-gray-300 pt-4">
            <div className="sm:mx-32 flex flex-wrap">
                <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 bg-white p-5 shadow-xl">
                    <Line className="w-full h-full" data={data} />
                </div>
                <div className="border-l-8 border-gray-300 w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 bg-white p-5 shadow-xl">
                    <Bar data={data} />
                </div>
            </div>
            <div className=" sm:mx-32 mt-2 flex flex-wrap">
                <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 bg-white p-5 shadow-xl">
                    <Pie data={data_crime_type} />
                </div>
                <div className="border-l-8 border-gray-300 w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 bg-white p-5 shadow-xl">
                    <Doughnut data={data_status} />
                </div>
            </div>
        </div>
    )
}
