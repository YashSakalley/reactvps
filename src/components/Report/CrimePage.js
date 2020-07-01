import React, { useState } from 'react'
import Crime from './Crime';

export default function CrimePage({ crimes, submit }) {

    const [crime, setCrime] = useState('')

    const onCrimeChanged = (name) => {
        setCrime(name)
    }

    const crimeFormSubmit = (event) => {
        event.preventDefault()
        submit(crime)
    }

    const crimeList = crimes.map((crime, index) => {
        return <Crime key={index} name={crime} changed={onCrimeChanged} />
    });

    return (
        <div>
            <form className="page crime-page" onSubmit={crimeFormSubmit}>
                <h3>Before we get Started . . .</h3>
                <h4>Please select an option most revelant to your situation</h4>
                <div className="crime_page">
                    {crimeList}
                    <button className="btn waves-effect waves-light"
                        type="submit"
                        name="action"
                        disabled={crime === null}>Next
                        <i className="material-icons right">send</i>
                    </button>
                </div>
            </form>
        </div>
    )
}
