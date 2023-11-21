// Hook return current location

import { useState } from 'react';

export default function useCurrentPosition() {

    const initialLocationState: GeolocationPosition = {
        coords: {
            latitude: 13.7391855,
            longitude: 100.5330713,
            accuracy: 0,
            altitude: 0,
            altitudeAccuracy: 0,
            heading: 0,
            speed: 0,
        },
        timestamp: 0,
    };

    const [loading, setLoading] = useState<boolean>(false);
    const [location, setLocation] = useState<GeolocationPosition>(initialLocationState);
    const [error, setError] = useState<string | null>(null);

    const getCurrentLocation = () => {
        setLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(onChange, onError, {
            enableHighAccuracy: true,
        });
    }


    const onChange: PositionCallback = async (position: GeolocationPosition) => {
        setLocation(position);
        setLoading(false);
    };

    const onError: PositionErrorCallback = (error: GeolocationPositionError) => {
        setError(error.message);
        setLoading(false);
    };

    return { location, loading, error, getCurrentLocation };

}