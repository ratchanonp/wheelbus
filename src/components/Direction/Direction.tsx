/* eslint-disable @typescript-eslint/no-unused-vars */
import { DirectionRendererContext } from "@/contexts/RouteContext";
import { useDirectionsService } from "@vis.gl/react-google-maps";
import { useContext, useEffect } from "react";

const Direction = () => {

    const directionsRendererOptions = useContext(DirectionRendererContext);

    console.log(directionsRendererOptions);


    const { directionsService, directionsRenderer, } = useDirectionsService({
        renderOnMap: true,
        renderOptions: {
            ...directionsRendererOptions,
            suppressMarkers: true,
        }
    });


    useEffect(() => {
        if (!directionsService) return;
        if (!directionsRendererOptions) return;
        if (!directionsRendererOptions.directions) return;
        directionsRenderer?.setDirections(directionsRendererOptions.directions);
    }, [directionsRendererOptions]);

    return (
        <></>
    )
}

export default Direction