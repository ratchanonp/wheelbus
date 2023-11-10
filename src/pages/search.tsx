import { Flex, Spinner, Text } from "@chakra-ui/react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

function SerchPage() {

    const [loading, setLoading] = useState(true);
    const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });



    const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    }

    const success = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude })
        setLoading(false);
    }

    const error = () => {
        alert('Unable to retrieve your location');
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error, options);
        }
    }, [])

    if (loading) {
        return (
            <Flex w="100svw" h="100svh" justify="center" align="center">
                <Spinner size="xl" color="brand.500" />
                <Text fontFamily="prompt" color="gray.500" ml={3}>กำลังค้นหาตำแหน่งปัจจุบันของคุณ</Text>
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