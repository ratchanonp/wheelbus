import { Flex, Image, Text } from "@chakra-ui/react";

type Props = {
    step: google.maps.DirectionsStep
}

const Transit = (props: Props) => {

    const { step } = props;
    const { transit } = step
    const { line } = transit as google.maps.TransitDetails;
    const { color, vehicle } = line;

    return (
        <Flex maxW="200px" gap={1} >
            <Image src={vehicle.icon} w={6} h={6} />
            <Text maxW="100px" noOfLines={1} overflow="hidden" bgColor={color} color="white" px={2} wordBreak="break-all">
                {step.transit?.line.name}
            </Text>
        </Flex >
    )
}

export default Transit