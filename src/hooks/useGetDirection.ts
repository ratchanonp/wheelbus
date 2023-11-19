import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useState } from "react";

const useGetDirection = () => {

    const [direction, setDirection] = useState<google.maps.DirectionsResult>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');


    const routeLibrary = useMapsLibrary("routes");

    const getDirection = (from: string, to: string) => {
        if (routeLibrary) {
            setLoading(true);


            const directionRequest: google.maps.DirectionsRequest = {
                origin: { placeId: from },
                destination: { placeId: to },
                travelMode: google.maps.TravelMode.TRANSIT,
                transitOptions: {
                    modes: [google.maps.TransitMode.BUS],
                    routingPreference: google.maps.TransitRoutePreference.FEWER_TRANSFERS
                },
                provideRouteAlternatives: true,
                language: 'th'
            }

            const directionService = new routeLibrary.DirectionsService();

            try {
                directionService.route(directionRequest, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        if (result) {
                            setDirection(result);
                        } else {
                            setError('Error');
                        }
                    } else {
                        setError('Error');
                    }
                    setLoading(false);
                }
                );
            } catch (error) {
                setError('Error');
                setLoading(false);
            }
        }
    }

    return { direction, loading, error, getDirection };

}

export default useGetDirection;