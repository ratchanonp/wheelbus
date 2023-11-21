// Hook return current location

import { SearchContext, SearchDispatchContext } from '@/contexts/SearchContext';
import getAddress from '@/utils/Maps/getAddress';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useContext, useState } from 'react';

export default function useCurrentPosition() {

    const search = useContext(SearchContext);
    const dispatchSearch = useContext(SearchDispatchContext);
    const geoCodingLibrary = useMapsLibrary("geocoding");

    const { focusedInput } = search;

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
        if (geoCodingLibrary) {
            const result = await getAddress({ lat: position.coords.latitude, lng: position.coords.longitude }, geoCodingLibrary);
            if (result) {
                setLocation(position);
                if (focusedInput === "from") {
                    dispatchSearch({ type: "SET_FROM", payload: { from: "ตำแหน่งปัจจุบัน" } })
                    dispatchSearch({ type: "SET_FROM_PLACE_ID", payload: { fromPlaceId: result.place_id } })
                } else if (focusedInput === "to") {
                    dispatchSearch({ type: "SET_TO", payload: { to: "ตำแหน่งปัจจุบัน" } })
                    dispatchSearch({ type: "SET_TO_PLACE_ID", payload: { toPlaceId: result.place_id } })
                } else {
                    dispatchSearch({ type: "SET_FROM", payload: { from: "ตำแหน่งปัจจุบัน" } })
                    dispatchSearch({ type: "SET_FROM_PLACE_ID", payload: { fromPlaceId: result.place_id } })
                }
            }
        }
        setLoading(false);
    };

    const onError: PositionErrorCallback = (error: GeolocationPositionError) => {
        setError(error.message);
        setLoading(false);
    };

    return { location, loading, error, getCurrentLocation };

}