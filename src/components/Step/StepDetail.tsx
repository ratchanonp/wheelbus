import Transit from "./Transit";
import Walking from "./Walking";

type Props = {
    step: google.maps.DirectionsStep
}

const StepDetail = (props: Props) => {

    const { step } = props;

    const { travel_mode } = step;

    switch (travel_mode) {
        case "WALKING":
            return <Walking step={step} />
            break;
        case "TRANSIT":
            return <Transit step={step} />
            break;
        default:
            return <div>Unknown</div>
            break;
    }
}

export default StepDetail