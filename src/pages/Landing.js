import React from 'react'

import Nav from 'components/Home/Nav'
import Slider from 'components/Home/Slider'
import Quote from 'components/Home/Quote'
import Auth from 'components/Home/Auth'
import Status from 'components/Home/Status'
import Footer from 'components/Home/Footer'
import Workflow from 'components/Home/Workflow'

const Landing = () => {
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

export default Landing