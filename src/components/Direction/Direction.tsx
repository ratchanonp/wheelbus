/* eslint-disable @typescript-eslint/no-unused-vars */
import { DirectionRendererContext } from "@/contexts/RouteContext";
import { AdvancedMarker, useDirectionsService } from "@vis.gl/react-google-maps";
import { useContext, useEffect } from "react";
import StartMarker from "../CustomMarker/StartMarker";
import StopMarker from "../CustomMarker/StopMarker";

const Direction = () => {

    const directionsRendererOptions = useContext(DirectionRendererContext);

    console.log(directionsRendererOptions);


    const { directionsService, directionsRenderer, } = useDirectionsService({
        renderOnMap: true,
        renderOptions: {
            ...directionsRendererOptions,
            suppressMarkers: true,
        },
    });


    useEffect(() => {
        if (!directionsService) return;
        if (!directionsRendererOptions) return;
        if (!directionsRendererOptions.directions) return;
        directionsRenderer?.setDirections(directionsRendererOptions.directions);
    }, [directionsRendererOptions]);

    const startLocation = directionsRendererOptions.directions?.routes[0].legs[0].start_location;
    const endLocation = directionsRendererOptions.directions?.routes[0].legs[0].end_location;

    return (
        <>
            <AdvancedMarker position={startLocation} > <StartMarker /> </AdvancedMarker>
            <AdvancedMarker position={endLocation} > <StopMarker /> </AdvancedMarker>
        </>
    )
}

export default Direction