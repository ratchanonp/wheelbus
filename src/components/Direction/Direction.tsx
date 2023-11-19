/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDirectionsService } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

interface DirectionProps {
    origin: google.maps.LatLngLiteral;
    destination: google.maps.LatLngLiteral;
}

const Direction = (props: DirectionProps) => {

    const { origin, destination } = props

    const { directionsService, directionsRenderer, } = useDirectionsService({
        renderOnMap: true,
    });


    useEffect(() => {
        const getDirection = async () => {

            if (!directionsService || !directionsRenderer) return

            const request: google.maps.DirectionsRequest = {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.TRANSIT,
                unitSystem: google.maps.UnitSystem.METRIC,
                optimizeWaypoints: true,
                provideRouteAlternatives: false,
                language: "th",
                transitOptions: {
                    modes: [google.maps.TransitMode.BUS],
                    routingPreference: google.maps.TransitRoutePreference.LESS_WALKING,
                    
                }
            }

            try {
                await directionsService.route(request, (response, _) => {
                    directionsRenderer.setDirections(response)

                    console.log(response)

                    directionsRenderer.setOptions({
                        polylineOptions: {
                            strokeColor: "#2BC875",
                            strokeOpacity: 1,
                            strokeWeight: 6,
                        },
                        suppressMarkers: true,
                    })

                    directionsRenderer.setPanel(document.getElementById("directions-panel") as HTMLElement)

                })
            } catch (error) {
                console.log(error)
            }
        }

        getDirection()
    }, [destination, directionsRenderer, directionsService, origin])

    return (
        <></>
    )
}

export default Direction