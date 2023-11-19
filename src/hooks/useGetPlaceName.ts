import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useMemo, useState } from "react";

const useGetPlaceName = (placeId: string) => {

    const [placeName, setPlaceName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const placeLibrary = useMapsLibrary("places");

    const placeRequest: google.maps.places.PlaceDetailsRequest = useMemo(() => ({
        placeId,
        fields: ['name'],
        language: 'th'
    }), [placeId]);

    useEffect(() => {
        if (placeLibrary) {
            setLoading(true);

            const placeService = new placeLibrary.PlacesService(document.createElement('div'));

            placeService.getDetails(placeRequest, (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    setPlaceName(place?.name || '');
                } else {
                    setError('Error');
                }
                setLoading(false);
            });
        }
    }, [placeLibrary, placeRequest]);

    return { placeName, loading, error };

}

export default useGetPlaceName;

