import React, { useEffect, useState } from 'react'
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react'

function MapComponent({ google, setValue, finish }) {

    const set = (key, value) => {
        setValue(key, value)
    }

    const [marker, setmarker] = useState({
        showingInfoWindow: false,  //Hides or the shows the infoWindow
        activeMarker: {},          //Shows the active marker upon click
        selectedPlace: {}        //Shows the infoWindow to the selected place upon a marker
    })

    const getPosition = (position) => {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        var proxyURL = 'https://secure-springs-50261.herokuapp.com/';
        var apiUrl = `https://maps.googleapis.com/maps/api/place/search/json?location=${pos.lat},${pos.lng}&rankby=distance&types=police&sensor=false&key=AIzaSyCm_GrSti6BA79AerJkEcrmCusdDhDCsko`;
        fetch(proxyURL + apiUrl)
            .then(response => response.json())
            .then((data) => {
                console.log(data.results[0]);
                console.log('Data', data.results[0].place_id);
                set('loc', data.results[0].vicinity)
                set('name', data.results[0].name)

                //marker for nearby PS below
                // var marker = new google.maps.Marker({
                //     position: data.results[0].geometry.location,
                //     map: map,
                //     title: '',
                // });
                setmarker({
                    ...marker,
                    showingInfoWindow: true,
                })

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
    }

    const onMarkerClick = (props, marker, e) => {
        setmarker({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        })
    }

    const onClose = () => {
        if (marker.showingInfoWindow) {
            setmarker({
                ...marker,
                showingInfoWindow: false,
                activeMarker: null
            })
        }
        finish()
    }
    return (
        <Map
            google={google}
            zoom={13}
            style={mapStyles}
            initialCenter={{
                lat: -34.397,
                lng: 150.644
            }}
        >
            <Marker
                onClick={onMarkerClick}
                name={'YOU ARE HERE'}
            />
            {/* <InfoWindow
                marker={marker.activeMarker}
                visible={marker.showingInfoWindow}
                onClose={onClose}
            >
                <div>
                    <h4>{marker.selectedPlace.name}</h4>
                </div>
            </InfoWindow> */}
        </Map>
    )
}

export default GoogleApiWrapper({ apiKey: 'AIzaSyCm_GrSti6BA79AerJkEcrmCusdDhDCsko' })(MapComponent)