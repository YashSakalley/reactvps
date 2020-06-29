import React from 'react'
import Nav from '../components/Nav/Nav'
import Slider from '../components/Slider/Slider'
import Quote from '../components/Quote'
import Auth from '../components/Auth'
import Status from '../components/Status'
import Footer from '../components/Footer'

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
