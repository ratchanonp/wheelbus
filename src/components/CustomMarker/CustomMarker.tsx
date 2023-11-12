import { AdvancedMarker } from "@vis.gl/react-google-maps";

interface Props {
    position: google.maps.LatLngLiteral;
    pin: JSX.Element;
}

const CustomMarker = (props: Props) => {

    const { position } = props

    return (
        <AdvancedMarker position={position}>
            {props.pin}
        </AdvancedMarker>
    )
}

export default CustomMarker