import React, { useMemo } from 'react'

import Crime from './Crime'

const CrimePage = ({ submit }) => {

    const onCrimeChanged = (name) => {
        console.log('Selected', name)
        submit(name)
    }

    const crimes = useMemo(
        () => ([
            {
                img: 'https://d1l21ng1r9w8na.cloudfront.net/article/images/800x800/dimg/dreamstime_l_102390457.jpg',
                crime: 'CYBER BULLYING'
            },
            {
                img: 'https://www.cdotrends.com/sites/default/files/iStock-1164097820.jpg',
                crime: 'HACKING OR PHISHING'
            },
            {
                img: 'https://static.vecteezy.com/system/resources/previews/000/133/834/non_2x/identity-theft-vector.jpg',
                crime: 'THEFT'
            },
            {
                img: 'https://ak.picdn.net/shutterstock/videos/17777635/thumb/10.jpg',
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
        ]),
        []
    )
    
    return (
        <>
            <div
                className="flex-row justify-center p-4 md:p-16 h-screen"
                style={{
                    backgroundImage: "url('https://c0.wallpaperflare.com/preview/985/338/321/trees-nature-forest-moon.jpg')",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}>
                <div className="w-full bg-white shadow-lg h-full p-5 rounded-lg" style={{
                    backgroundImage: "url('https://wallpaperplay.com/walls/full/a/e/6/33398.jpg')",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }} >
                    <div className="text-black text-4xl ">BEFORE WE GET STARTED ...</div>
                    <div className="text-3xl mt-4 italic lowercase">PLEASE SELECT AN OPTION MOST RELEVENT TO YOUR SITUATION</div>

                    <div className="bg-gray-600 h-32 w-full"></div>
                    <div className="relative flex flex-wrap h-64 -mt-24 sm:p-5 p-16">
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

export default CrimePage