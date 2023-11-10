import { Flex, Spinner } from "@chakra-ui/react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

function SerchPage() {

    const [loading, setLoading] = useState(true);
    const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });

    // Get Latitude and Longitude Geolocation
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ lat: latitude, lng: longitude })
                setLoading(false);
            });
        }

        return null
    }

    useEffect(() => {
        getCurrentLocation();
    }, [])

    if (loading) {
        return (
            <Flex w="100svw" h="100svh" justify="center" align="center">
                <Spinner size="xl" color="brand.500" />
            </Flex>
        )
    }

    return (
        <Flex w="100svw" h="100svh">
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <Map center={currentLocation} zoom={16} currentLocation={currentLocation}>
                    <Marker position={currentLocation} />
                </Map>
            </APIProvider>
        </Flex>
    )
}

export default SerchPage