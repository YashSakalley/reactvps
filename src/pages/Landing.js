import React from 'react'
import Nav from '../components/Home/Nav/Nav'
import Slider from '../components/Home/Slider/Slider'
import Quote from '../components/Home/Quote'
import Auth from '../components/Home/Auth'
import Status from '../components/Home/Status'
import Footer from '../components/Home/Footer'

export default function Landing() {
    return (
        <div>
            <Nav />
            <Slider />
            <Quote />
            <Auth />
            <Status />
            <Footer />
        </div>
    )
}
