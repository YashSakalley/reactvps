import React from 'react'
import Nav from '../components/Home/Nav/Nav'
import Slider from '../components/Home/Slider/Slider'
import Quote from '../components/Home/Quote/Quote'
import Auth from '../components/Home/Auth'
import Status from '../components/Home/Status/Status'
import Footer from '../components/Home/Footer'
import Workflow from '../components/Home/Workflow'

export default function Landing() {
    return (
        <div>
            <Nav />
            <Slider />
            <Quote
                msg="Evil is powerless if the good are unafraid."
                author="Ronald Reagan" />
            <Auth />
            <Status />
            <Workflow />
            <Footer />
        </div>
    )
}
