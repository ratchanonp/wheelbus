import { Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { FaBus } from "react-icons/fa6";

type Props = {
    step: google.maps.DirectionsStep
}

const Transit = (props: Props) => {

    const { step } = props;
    const { instructions, transit } = step
    const { line, departure_stop, arrival_stop, num_stops } = transit as google.maps.TransitDetails;

    return (
        <Flex gap={5} alignItems="flex-start">
            <Flex>
                <Icon w={6} h={6} as={FaBus} />
            </Flex>
            <Flex direction="column" gap={3} w="full">
                <Flex direction="column" border="2px solid" borderColor="origin" p={3} borderRadius="xl">
                    <Text fontSize="sm" bgColor="origin" color="white" px={2} w="fit-content">ต้นทาง</Text>
                    <Heading size="md" color="origin">{departure_stop.name}</Heading>
                </Flex>
                <Flex direction="column" fontSize="sm">
                    <Text>{instructions}</Text>
                    <Text noOfLines={1} overflow="hidden" bgColor={line.color} w="fit-content" color="white" px={2} wordBreak="break-all">
                        {step.transit?.line.name}
                    </Text>
                    <Text>นั่งรถ {num_stops} ป้าย</Text>
                </Flex>
                <Flex direction="column" border="2px solid" borderColor="destination" p={3} borderRadius="xl">
                    <Text fontSize="sm" bgColor="destination" w="fit-content" px={2} color="white">ปลายทาง</Text>
                    <Heading size="md" color="destination">{arrival_stop.name}</Heading>
                </Flex>
            </Flex>
        </Flex >
    )
}

export default Transit