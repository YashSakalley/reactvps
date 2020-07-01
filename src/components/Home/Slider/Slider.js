import React from 'react'
import styles from './Slider.module.css'
import './Slider.module.css'
export default function Slider() {

    return (
        <>
            <div className="relative slider-div">
                <div className="invisible md:visible absolute z-10 mr-32 mt-64 right-0 rounded-lg card border-l-8 border-purple-500">
                    <div className="text-2xl my-2 bg-black font-black text-white p-4 italic">WANT TO FILE AN FIR ?</div>
                    <div className="text-2xl my-6 flex shadow-lg p-5 bg-black font-black text-white">
                        <div className="my-2 italic">
                            LETS GET STARTED
                        </div>
                        <a href="#login-section" className="text-white bg-red-500 hover:bg-red-600 rounded-lg shadow p-2 mx-2" >CLICK HERE</a>
                    </div>
                </div>
                <div className={styles.slider}>
                    <figure className="figure">
                        <div className="slide"><img src="https://cdn.hipwallpaper.com/i/56/1/adDCWc.jpg" alt="" /></div>
                        <div className="slide"><img src="https://images8.alphacoders.com/914/914689.png" alt="" /></div>
                        <div className="slide"><img src="http://demo3.agethemes.com/joomla/at-police/images/demo/slideshow/slidea.jpg" alt="" /></div>
                        <div className="slide"><img src="https://wallpaperaccess.com/full/124952.jpg" alt="" /></div>
                    </figure>
                </div>
            </div>
        </>
    );
};