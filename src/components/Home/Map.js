import React, { useEffect, useState } from 'react'
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react'

function MapComponent({ google, setValue, finish, task }) {

    const set = (key, value) => {
        setValue(key, value)
    }

    const [currentPos, setCurrentPos] = useState({
        lat: 23.2349658, lng: 77.4294204
    })

    const [markerPos, setMarkerPos] = useState({
        lat: 23.2349658, lng: 77.4294204
    })

    const getPosition = (position) => {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        setCurrentPos({
            lat: pos.lat,
            lng: pos.lng
        })

        var proxyURL = 'https://secure-springs-50261.herokuapp.com/';
        var apiUrl = `https://maps.googleapis.com/maps/api/place/search/json?location=${pos.lat},${pos.lng}&rankby=distance&types=${task === 'ps' ? 'police' : 'hospital'}&sensor=false&key=AIzaSyCm_GrSti6BA79AerJkEcrmCusdDhDCsko`;

        fetch(proxyURL + apiUrl)
            .then(response => response.json())
            .then((data) => {
                setMarkerPos(data.results[0].geometry.location)
                console.log('Data', data.results[0].place_id)
                set('loc', data.results[0].vicinity)
                set('name', data.results[0].name)

                //logic for finding phone number
                var api_phone = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${data.results[0].place_id}&fields=formatted_phone_number&key=AIzaSyCm_GrSti6BA79AerJkEcrmCusdDhDCsko`
                fetch(proxyURL + api_phone)
                    .then(response => response.json())
                    .then((data) => {
                        console.log('Phone', data.result.formatted_phone_number);
                        set('phone', data.result.formatted_phone_number)
                        finish()
                    });
            })

            .catch(() => {
                console.log("Can’t access response. Blocked by browser?")
                finish()
            })
    }

    const locationNotReceived = (positionError) => {
        console.log(positionError);
        finish()
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosition, locationNotReceived);
        } else {
            alert('Geolocation is not supported in your browser');
            finish()
        }

    }, [])

    let mapStyles = {
        width: '100%',
        height: '100%',
        position: 'inherit'
    }

    return (
        <Map
            google={google}
            zoom={13}
            style={mapStyles}
            initialCenter={currentPos}>

            <Marker
                title={'This is the nearest place we found.'}
                name={'Nearest'}
                position={markerPos} />

            <InfoWindow
                visible
                position={currentPos}>
                <div> YOU ARE HERE </div>
            </InfoWindow>
        </Map>
    )
}

const LoadingContainer = (props) => (
    <div className="text-3xl">
        <i className='fas fa-circle-notch fa-spin'></i>
    </div>
)

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCm_GrSti6BA79AerJkEcrmCusdDhDCsko',
    LoadingContainer: LoadingContainer
})(MapComponent)