import { Container } from "@chakra-ui/react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useState } from "react";

function SerchPage() {

    const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });

    function getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(function (position) {
            setCurrentLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        });
    }

    getCurrentLocation();

    return (
        <Container maxW="container.sm">
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <Map center={currentLocation} zoom={10}>

                </Map>
            </APIProvider>
        </ Container>
    )
}

export default SerchPage