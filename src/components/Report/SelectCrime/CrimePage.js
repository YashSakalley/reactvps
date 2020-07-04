import React, { useState } from 'react'

import Crime from './Crime'

export default function CrimePage({ submit }) {

    const onCrimeChanged = (name) => {
        console.log('Selected', name)
        submit(name)
    }

    const crimes = [
        {
            img: 'https://www.unicef.org/romania/sites/unicef.org.romania/files/styles/two_column/public/UNICEF%20CyberbullyingSID_2020_8_0.jpg?itok=e0hF1UyH',
            crime: 'CYBER BULLYING'
        },
        {
            img: 'https://news.miami.edu/life/_assets/images/images-stories/2019/03/phishingattheu-940x529.jpg',
            crime: 'HACKING OR PHISHING'
        },
        {
            img: 'https://www.debt.org/wp-content/uploads/2012/05/Identity-Theft.gif',
            crime: 'THEFT'
        },
        {
            img: 'https://english.cdn.zeenews.com/sites/default/files/styles/zm_700x400/public/2020/06/20/867731-murder-delhi.gif',
            crime: 'MURDER'
        },
        {
            img: 'https://images.medicaldaily.com/sites/medicaldaily.com/files/styles/headline/public/2015/02/26/violent-crime.jpg',
            crime: 'VIOLENCE'
        },
        {
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQfJ8L7ezUweXz-FSZWlk33rhngn0P7AKEI6A&usqp=CAU',
            crime: 'OTHER'
        }
    ]

    return (
        <>
            <div
                className="flex-row justify-center p-4 md:p-16 h-screen"
                style={{
                    backgroundImage: "url('https://www.itl.cat/pngfile/big/165-1658630_material-wallpapers-material-design.jpg')",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
                <div className="w-full bg-white shadow-lg h-full p-5">
                    <div className="text-black text-4xl ">BEFORE WE GET STARTED ...</div>
                    <div className="text-black text-2xl my-2">PLEASE SELECT AN OPTION MOST RELEVENT TO YOUR SITUATION</div>

                    <div className="bg-gray-600 h-32 w-full"></div>
                    <div className="relative flex flex-wrap h-64 -mt-24 p-5">
                        {
                            crimes.map(({ img, crime }) => (
                                <Crime
                                    img={img}
                                    crime={crime}
                                    click={onCrimeChanged}
                                    key={crime} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
