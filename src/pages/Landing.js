import React from 'react'
import Nav from '../components/Home/Nav/Nav'
import Slider from '../components/Home/Slider/Slider'
import Quote from '../components/Home/Quote/Quote'
import Auth from '../components/Home/Auth'
import Status from '../components/Home/Status'
import Footer from '../components/Home/Footer'

export default function Landing() {
    return (
        <div>
            <Nav />
            <Slider />
            <Quote
                msg="A random Police Quote with some difficult to make sense text in it"
                author="Author" />
            <Auth />
            <Status />
            <Footer />
        </div>
    )
}
