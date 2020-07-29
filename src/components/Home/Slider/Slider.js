import React from 'react'

import img1 from '../../../assets/Slider/img1.png'
import img2 from '../../../assets/Slider/img2.jpg'
import img3 from '../../../assets/Slider/img3.jpg'
import img4 from '../../../assets/Slider/img4.jpg'

import './Slider.css'
export default function Slider() {

    return (
        <>
            <div className="relative slider-div">

                <div
                    style={{
                        border: '5px solid #C05621',
                        zIndex: '1',
                        bottom: '2rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        letterSpacing: '4px',
                        fontWeight: '700',
                        background: 'rgba(0,0,0,0.6)'
                    }}
                    className="invisible md:visible absolute text-center text-white uppercase">

                    <div className="p-6 text-xl "> Want to file an fir? </div>
                    <a href="/#login-section" className="p-4 hover:bg-orange-900 duration-200 bg-orange-700">click here</a>

                </div>

                <div className="slider">
                    <figure className="figure">
                        <div className="slide"><img className="md:h-screen" src={img1} alt="" /></div>
                        <div className="slide"><img className="md:h-screen" src={img2} alt="" /></div>
                        <div className="slide"><img className="md:h-screen" src={img3} alt="" /></div>
                        <div className="slide"><img className="md:h-screen" src={img4} alt="" /></div>
                    </figure>
                </div>
            </div>
        </>
    );
};