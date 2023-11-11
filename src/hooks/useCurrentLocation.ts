// Hook return current location

import { useEffect, useState } from 'react';

export default function useCurrentPosition() {

    const initialLocationState: GeolocationPosition = {
        coords: {
            latitude: 0,
            longitude: 0,
            accuracy: 0,
            altitude: 0,
            altitudeAccuracy: 0,
            heading: 0,
            speed: 0,
        },
        timestamp: 0,
    };

    const [loading, setLoading] = useState<boolean>(true);
    const [location, setLocation] = useState<GeolocationPosition>(initialLocationState);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const geo = navigator.geolocation;

        if (!geo) {
            setError('Geolocation is not supported');
            return;
        }

        const currentPosition = geo.getCurrentPosition(onChange, onError);

        return () => currentPosition;
    }, []);

    const onChange: PositionCallback = (position: GeolocationPosition) => {
        setLocation(position);
        setLoading(false);
    };

    const onError: PositionErrorCallback = (error: GeolocationPositionError) => {
        setError(error.message);
        setLoading(false);
    };

    return { location, loading, error };

}