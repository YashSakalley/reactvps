import React, { useState } from 'react'
import Axios from 'axios'
import { GoogleApiWrapper } from 'google-maps-react'

const NearbyStation = ({ google }) => {

    //dynamic values id like phone and name of station
    const [PSname, setPSname] = useState('')
    const [PSphone, setPSphone] = useState('')
    const [PSlocation, setPSlocation] = useState('')

    var map, infoWindow;
    //map initialize #note that it is called in script source as callback
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 13,

        });
        infoWindow = new google.maps.InfoWindow();

        // HTML5 geolocation for finding current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                //logic below to retrieve nearby police station list on data.results
                var proxyURL = 'https://secure-springs-50261.herokuapp.com/';
                var apiUrl = `https://maps.googleapis.com/maps/api/place/search/json?location=${pos.lat},${pos.lng}&rankby=distance&types=police&sensor=false&key=AIzaSyCm_GrSti6BA79AerJkEcrmCusdDhDCsko`;
                fetch(proxyURL + apiUrl)
                    .then(response => response.json())
                    .then((data) => {
                        console.log(data.results[0]);

                        setPSlocation(data.results[0].vicinity)
                        setPSname(data.results[0].name)

                        //marker for nearby PS below
                        var marker = new google.maps.Marker({
                            position: data.results[0].geometry.location,
                            map: map,
                            title: '',
                        });

                        //logic for finding phone number
                        var api_phone = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${data.results[0].place_id}&fields=formatted_phone_number&key=AIzaSyCm_GrSti6BA79AerJkEcrmCusdDhDCsko`
                        fetch(api_phone)
                            .then(response => response.json())
                            .then((data) => {
                                console.log(data.result.formatted_phone_number);
                                setPSphone(data.result.formatted_phone_number)
                            });
                    })
                    .catch(() => console.log("Can’t access response. Blocked by browser?"))


                infoWindow.setPosition(pos);
                infoWindow.setContent('YOU ARE HERE');
                infoWindow.open(map);
                map.setCenter(pos);
            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
            console.log('Location Provided');
            console.log(navigator.geolocation);
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
            console.log('Location not provided');
        }
    }


    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

    // dynamically creating script and appending to the body so as to initialize map after onclick
    function showMap() {
        var script = document.createElement("script");
        script.type = "text/javascript";
        let arg = initMap
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCm_GrSti6BA79AerJkEcrmCusdDhDCsko&callback=arg`;
        script.innerHTML = null;
        script.async = true;
        script.defer = true;
        document.getElementById("check").appendChild(script);
    }

    return (
        <div id="nearby-station">
            <div id="check">
                <div
                    style={{
                        background: "url('https://wallpaperset.com/w/full/4/8/6/487528.jpg')",
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}>
                    <div className="mx-4 py-4 sm:py-24 sm:mx-16 h-full">
                        <div className="flex flex-wrap bg-white rounded-lg shadow-lg overflow-hidden mx- 2 sm:mx-24 h-full">

                            {/* first half below  */}
                            <div className="w-full sm:w-1/2 lg:block lg:w-1/2 bg-cover p-5">
                                <div id="map" className="w-full h-full"></div>
                            </div>

                            {/* second half below */}
                            <div className="w-full p-8 lg:w-1/2 bg-gray-200">
                                <div className="flex justify-center text-4xl font-bold bg-white shadow-lg">
                                    NEARBY POLICE STATION
                                </div>
                                <div className="border-l-8 border-gray-900 mt-8 text-lg p-2 bg-yellow-200">
                                    #NOTE : Nearby police station feature works accurately in smartphones.
                                </div>
                                <div className="border-l-8 border-gray-900 text-lg p-2 bg-white">
                                    Your browser will request you for the location,
                                    please do select allow option to give us permission
                                </div>
                                <button
                                    onClick={initMap}
                                    className="mt-6 p-4 bg-gray-900 text-white hover:bg-gray-500">
                                    FIND Nearby Police Station
                                </button>
                                <div className="mt-8 bg-white p-5 shadow-lg">
                                    <div className="text-2xl font-bold">DETAILS OBTAINED</div>
                                    <table className="mt-6 text-left w-full text-xl">
                                        <tbody className="flex flex-col">
                                            <tr className="flex w-full mb-4">
                                                <td className="w-1/2"> Name of police station:</td>
                                                <td className="w-1/2"> {PSname} </td>
                                            </tr>
                                            <tr className="flex w-full mb-4">
                                                <td className="w-1/2">location:</td>
                                                <td className="w-1/2"> {PSlocation} </td>
                                            </tr>
                                            <tr className="flex w-full mb-4">
                                                <td className="w-1/2">Phone number:</td>
                                                <td className="w-1/2"> {PSphone} </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GoogleApiWrapper()(NearbyStation)